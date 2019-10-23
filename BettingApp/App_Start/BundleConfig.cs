using System.Web;
using System.Web.Optimization;
using System.Web.Optimization.React;

namespace BettingApp
{
    public static class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles( BundleCollection bundles )
        {
            bundles.Add( new ScriptBundle( "~/bundles/jquery" ).Include(
                        "~/Scripts/jquery-{version}.js" ) );

            bundles.Add( new ScriptBundle( "~/bundles/jqueryval" ).Include(
                        "~/Scripts/jquery.validate*" ) );

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add( new ScriptBundle( "~/bundles/modernizr" ).Include(
                        "~/Scripts/modernizr-*" ) );

            bundles.Add( new ScriptBundle( "~/bundles/bootstrap" ).Include(
                      "~/Scripts/bootstrap.js" ) );

            bundles.Add( new StyleBundle( "~/Content/css" ).Include(
                      "~/Content/CSS/bootstrap.css",
                      "~/Content/CSS/site.css" ) );

            bundles.Add( new ScriptBundle( "~/bundles/react" ).Include(
                "~/Scripts/react-dom.development-16.8.0.js",
                "~/Scripts/react.development-16.8.0.js",
                "~/Scripts/remarkable-1.7.1.min" ) );

            bundles.Add( new BabelBundle( "~/bundles/app" ).IncludeDirectory( "~/App", "*.jsx", true ) );

            //bundles.Add( new BabelBundle( "~/bundles/app" ).Include( "~/App/Application.jsx" ) );
        }
    }
}
