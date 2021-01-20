let config = {};

if (Deno.env.get('TEST_ENVIRONMENT')) {
  config.database = {};
} else {
  //replace these with your postgresql database info
  config.database = {
    hostname: "rogue.db.elephantsql.com",
    database: "xhjtwwhy",
    user: "xhjtwwhy",
    password: "kuyGvYAZ4uAsIRlJxg0l2g5g2AOlS8aj",
    port: 5432
  };
}

//replace this with the port you want to run this application
let PORT = 7777;

//sets amount of concurrent connections to the database. this should not be changed unless you
//know how many concurrent connections you database accepts. for elephantsql tiny turtle version
//it's 5 connections but we don't want to set all them here.
const CONCURRENT_CONNECTIONS = 3;

export { config, PORT, CONCURRENT_CONNECTIONS }; 