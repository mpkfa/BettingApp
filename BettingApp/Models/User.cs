using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BettingApp.Models
{
    public class User : TimestampedEntity
    {
        public User() => Tickets = new HashSet<Ticket>();

        [Required, MaxLength( 50 )]
        public string DisplayName { get; set; }

        [Required, MaxLength( 20 )]
        public string Username { get; set; }

        [Required, MaxLength( 20 )]
        public string Password { get; set; }

        public decimal Credit { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}