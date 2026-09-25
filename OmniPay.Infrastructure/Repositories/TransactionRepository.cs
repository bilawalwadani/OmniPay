using System;
using System.Data;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using OmniPay.Domain.Interfaces;

namespace OmniPay.Infrastructure.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly string _connectionString;

        public TransactionRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") 
                ?? throw new System.InvalidOperationException("Connection string 'DefaultConnection' not found.");
        }

        public async Task<bool> ExecuteFundTransferAsync(Guid senderId, Guid receiverId, decimal amount)
        {
            using var connection = new SqlConnection(_connectionString);
            
            var parameters = new DynamicParameters();
            parameters.Add("@SenderWalletId", senderId);
            parameters.Add("@ReceiverWalletId", receiverId);
            parameters.Add("@Amount", amount);

            var rowsAffected = await connection.ExecuteAsync(
                "sp_ProcessFundTransfer", 
                parameters, 
                commandType: CommandType.StoredProcedure);

            return rowsAffected > 0;
        }
    }
}
