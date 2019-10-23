using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;
using BettingApp.Models;

namespace BettingApp.Common
{
    public static class Config
    {
        private static string Get( string key ) => ConfigurationManager.AppSettings[key];

        public static string ApplicationName => Get( "ApplicationName" );

        public static string DatabaseName => Get( "DatabaseName" );

        public static string ConnectionString => ConfigurationManager.ConnectionStrings["Default"].ConnectionString;
    }
}