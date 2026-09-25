using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OmniPay.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProcessFundTransferSp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sp = @"
                CREATE PROCEDURE sp_ProcessFundTransfer
                    @SenderWalletId UNIQUEIDENTIFIER,
                    @ReceiverWalletId UNIQUEIDENTIFIER,
                    @Amount DECIMAL(18,2)
                AS
                BEGIN
                    BEGIN TRY
                        BEGIN TRAN;
                        
                        DECLARE @SenderBalance DECIMAL(18,2);
                        
                        -- Lock the row and get balance
                        SELECT @SenderBalance = Balance
                        FROM Wallets WITH (UPDLOCK)
                        WHERE Id = @SenderWalletId;

                        IF @SenderBalance < @Amount
                        BEGIN
                            ROLLBACK TRAN;
                            THROW 50000, 'Insufficient funds.', 1;
                            RETURN;
                        END

                        -- Deduct from sender
                        UPDATE Wallets
                        SET Balance = Balance - @Amount
                        WHERE Id = @SenderWalletId;

                        -- Add to receiver
                        UPDATE Wallets
                        SET Balance = Balance + @Amount
                        WHERE Id = @ReceiverWalletId;

                        COMMIT TRAN;
                    END TRY
                    BEGIN CATCH
                        IF @@TRANCOUNT > 0
                            ROLLBACK TRAN;
                        
                        THROW;
                    END CATCH
                END";

            migrationBuilder.Sql(sp);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE IF EXISTS sp_ProcessFundTransfer");
        }
    }
}
