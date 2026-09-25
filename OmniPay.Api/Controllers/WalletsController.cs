using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OmniPay.Domain.Entities;
using OmniPay.Infrastructure.Data;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using OmniPay.Application.DTOs;
namespace OmniPay.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WalletsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public WalletsController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetWallets()
        {
            var wallets = await _db.Wallets.ToListAsync();
            return Ok(wallets);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok(new List<WalletUserLookupDto>());
            }

            var results = await (from u in _db.Users
                                 join w in _db.Wallets on u.Id equals w.UserId
                                 where u.Name.Contains(query)
                                 select new WalletUserLookupDto
                                 {
                                     WalletId = w.Id,
                                     Name = u.Name
                                 }).Take(10).ToListAsync();

            return Ok(results);
        }

        [HttpGet("test-error")]
        public IActionResult TestError()
        {
            throw new Exception("This is a test exception to verify global error handling!");
        }

        [HttpPost]
        public async Task<IActionResult> CreateWallet([FromBody] CreateWalletRequest request)
        {
            var wallet = new Wallet
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId == Guid.Empty ? Guid.NewGuid() : request.UserId,
                Balance = request.StartingBalance,
                Currency = string.IsNullOrWhiteSpace(request.Currency) ? "USD" : request.Currency,
                Status = "Active"
            };

            _db.Wallets.Add(wallet);
            await _db.SaveChangesAsync();

            return Ok(wallet);
        }
    }

    public record CreateWalletRequest(Guid UserId, decimal StartingBalance, string Currency);
}
