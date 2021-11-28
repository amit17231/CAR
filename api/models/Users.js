/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 const bcrypt = require('bcrypt-nodejs');
module.exports = {

  attributes: {
    firstName: {
        type: 'string',
    },
    lastName: {
        type: 'string',
    },
    fullName: {
        type: 'string',
        //required: true
    },
   
  
    email: {
        type: 'string',
        isEmail: true,
    },
    mobileNo: {
      type: 'ref',
      columnType: 'bigint',
     
    },
    image: {
        type: 'string',
    },
    password: {
        type: 'string',
        columnName: 'encryptedPassword',
        minLength: 8
    },

    date_verified: {
        type: 'ref',
        columnType: 'datetime',
    },
    isVerified: {
        type: 'string',
        isIn: ['Y', 'N'],
        defaultsTo: 'N'
    },
    role: {
      type: 'string',
      isIn: ['admin', 'driver'],
      defaultsTo: 'driver'
    },

    verificationCode:{
      type:'string'
    },
 
    status: {
        type: 'string',
        isIn: ['active', 'deactive'],
        defaultsTo: 'deactive'
    },
    domain: {
        type: 'string',
        isIn: ['web', 'ios', 'andriod'],
        defaultsTo: 'web'
    },


    isDeleted: {
        type: 'Boolean',
        defaultsTo: false
    },

    lastLogin: {
        type: 'ref',
        columnType: 'datetime',
    },
    date_registered: {
        type: 'ref',
        columnType: 'datetime',
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

  beforeCreate: function (user, next) {
    if (user.firstName && user.lastName) {
        user.fullName = user.firstName + ' ' + user.lastName;
    }

    if (user.hasOwnProperty('password')) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        next(false, user);

    } else {
        next(null, user);
    }
},
authenticate: function (email, password) {
  console.log("in auth    ")
  var query = {};
  query.email = email;
  query.$or = [{ roles: ["admin", "driver"] }];

  return Users.findOne(query).populate('roleId').then(function (user) {
      //return API.Model(Users).findOne(query).then(function(user){
      return (user && user.date_verified && user.comparePassword(password)) ? user : null;
  });
},
customToJSON: function () {
  // Return a shallow copy of this record with the password and ssn removed.
  return _.omit(this, ['password','verificationCode'])
}

};

