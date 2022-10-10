import { readFile } from 'fs';
import path from 'path';

readFile('package.json', 'utf8', (error: any, data: any)=> {
  if (error) {
    console.log('Error while reading package.json', error);
    return;
  }

  console.log(`Testing typescript config with nodejs and es module, Version: , ${JSON.parse(data).version}`);
});


