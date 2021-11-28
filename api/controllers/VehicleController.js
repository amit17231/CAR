/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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
    saveVehicle: (req, res)=>{
        var vehicle_number = req.body.vehicle_number

        Vehicle.findOne({vehicle_number:vehicle_number}).then(vehicle=>{
            if(vehicle){
                return res.status(404).json({"success":false,"error":{"code":404,"message":"Vehicle Already exist."}})
            }else{
                Vehicle.create(req.body).then(vehcleAdded=>{
                    return res.status(200).json({
                        "success":true,
                        "message": "Vehicle added successfully"
                    })
                })
            }
        })
    },

  /**
   * 
   * @reqBody  : {email,password}
   * @param {*} res 
   * @returns 
   */
    vehicleList: (req, res)=>{
        Vehicle.count({}).then(total=>{
            Vehicle.find({}).then(vehicles=>{
                return res.json({
                    "success": true,
                    "data":vehicles,
                    "total":total
                })
            })
        })
      
    },

    vehicleDetail:(req, res)=>{
        var id = req.param('id')

        Vehicle.findOne({id:id}).then(vehicle=>{
            return res.status(200).json({
                "success":true,
                "data":vehicle
            })
        })
    }
  

};

