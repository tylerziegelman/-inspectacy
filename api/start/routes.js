'use strict'


/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Anything that involves a user
Route.post('/createUser', "UserController.createUser") //create user 
Route.get('/getUser', "UserController.getUser") //read user (needs auth)
Route.put('/updateUser', "UserController.updateUser") //update user (needs auth)
Route.delete('/deleteUser', "UserController.deleteUser") //delete user (needs auth)
Route.post('/loginUser', "UserController.login")
Route.post('/uploadImage', "UserController.uploadImage")
//Anything that involves a insepctor
Route.post('/createInspector', "InspectorController.createInspector") //create inspector
Route.get('/getInspector', "InspectorController.getInspector") //read inspector (needs auth)
Route.put('/updateInspector', "InspectorController.updateInspector") //update inspector (needs auth)
Route.delete('/deleteInspector', "InspectorController.deleteInspector") //delete inspector (needs auth)
Route.post('/createSkills', "InspectorController.attachSkills")
Route.get('/getAllInspectors', 'InspectorController.getAllInspectors')
Route.get('/getInspectorSkills', 'InspectorController.getInspectorSkills')

Route.post('/inspectorImageUpload', "InspectionController.inspectionImageUpload")
Route.post('/createInspectionRequest', "InspectionController.createInspectionRequest")
Route.post('/getInspectionRequests', "InspectionController.getInspectionRequests")
Route.post('/denyInspectionRequest', "InspectionController.denyInspectionRequest")
Route.post('/approveInspectionRequest', "InspectionController.approveInspectionRequest")
Route.post('/createInspection', "InspectionController.createInspection")
Route.post("/getInspection", "InspectionController.getInspection")
Route.post('/createInspectionImage', "InspectionController.createInspectionImage")
Route.post("/getInspectionImages", 'InspectionController.getInspectionImages')
Route.post("/completeInspection", "InspectionController.completeInspection")

Route.get('/profile/:id', 'InspectorController.showInspectorProfile')

Route.put('/becomeAnInspector', 'InspectorController.becomeAnInspector').middleware('auth')
//Anything that involves messages
// Route.post('/createMessage', "MessageController.createMessage").middleware('auth') //create message (needs auth)
// Route.post('/getMessage', "MessageController.getMessage") //read message (needs auth)

Route.post('/createRating', 'InspectorRatingController.createRating')
Route.get('/getInspectorRating', 'InspectorRatingController.getInspectorRating')
//Chatkit
Route.post('chatCreateRoom', 'MessageController.createRoom')
Route.post('chatSendMessage', 'MessageController.sendMessage')
Route.post('chatGetUserRooms', 'MessageController.getUserRooms')
