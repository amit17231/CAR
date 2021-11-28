/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const bcrypt = require('bcrypt-nodejs');
 var constantObj = sails.config.constants;
module.exports = {

      /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   * @description Used to register 
   * @createdAt 22/08/2021
   * @createdBy Amit Kumar
   */
  register: async (req, res)=> {
 
    if ((!req.body.email) || typeof req.body.email == undefined) {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.EMAIL_REQUIRED } });
    }
    if ((!req.body.password) || typeof req.body.password == undefined) {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.PASSWORD_REQUIRED } });
    }
    var date = new Date();
    try {
      var user = await Users.findOne({ email: req.body.email.toLowerCase() });
      if (user) {
        return res.status(400).json({ "success": false, "error": { "code": 400, "message": constantObj.user.EMAIL_EXIST } });
      } else {
        req.body['date_registered'] = date;
        req.body['date_verified'] = date;
        req.body["status"] = "active";
        req.body["role"] = req.body.role;
        
        if(req.body.firstName & req.body.lastName){
          req.body["fullName"] = req.body.firstName + ' ' + req.body.lastName
        }
 

        var newUser = await Users.create(req.body).fetch()
        if (newUser) {
        //   userVerifyLink({
        //     email: newUser.email,
        //     fullName: newUser.fullName,
        //     id: newUser.id
        //   })

          return res.status(200).json({
            "success": true,
            "code": 200,
            "data": newUser,
            "message": constantObj.user.SUCCESSFULLY_REGISTERED,
          });
        }
      }
    } catch (err) {
      console.error(err);
      return res.status(400).json({ "success": true, "code": 400, "error": err, });
    }
  },

  /**
   * 
   * @reqBody  : {email,password}
   * @param {*} res 
   * @returns 
   */
  adminSignin: async (req, res) => {
   
    if ((!req.body.email) || typeof req.body.email == undefined) {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.EMAIL_REQUIRED } });
    }

    if ((!req.body.password) || typeof req.body.password == undefined) {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.PASSWORD_REQUIRED } });
    }

    var user = await Users.findOne({ email: req.body.email.toLowerCase(),isDeleted: false ,role:{in:['admin','sub_admin']} });
    if (!user) {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.WRONG_EMAIL } });
    }

    if (user && user.status == 'deactive') {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.USERNAME_INACTIVE } });
    }

    if (user && user.status != "active" && user.isVerified != "Y") {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.USERNAME_INACTIVE } });
    } 

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(404).json({ "success": false, "error": { "code": 404, "message": constantObj.user.WRONG_PASSWORD } });
    } else {
     
      var token = jwt.sign({ user_id: user.id, firstName: user.firstName },
        { issuer: 'Amit Kumar', subject: user.email, audience: "cab_portal" })
   
      user.access_token = token;
  
      return res.status(200).json(
        {
          "success": true,
          "code": 200,
          "message": constantObj.user.SUCCESSFULLY_LOGGEDIN,
          "data": user
        });
    }
  },


  editProfile: (req,res)=>{
      console.log(req.identity.id)
      Users.findOne({id:req.identity.id}).then(user=>{
          if(user){
              Users.update({id:user.id},req.body).fetch().then(updatedUser=>{                
                  return res.status(200).json({
                      "success":true,
                      "user":updatedUser,
                      "message":"Profile updated successfully."
                  })
              })
          }else{
              return res.status(404).json({
                  "success":false,
                  "error":{"code":404,"message":"User not found."}
              })
          }
      })
  }
  

};

