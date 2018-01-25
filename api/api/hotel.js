'use strict';

const { Query } = require('../helpers');

module.exports = {
  getAll(req, res) {
    let query = new Parse.Query('Hotel');
    const { or } = req.query;
    if (or) query = Query.buildOr(query, 'Hotel', req, res);
    Query.buildWhere(query, req, res);
    Query.buildMatch(query, req, res);
    query.find({ useMasterKey: true }).then(
      hotels => res.send(hotels),
      error => res.status(400).send(error)
    );
  },
  get(req, res) {
    const { id } = req.params;
    new Parse.Query('Hotel').get(id, { useMasterKey: true }).then(
      hotel => res.send(hotel),
      error => res.status(400).send(error)
    );
  },
  update(req, res) {
    const { id } = req.params;
    const { body } = req;
    new Parse.Query('Hotel').get(id, { useMasterKey: true })
      .then(hotel => hotel.save(body, { useMasterKey: true }))
      .then(response => res.send(response))
      .catch(error => res.status(400).send(error));
  },
  delete(req, res) {
    const { id } = req.params;
    new Parse.Query('Hotel').get(id, { useMasterKey: true })
      .then(hotel => hotel.destroy())
      .then(response => res.send(response))
      .catch(error => res.status(400).send(error));
  },
  save(req, res) {
    const { id } = req.params;
    const { body } = req;
    new Parse.Object('Hotel')
      .save(body, { useMasterKey: true })
      .then(hotel => res.send(hotel))
      .catch(error => res.send(error));
  },
};
