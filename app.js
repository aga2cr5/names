import { Application } from "./deps.js";
import { router } from "./routes/routes.js";
import * as middleware from './middlewares/middlewares.js';
import { viewEngine, engineFactory, adapterFactory } from "./deps.js";
import { PORT } from "./config/config.js";

const app = new Application();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
app.use(viewEngine(oakAdapter, ejsEngine, {
    viewRoot: "./views"
}));

app.use(middleware.errorMiddleware);
app.use(middleware.requestTimingMiddleware);
app.use(middleware.serveStaticFilesMiddleware);

app.use(router.routes());

if (!Deno.env.get('TEST_ENVIRONMENT')) {
    if (Deno.args.length > 0) {
      const lastArgument = Deno.args[Deno.args.length - 1];
      PORT = Number(lastArgument);
    }
    app.listen({ port: PORT });
  }
  
  export default app;