using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BettingApp.Models
{
    public class BetOption : Entity
    {
        public BetOption() => Sports = new HashSet<Sport>();

        [Required, MaxLength( 10 )]
        public string Value { get; set; }

        public ICollection<Sport> Sports { get; set; }
    }
}