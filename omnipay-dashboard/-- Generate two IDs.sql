-- Generate two IDs
DECLARE @AliceId AS UNIQUEIDENTIFIER = NEWID();

DECLARE @BobId AS UNIQUEIDENTIFIER = NEWID();

-- 1. Create the Users
INSERT  INTO dbo.Users (
    Id,
    Name,
    Email,
    PasswordHash
)
VALUES                (@AliceId, 'Alice Smith', 'alice@example.com', 'hashedpassword123'),
(@BobId, 'Bob Jones', 'bob@example.com', 'hashedpassword123');

-- 2. Create their Wallets (linked by the same IDs)
INSERT  INTO dbo.Wallets (
    Id,
    UserId,
    Balance,
    Currency,
    Status
)
VALUES                  (NEWID(), @AliceId, 500.00, 'USD', 'Active'),
(NEWID(), @BobId, 150.00, 'USD', 'Active');

SELECT 'Users and Wallets created successfully!' AS Result;