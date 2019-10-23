using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace BettingApp.Models
{
    public abstract class Entity
    {
        public int Id { get; set; }
    }

    public abstract class TimestampedEntity : Entity
    {
        public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    }
}