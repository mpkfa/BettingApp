using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BettingApp.Models
{
    public class Ticket : TimestampedEntity
    {
        public Ticket() => Bets = new HashSet<Bet>();

        public int UserId { get; set; }

        [ForeignKey( nameof( UserId ) )]
        public User User { get; set; }

        public decimal Amount { get; set; }

        public DateTime? ResolvedUtc { get; set; }

        public int Status { get; set; }

        [Required]
        public ICollection<Bet> Bets { get; set; }
    }
}