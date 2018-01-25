'use strict';

const express = require('express');
const { ParseServer } = require('parse-server');
const bodyParser = require('body-parser');

const { apiVersion, parse } = require('./config');
const { NODE_ENV, PORT } = process.env;
const { Hotel } = require('./api');
const app = express();
const api = new ParseServer(parse);

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Parse Server Endpoint
app.use(parse.mountPath, api);

app.get(`/api/${apiVersion}/hotel`, Hotel.getAll);

app.post(`/api/${apiVersion}/hotel`, Hotel.save);

app.get(`/api/${apiVersion}/hotel/:id`, Hotel.get);

app.delete(`/api/${apiVersion}/hotel/:id`, Hotel.delete);

app.put(`/api/${apiVersion}/hotel/:id`, Hotel.update);

app.listen(PORT || 1337, () => console.log(`parse-server running on port ${PORT || 1337}`));

const saveDemoData = require('./data/saveData')();