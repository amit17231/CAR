/**
 * Activities.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    vehicle_number: {
        model: 'vehicle',
    },

    from: {
        type: 'string',
    },

    to: {
        type: 'string',
    },

    startingKm: {
        type: 'number',
    },

    endingKm: {
        type: 'number',
    },

    totalKm: {
        type: 'number',
    },

    addedBy: {
      model: 'users'
    },

    driver_name:{
        type: "string"
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

