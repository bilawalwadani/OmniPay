using System;

namespace OmniPay.Application.DTOs
{
    public class WalletUserLookupDto
    {
        public Guid WalletId { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
