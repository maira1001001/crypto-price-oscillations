import { build, start } from './server';

const app = build();
start(app)
  .then(() => console.log(`Server running`))
  .catch((err) => console.log(err));
