
import express from 'express';
import path from 'path';
import React from 'react';
import { match } from 'react-router';
import routes from '../client/router';
import configureStore from '../client/store';
import _render from './render';

var app = express();
app.use('/', express.static(path.join(process.cwd(), 'dist', 'client')));
console.log(path.join(process.cwd(), 'dist', 'client'))
function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="app">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/manifest.chunk.js"></script>
      <script src="/vendor.chunk.js"></script>
      <script src="/main.client.js"></script>
    </body>
    </html>
  `;
}

app.use((req, res) => {
  let msg = req.query.msg || 'hello world';
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var initstate = {list:{list:['1','2','3']}, item:{item:msg}}
      var store = configureStore(initstate);

      var html = _render(store, renderProps);
      res.end(renderFullPage(html, store.getState()));
    } else {
      res.status(404).end('Not found');
    }
  });
});
app.listen(3000);