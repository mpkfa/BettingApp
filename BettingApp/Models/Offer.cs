using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BettingApp.Models
{
    public class Offer : TimestampedEntity
    {
        public int EventId { get; set; }

        [ForeignKey( nameof( EventId ) )]
        public Event Event { get; set; }

        public bool IsTopOffer { get; set; }

        [Required]
        public ICollection<Odd> Odds { get; set; }
    }
}