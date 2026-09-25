using System;
using System.Threading.Tasks;

namespace OmniPay.Domain.Interfaces
{
    public interface ITransactionRepository
    {
        Task<bool> ExecuteFundTransferAsync(Guid senderId, Guid receiverId, decimal amount);
    }
}
