using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BettingApp.Models
{
    public class Bet : Entity
    {
        public int OfferId { get; set; }

        [ForeignKey( nameof( OfferId ) )]
        public Offer Offer { get; set; }

        public int OddId { get; set; }

        [ForeignKey( nameof( OddId ) )]
        public Odd Odd { get; set; }
    }
}