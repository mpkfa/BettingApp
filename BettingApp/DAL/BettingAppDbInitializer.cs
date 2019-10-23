using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using BettingApp.Models;

namespace BettingApp.DAL
{
    public class BettingAppDbInitializer : CreateDatabaseIfNotExists<BettingAppDbContext>
    {
        public override void InitializeDatabase( BettingAppDbContext db )
        {
            SqlConnection.ClearAllPools();

            base.InitializeDatabase( db );
        }

        protected override void Seed( BettingAppDbContext db )
        {
            #region Demo data

            var user = new User
            {
                DisplayName = "Demo User",
                Username = "demo",
                Password = "demo",
                Credit = 100
            };

            var betOptions = "1,X,2,1X,12,X2".Split( ',' );

            var sports = new (string name, string icon, string betOptions)[]
            {
                ("Football", "football.png", "1,X,2,1X,12,X2"),
                ("Basketball", "basketball.png", "1,2"),
                ("Tennis", "tennis.png", "1,2"),
            };

            var events = new (int sportId, string participant1, string participant2)[]
            {
                (1, "Hajduk Split", "Gzira United"),
                (1, "Dinamo Zagreb", "Lyon"),
                (1, "Guangzhou Evergrande FC", "Beijing Guoan"),
                (2, "Jugoplastika", "Maccabi"),
                (3, "Federer", "Nadal")
            };

            var offers = new (int eventId, bool isTopOffer, double[] coefficients)[]
            {
                (1, false, new[]{ 1.11, 2.23, 4.51, 1.14, 1.73, 1.92 }),
                (1, true, new[]{ 1.15, 5.53, 55.55, 2.31, 4.07, 1.22 }),
                (2, false, new[]{ 1.1, 1.1, 1.1, 1.1, 1.1, 1.1 }),
                (3, false, new[]{ 1.1, 1.1, 1.1, 1.1, 1.1, 1.1 }),
                (4, false, new[]{ 1.71, 2.31 }),
                (5, false, new[]{ 2.14, 1.97 }),
            };

            var tickets = new (int amount, (int offerId, int betOptionId)[] bets)[]
            {
                (10, new[]{(1, 1), (2, 2), (4, 1) })
            };

            #endregion

            #region Seed data 

            db.Users.Add( user );

            db.SaveChanges();

            db.BetOptions.AddRange( betOptions.Select( x => new BetOption { Value = x } ) );

            db.SaveChanges();

            var optionsList = db.BetOptions.ToList();

            db.Sports.AddRange( sports.Select( x => new Sport
            {
                Name = x.name,
                Icon = x.icon,
                BetOptions = x.betOptions.Split( ',' ).Select( o => optionsList.First( option => option.Id == Array.IndexOf( betOptions, o ) + 1 ) ).ToList()
            } ) );

            db.SaveChanges();

            db.Events.AddRange( events.Select( x => new Event
            {
                SportId = x.sportId,
                Participant1 = x.participant1,
                Participant2 = x.participant2,
                StartUtc = DateTime.UtcNow.AddMinutes( 3 + ( new Random().NextDouble() * 10 ) )
            } ) );

            db.SaveChanges();

            db.Offers.AddRange( offers.Select( offer => new Offer
            {
                EventId = offer.eventId,
                IsTopOffer = offer.isTopOffer,
                Odds = offer.coefficients.Select( ( o, i ) => new Odd
                {
                    BetOption = optionsList.First( option => option.Id == Array.IndexOf( betOptions, sports[events[offer.eventId - 1].sportId - 1].betOptions.Split( ',' )[i] ) + 1 ),
                    Coefficient = (decimal)o
                } ).ToList()
            } ) );

            db.SaveChanges();

            var offersList = db.Offers.Include( x => x.Odds ).ToList();

            db.Tickets.AddRange( tickets.Select( x => new Ticket
            {
                UserId = 1,
                Amount = x.amount,
                Bets = x.bets.Select( bet => new Bet
                {
                    OfferId = bet.offerId,
                    OddId = offersList.First( o => o.Id == bet.offerId ).Odds.First( o => o.BetOptionId == bet.betOptionId ).Id
                } ).ToList()
            } ) );

            db.SaveChanges();

            base.Seed( db );

            #endregion
        }
    }
}