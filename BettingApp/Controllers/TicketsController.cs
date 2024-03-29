﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using BettingApp.DAL;
using BettingApp.Models;
using ThenInclude.EF6;

namespace BettingApp.Controllers
{
    public class TicketsController : ApiController
    {
        private BettingAppDbContext db = new BettingAppDbContext();

        // GET: api/Tickets
        public List<Ticket> GetTickets()
        {
            return db.Tickets
                .Include( x => x.User )
                .Include( x => x.Bets )
                .Include( x => x.Bets.Select( t => t.Offer ) )
                .Include( x => x.Bets.Select( t => t.Offer.Event ) )
                .Include( x => x.Bets.Select( t => t.Offer.Event.Sport ) )
                .Include( x => x.Bets.Select( t => t.Odd ) )
                .Include( x => x.Bets.Select( t => t.Odd.BetOption ) )
                .ToList();
        }

        // GET: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public async Task<IHttpActionResult> GetTicket(int id)
        {
            Ticket ticket = await db.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            return Ok(ticket);
        }

        // PUT: api/Tickets/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutTicket(int id, Ticket ticket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ticket.Id)
            {
                return BadRequest();
            }

            db.Entry(ticket).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Tickets
        [ResponseType(typeof(Ticket))]
        public async Task<IHttpActionResult> PostTicket([FromBody]Ticket ticket)
        {
            if ( !ModelState.IsValid )
            {
                return BadRequest( ModelState );
            }

            // TODO logirat transakciju
            db.Users.Find( ticket.UserId ).Credit -= ticket.Amount;
            db.Tickets.Add(ticket);

            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = ticket.Id }, ticket);
        }

        // DELETE: api/Tickets/5
        [ResponseType(typeof(Ticket))]
        public async Task<IHttpActionResult> DeleteTicket(int id)
        {
            Ticket ticket = await db.Tickets.FindAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }

            db.Tickets.Remove(ticket);
            await db.SaveChangesAsync();

            return Ok(ticket);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TicketExists(int id)
        {
            return db.Tickets.Count(e => e.Id == id) > 0;
        }
    }
}