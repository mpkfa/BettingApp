using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BettingApp.Models
{
    public class Sport : Entity
    {
        [Required, MaxLength( 20 )]
        public string Name { get; set; }

        [Required, MaxLength( 50 )]
        public string Icon { get; set; }

        public ICollection<BetOption> BetOptions { get; set; }
    }
}