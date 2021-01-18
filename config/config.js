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
const port = 7777;


export { config, port }; 