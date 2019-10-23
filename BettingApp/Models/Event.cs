using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BettingApp.Models
{
    public class Event : TimestampedEntity
    {
        public int SportId { get; set; }

        [ForeignKey( nameof( SportId ) )]
        public Sport Sport { get; set; }
        
        [Required, MaxLength( 50 )]
        public string Participant1 { get; set; }
        
        [Required, MaxLength( 50 )]
        public string Participant2 { get; set; }

        [Required]
        public DateTime StartUtc { get; set; }

        //TODO
        //public DateTime FinishUtc { get; set; }
        //public int Status { get; set; }
        //public string Score1 { get; set; }
        //public string Score2 { get; set; }
    }
}