using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using OmniPay.Domain.Interfaces;

namespace OmniPay.Application.Commands
{
    public record ProcessFundTransferCommand(Guid SenderId, Guid ReceiverId, decimal Amount) : IRequest<bool>;

    public class ProcessFundTransferCommandHandler : IRequestHandler<ProcessFundTransferCommand, bool>
    {
        private readonly ITransactionRepository _transactionRepository;

        public ProcessFundTransferCommandHandler(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public async Task<bool> Handle(ProcessFundTransferCommand request, CancellationToken cancellationToken)
        {
            return await _transactionRepository.ExecuteFundTransferAsync(
                request.SenderId, 
                request.ReceiverId, 
                request.Amount);
        }
    }
}
