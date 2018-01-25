'use strict';

module.exports = () => {
  return new Parse.Query('Hotel')
    .find({ useMasterKey: true })
    .then((response) => {
        if (response.length === 0) {
          const data = require('./data').map((hotel) => {
            return new Parse.Object('Hotel').set({...hotel});
          });
          return new Parse.Object.saveAll(data, { useMasterKey:true });
        }
      }
    )
    .then(response => response ? console.log('Demo Data Saved') : '')
    .catch(error => {
      console.log(error);
    });
};
