/**
 * ActivitiesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


 
module.exports = {

      /**
   * 
   * @param {*} req 
   * @param {*} res 
   * @returns 
   * @description Used to register Activity of the vehicle
   * @createdAt 22/08/2021
   * @createdBy Amit Kumar
   */
    saveActivity: (req, res)=>{
        var vehicle_number = req.body.vehicle_number
        todayStartTime = new Date()
        todayStartTime.setHours(0,0,0,0)
        todayEndTime = new Date()
        todayEndTime.setHours(23,59,59,0)

        var query = {};
        query.vehicle_number = vehicle_number
        query.createdAt = {'>=':todayStartTime,"<=":todayEndTime}
        if(req.body.endingKm != ""){
            req.body.endingKm  = Number(req.body.endingKm)
        }else{
            delete req.body.endingKm
        }

        if(req.body.startingKm != ""){
            req.body.startingKm  = Number(req.body.startingKm)
        }
        if(req.body.startingKm && req.body.endingKm){
            req.body.totalKm = Number(req.body.endingKm) - Number(req.body.startingKm)
        }
        
        
        Activities.findOne(query).then(activity=>{
            if(activity){
                Activities.update({id:activity.id},req.body).fetch().then(updatedActivity=>{
                    return res.status(200).json({
                        "success":true,
                        "data":updatedActivity,
                        "message":"Activity updated successfully."
                    })
                })
            }else{
                req.body.addedBy
                Activities.create(req.body).then(vehcleAdded=>{
                    return res.status(200).json({
                        "success":true,
                        "message": "Activity for today added successfully"
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
   activitiesList: (req, res)=>{
    Activities.count({}).then(total=>{
        Activities.find({}).populate('vehicle_number').populate('addedBy').then(activities=>{
                return res.json({
                    "success": true,
                    "data":activities,
                    "total":total
                })
            })
        })
      
    },

    activityDetail:(req, res)=>{
        var id = req.param('id')

        Activities.findOne({id:id}).populate('vehicle_number').populate('addedBy').then(activity=>{
            return res.status(200).json({
                "success":true,
                "data":activity
            })
        })
    },

    updateActivity:(req, res)=>{
        var id = req.param('id')
        if(req.body.endingKm != ""){
            req.body.endingKm  = Number(req.body.endingKm)
        }else{
            delete req.body.endingKm
        }

        if(req.body.startingKm != ""){
            req.body.startingKm  = Number(req.body.startingKm)
        }
        if(req.body.startingKm && req.body.endingKm){
            req.body.totalKm = Number(req.body.endingKm) - Number(req.body.startingKm)
        }


        Activities.update({id:id}, req.body).then(updatedActivity=>{
            return res.status(200).json({
                "success":true,
                "message":"Activity updated successfully."
            })
        })
    }


  

};

