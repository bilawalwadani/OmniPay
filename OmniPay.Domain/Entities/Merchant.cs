using System;

namespace OmniPay.Domain.Entities
{
    public class Merchant
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal ProcessingFee { get; set; }
    }
}
