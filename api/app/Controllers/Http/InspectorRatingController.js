'use strict'
const Rating = use("App/Models/InspectorRating")
const Database = use("Database")
class InspectorRatingController {
    async createRating({auth,request,response}){
        let user = await auth.getUser()
        let userRating = request.input("score")
        let inspectorId = request.input("inspector_id")
        let userId = user.id
        let previousRatings = await Database.query().table("inspector_ratings").where("user_id",userId).where("inspector_id",inspectorId)
        if(previousRatings.length !== 0){
            return "Rating Was Already Created"
           
        }else{
            let rating = await Rating.create({
                inspector_id: inspectorId,
                user_id: userId,
                user_rating: userRating
            })
        }
    }
    async getInspectorRating({request,auth,response}){
        let user = await auth.getUser()
        let inspectorId = user.inspector_id
        let rating = await Database.query().table("inspector_ratings").where("inspector_id", inspectorId)
        let score = 0
        rating.forEach((value) =>{
            score = score + value.user_rating
        })
        let convertScoreToPercent = (score /(rating.length * 10))
        response.send({score:convertScoreToPercent})
    }
}

module.exports = InspectorRatingController
