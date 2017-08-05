import express from 'express';
import path from 'path';
import React from 'react';
import {
    match
} from 'react-router';
import routes from '../client/router';
import configureStore from '../client/redux';
import _render from './render';
import * as API from '../client/api';

var app = express();
app.use('/', express.static(path.join(process.cwd(), 'dist', 'client')));
console.log(path.join(process.cwd(), 'dist', 'client'))

function renderFullPage(html, initialState) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" href="/css/main.css" />
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
      <script src="/js/manifest.chunk.js"></script>
      <script src="/js/vendor.chunk.js"></script>
      <script src="/js/main.client.js"></script>
    </body>
    </html>
  `;
}

app.use((req, res) => {
    let msg = req.query.msg || 'hello world';

    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {

            var store = configureStore();
            API.getArticleList().then(ret => {
                store.dispatch({
                    type: 'SET_ARTICLE_LIST',
                    payload: ret.data
                });
                var html = _render(store, renderProps);
                res.end(renderFullPage(html, store.getState()));
            })

        } else {
            res.status(404).end('Not found');
        }
    });
});
app.listen(3000);