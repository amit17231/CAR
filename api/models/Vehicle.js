/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 const bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {
    vehicle_number: {
        type: 'string',
    },

    image: {
        type: 'string',
    },

 
    status: {
        type: 'string',
        isIn: ['active', 'deactive'],
        defaultsTo: 'deactive'
    },


    isDeleted: {
        type: 'Boolean',
        defaultsTo: false
    },


    addedBy: {
      model: 'users'
    },
    deletedBy:{
      model:'users'
    },
    deletedAt:{
      type: 'ref',
     columnType: 'datetime'
    },
    updatedBy:{
      model:'users'
    },
    createdAt: {
      type: 'ref',
      autoCreatedAt: true
  },
  updatedAt: {
      type: 'ref',
      autoUpdatedAt: true
  },

  },



};

