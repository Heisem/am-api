module.exports = {
  buildWhere(query, req, res) {
    const { where } = req.query;
    if (where) {
      try {
        const obj = JSON.parse(where);
        Object.keys(obj).map((key) => {
          query.equalTo(key, obj[key]);
        });
      } catch(error) {
        res.status(400).send({ message: 'Bad where query' });
      }
    }
  },
  buildOr(query, collection, req, res) {
    const { or } = req.query;
    if (or) {
      try {
        let orQueries = [];
        const obj = JSON.parse(or);
        Object.keys(obj).map((key) => {
          obj[key].map((value) => {
            orQueries.push(new Parse.Query(collection).equalTo(key, value));
          });
        });
        return new Parse.Query.or(...orQueries);
      } catch(error) {
        res.status(400).send({ message: 'Bad or query' });
      }
    }
  },
  buildMatch(query, req, res) {
    const { match } = req.query;
    if (match) {
      try {
        const obj = JSON.parse(match);
        Object.keys(obj).map((key) => {
          const regObj = new RegExp(obj[key], 'gi');
          query.matches(key, regObj);
        });
      } catch(error) {
        res.status(400).send({ message: 'Bad match query' });
      }
    }
  },
};
