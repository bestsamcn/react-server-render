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

//开发环境没有弄公共文件，直接引入入口文件main.client.js
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
      <script src="/js/main.client.js"></script>
    </body>
    </html>
  `;
}

//返回页面
const getComponentState = (store, renderProps, res) => {
    //如果组件有static getInitState()这个方法就获取相关数据后返回
    if (renderProps.components[3].getInitState) {
        renderProps.components[3].getInitState(store.dispatch).then(ret => {
            //__render的方法是引进来的
            var html = _render(store, renderProps);
            res.end(renderFullPage(html, store.getState()));
        }, err => {
            console.log(err)
        }).catch(e => {});
    } else {
        var html = _render(store, renderProps);
        res.end(renderFullPage(html, store.getState()));
    }

}


//当前页面刷新匹配相应的路由
app.use((req, res) => {
    console.log(req.url, 'urlurlurlurlurl')
    var store = configureStore();
    match({
        routes,
        location: req.url
    }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            getComponentState(store, renderProps, res);
        } else {
            res.status(404).end('Not found');
        }
    });
});
app.listen(3000);