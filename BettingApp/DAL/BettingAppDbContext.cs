using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using BettingApp.Models;

namespace BettingApp.DAL
{
    public class BettingAppDbContext : DbContext
    {
        public BettingAppDbContext() : base( "name=Default" )
        {
            Database.SetInitializer( new BettingAppDbInitializer() );
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Odd> Odds { get; set; }
        public DbSet<Offer> Offers { get; set; }
        public DbSet<BetOption> BetOptions { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Bet> Bets { get; set; }
        //public DbSet<UserHistory> History { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating( DbModelBuilder modelBuilder )
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Conventions.Remove<ManyToManyCascadeDeleteConvention>();

            base.OnModelCreating( modelBuilder );
    }
    }
}