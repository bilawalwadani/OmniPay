using System;
using System.Threading;
using System.Threading.Tasks;
using FluentAssertions;
using Moq;
using OmniPay.Application.Commands;
using OmniPay.Domain.Interfaces;
using Xunit;

namespace OmniPay.Application.Tests.Commands
{
    public class ProcessFundTransferCommandHandlerTests
    {
        private readonly Mock<ITransactionRepository> _mockRepository;
        private readonly ProcessFundTransferCommandHandler _handler;

        public ProcessFundTransferCommandHandlerTests()
        {
            _mockRepository = new Mock<ITransactionRepository>();
            _handler = new ProcessFundTransferCommandHandler(_mockRepository.Object);
        }

        [Fact]
        public async Task Handle_WithSufficientFunds_ReturnsTrue()
        {
            // Arrange
            var senderId = Guid.NewGuid();
            var receiverId = Guid.NewGuid();
            var amount = 100m;
            var command = new ProcessFundTransferCommand(senderId, receiverId, amount);

            // Setup the mock to return true, simulating a successful stored procedure execution
            _mockRepository
                .Setup(repo => repo.ExecuteFundTransferAsync(senderId, receiverId, amount))
                .ReturnsAsync(true);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().BeTrue();
            _mockRepository.Verify(repo => repo.ExecuteFundTransferAsync(senderId, receiverId, amount), Times.Once);
        }

        [Fact]
        public async Task Handle_WithInsufficientBalance_ReturnsFalse()
        {
            // Arrange
            var senderId = Guid.NewGuid();
            var receiverId = Guid.NewGuid();
            var amount = 5000m;
            var command = new ProcessFundTransferCommand(senderId, receiverId, amount);

            // Setup the mock to return false, simulating the stored procedure rejecting the transfer
            _mockRepository
                .Setup(repo => repo.ExecuteFundTransferAsync(senderId, receiverId, amount))
                .ReturnsAsync(false);

            // Act
            var result = await _handler.Handle(command, CancellationToken.None);

            // Assert
            result.Should().BeFalse();
            _mockRepository.Verify(repo => repo.ExecuteFundTransferAsync(senderId, receiverId, amount), Times.Once);
        }
    }
}
