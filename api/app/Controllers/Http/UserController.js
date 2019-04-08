'use strict'
const User = use('App/Models/User')
const aws = require('aws-sdk')
const Drive = use('Drive')
const s3 = new aws.S3();
const S3_BUCKET = process.env.bucket

class UserController {

    async uploadImage({request,response}) {
        // try{
         request.multipart.file('image_url', {}, async (file) => {
             
            //runs second
             await Drive.disk('s3').put(file.clientName, file.stream)
               const s3_image_url =  Drive.disk('s3').getUrl(file.clientName)
               response.send(s3_image_url)
           })
             //runs first
             await request.multipart.process()
      
     }

    async userProfile({request, auth, response}) {
        // const {image_url, description} = request.post()
        // const user = await auth.getUser()
        // const profileData = await ;
    
    }

    async createUser({ request, auth, response }) {
      const {first_name, last_name, username, email, password, zipcode, image_url}=request.post()
        let user = await User.create(
            {
                first_name,
                last_name,
                username,
                email,
                password,
                zipcode,
                image_url
            })
            
            const token = await auth.generate(user)
            
            console.log(user)
            response.json({
                message: `${user.username} added to the database`,
                data: token,
            })

    }
    async getUser({ request, response, auth }) {
        try{
            let user = await auth.getUser()
            response.json({
                user: user
            })
            
        }catch(e){
            response.send(e)
        }
    }
    async updateUser({ request, response, auth }) {
        try{
            
            
            let user = await auth.getUser()

           
            const {first_name,last_name, username,password, zipcode, email, image_url} = request.post()
            //updates user to form data
            user.first_name = first_name
            user.last_name = last_name
            user.username = username
            user.email = email
            user.password = password
            user.zipcode = zipcode
            user.image_url = image_url
            await user.save()
            response.json({
                updated_user: user
            })
        }catch(e){
            response.send(e)
        }
        
    }
    async deleteUser({ request, response, auth }) {
        try{
            let user = await auth.getUser()
            await user.delete()
            response.json({
                message:"user was deleted"
            })
        }catch(e){
            response.send(e)
        }
    }
    
    async login({ request, auth, response }) {
  
        const email = request.input("email")
        const password = request.input("password");
       
       try{
             if (await auth.attempt(email, password)) {
                await auth.attempt(email, password)
                let user = await User.findBy('email', email )
                let accessToken = await auth.generate(user)
                return response.json({ "message": "success", "access_token": accessToken })
             }
            
            }
        catch (e) {
            return response.status(400).json({ message: "failed to login" })
            // return e
             }
    }

}
module.exports = UserController
