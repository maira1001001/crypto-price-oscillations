import 'dotenv/config';
import express, { Server } from 'express';
import routes from './routes';

function build(): Server {
  const app = express();
  Object.entries(routes).map(([routeName, routeValue]) =>
    app.use(`/${routeName}`, routeValue)
  );
  return app;
}

async function start(app: Server) {
  try {
    await app.listen(process.env.PORT); // TODO: use config instead of process.env
    console.log(`Server listening on ${process.env.PORT}`); // TODO: install logger instead of using console
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export { build, start };
