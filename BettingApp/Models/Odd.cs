using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BettingApp.Models
{
    public class Odd : TimestampedEntity
    {
        public int BetOptionId { get; set; }

        [ForeignKey( nameof( BetOptionId ) )]
        public BetOption BetOption { get; set; }

        public int OfferId { get; set; }

        [ForeignKey( nameof( OfferId ) )]
        public Offer Offer { get; set; }

        public decimal Coefficient { get; set; }
    }
}