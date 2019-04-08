"use strict";
const Inspection = use('App/Models/Inspection')
const InspectionImage = use("App/Models/InspectionImage")
const InspectionRequest = use("App/Models/InspectionRequest")
const Database = use("Database")
class InspectionController {
  async createInspectionRequest({ request, response, auth }) {
    let { item, item_url, user_id, inspector_id } = request.all()
    let inspectionRequest = await InspectionRequest.create({
      item,
      item_url,
      user_id,
      inspector_id
    })
    response.send(inspectionRequest)
  }
  async getInspectionRequests({ request, response, auth }) {

    let { inspector_id } = request.all()

    let pendingInspections = await Database
      .query()
      .table("inspection_requests")
      .where("inspector_id", inspector_id)
      .where("approved", null)

    let approvedInspections = await Database
      .query()
      .table("inspection_requests")
      .where("inspector_id", inspector_id)
      .where("approved", true)

    response.send({ pendingInspections, approvedInspections })
  }

  async denyInspectionRequest({ request, response, auth }) {
    let { id, inspector_id } = request.all()
    let inspectionToDeny = await Database
      .table("inspection_requests")
      .where("id", id)
      .update("approved", false)
    // await inspectionToDeny.update("approve",false)
    let pendingInspections = await Database
      .query()
      .table("inspection_requests")
      .where("inspector_id", inspector_id)
      .where("approved", null)

    let approvedInspections = await Database
      .query()
      .table("inspection_requests")
      .where("inspector_id", inspector_id)
      .where("approved", true)
    response.send({ inspectionToDeny, pendingInspections, approvedInspections })
  }
  async approveInspectionRequest({ request, response, auth }) {
    let { id, inspector_id } = request.all()
    let inspectionToAccept = await Database
      .table("inspection_requests")
      .where("id", id)
      .update("approved", true)
    // await inspectionToDeny.update("approve",false)
    let pendingInspections = await Database
      .query()
      .table("inspection_requests")
      .where("inspector_id", inspector_id)
      .where("approved", null)

    let approvedInspections = await Database
      .query()
      .table("inspection_requests")
      .where("inspector_id", inspector_id)
      .where("approved", true)
    response.send({ inspectionToAccept, pendingInspections, approvedInspections })
  }
  //user clicks on inspector
  //submit inspection request

  //inspector logs in to view pending requests
  //change from pending to active or void

  //if inspector accepts request moves
  //into active and he can click on that which
  //goes to form where he can fill out form

  //create and send info into backend to use this controller
  //EL FORMO IS GONNA POP UPO
  async createInspectionImage({ request, response, auth }) {
    const { image_url, image_description, request_id } = await request.all()
    let findInspectionId = await Inspection.findBy("request_id", request_id)
    let inspection_id = findInspectionId.id
    // let user = await auth.getUser()
    // let user_id = user.id

    let inspectionImage = await InspectionImage.create({
      image_description,
      image_url,
      inspection_id,
    })

    let uploadedImages = await Database.query().table('inspection_images').where("inspection_id", inspection_id)
    
    response.send(uploadedImages)
  }
  async getInspectionImages({ request, response, auth }) {
    const { request_id } = await request.all()
    let findInspectionId = await Inspection.findBy("request_id", request_id)
    let inspection_id = findInspectionId.id
    let uploadedImages = await Database.query().table('inspection_images').where("inspection_id", inspection_id)
    response.send(uploadedImages)

  }
  // async inspectionImageUpload({ request, response, auth }) {
  //   let { image_description, image_url,request_id } = request.all()

  //     // let inspector = await auth.getUser()
  //     // console.log(inspector)
  //     // inspector_id = inspector.inspector_id
  //     let inspectionImage = await InspectionImage.create({
  //       id: 1,
  //       image_url,
  //       image_description
  //     })
  //     response.send({ message: "your sheit has been uploaded YASS" })
  //   // } catch (e) {
  //   //   return e
  //   // }
  // }

  async createInspection({ request, response, auth }) {
      const { user_id, inspector_id, request_id } = await request.all()

    let alreadyCreatedInspection = await Inspection.findBy("request_id", request_id)

    if (alreadyCreatedInspection) {
      response.send(alreadyCreatedInspection)
    } else {
      let inspection = await Inspection.create({
        user_id,
        inspector_id,
        request_id
      })
      response.send(inspection)
    }
  }
  async getInspection({ request, response, auth }) {
    const { request_id } = request.all()
    let inspection = await InspectionRequest.findBy("id", request_id)
    response.send(inspection)
  }
  async completeInspection({request,response,auth}){
    let {request_id,description} = request.all()
    let inspection = await Inspection.findBy("request_id", request_id)
    inspection.description = description
    inspection.inspection_completed = true
    await inspection.save()
    response.send(inspection)

  }

}

module.exports = InspectionController;
