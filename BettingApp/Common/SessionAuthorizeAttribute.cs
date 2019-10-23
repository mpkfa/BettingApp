using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using BettingApp.DAL;
using BettingApp.Models;

namespace BettingApp.Common
{
    public class SessionAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore( HttpContextBase httpContext )
        {
            var userId = httpContext.Session["userId"];

            if ( userId == null)
            {
                using (var db = new BettingAppDbContext() )
                {
                    httpContext.Session["userId"] = db.Users.First().Id;
                }
            }

            return true;
        }

        protected override void HandleUnauthorizedRequest( AuthorizationContext filterContext )
        {
            filterContext.Result = new RedirectToRouteResult(
                                  new RouteValueDictionary
                                  {
                                    { "action", "Login" },
                                    { "controller", "LoginController" }
                                  } );
        }
    }
}