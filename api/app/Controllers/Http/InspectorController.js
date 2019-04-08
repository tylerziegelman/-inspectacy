"use strict";
const Inspector = use("App/Models/Inspector");
const User = use("App/Models/User");
const Database = use("Database");
const Skill = use("App/Models/Skill");
const InspectorSkill = use("App/Models/InspectorSkill");

class InspectorController {
  async attachSkills({ request, auth, response }) {
    let skills = request.input("skills");
    const { skill } = request.post();
    let user = await auth.getUser();
    let inspector = await Inspector.findBy("id", user.inspector_id);
    let new_skill = await Skill.create({ skill });
    const skills_found = await Database.from("skills").whereIn("skill", skills);

    const rad_skillz = await inspector
      .skills()
      .attach(skills_found.map(skill => skill.id));
    //    const mapped_skills = skills_found.rows.map((skill)=>(skill.id))
    // let checkForPreviousSkills = await Database.query().table("inspector_skills").where("inspector_id", user.inspector_id)
    // // This finds the Inspector skills that have been created to prevent duplication

    // for( let i = 0; i < checkForPreviousSkills.length; i++){ // This loops through the found previous skills
    //     let previousSkill = await Database.query().table('skills').where("id", checkForPreviousSkills[i].skill_id)
    //     //this finds the skill in the database
    //     skills.forEach((input) =>{ // this finds the user sent in skill and compares it to what is already in the database
    //         if(previousSkill[0].skill === input){
    //             skills.splice(previousSkill[0].skill, 1) // this removes the skill from the list if the user already has that skill
    //         }
    //     })
    // }
    // if(skills.length < 1){ // This checks to see if there is any skills left to make if there isn't we know that all the skills have been created
    //     return "Skills Have Already Been Created"
    // }
    // for (let i = 0; i < skills.length; i++) {
    //     let foundSkills = await Database.query().table("skills").where("skill", skills[i])
    //     if (foundSkills.length < 1) { // This creates a skill in the table in the skill table. Then creates the the skill in the inspector table with that skill id
    //         let newSkill = await Skill.create({
    //             skill: skills[i]
    //         })
    //         await InspectorSkill.create({
    //             inspector_id: user.inspector_id,
    //             skill_id: newSkill.id
    //         })
    //     } else { // This creates a skill in the skill table with the inspector id if the skill is already in the skill table.
    //         await InspectorSkill.create({
    //             inspector_id: user.inspector_id,
    //             skill_id: foundSkills[0].id
    //         })
    //     }
    // }
    response.send({ skills: rad_skillz, new_skill: new_skill });
  }

  async becomeAnInspector({ request, response, auth }) {
    let user = await auth.getUser();
    try {
      if (!user.inspector_id) {
        let inspector = await Inspector.create();
        user.inspector_id = inspector.id;
        await user.save();
        response.send(user);
      } else {
        response.send({ message: "You are already an inspector" });
      }
    } catch (e) {
      response.send({ message: "Failed to Update" });
    }
  }

  async getInspector({ request, response, auth }) {
    try {
      let user = await auth.getUser();
      response.send(user);
    } catch (e) {
      try {
        let inspector = await auth.getUser();
        response.send(inspector);
      } catch (e) {
        response.send(e);
      }
    }
  }

  async getAllInspectors({ request, auth, response }) {
    return await Inspector.query()
      .with("user")
      .with("skills")
      .fetch();
    const inspector_ids = await Inspector.all();
    const allSkills = await Skill.all();

    const inspectorSkills = await InspectorSkill.all();

    // const inspector_skills = inspector.rows.map((el)=>{
    //     var stuff = []
    //     stuff = [{...el}]
    //     return inspectorSkills.rows.map((em)=>{
    //         return allSkills.rows.map((en)=>{
    //             if(el.id === em.inspector_id && em.skill_id === en.id) {

    //                return {inspector: el, skill: en}

    //             }
    //         }).filter((obj)=>obj)

    //     }).flat()
    // })

    // const inspector_w_skills = await inspector_skills.map((s)=>{

    //         return s.map((o)=>{

    //                 return o.skill

    //         })
    //         // return s.forEach((o)=>{

    //         //        return o

    //         // })
    // })

    response.json({
      inspector: inspector,
      skills: inspector_skills
    });
  }

  async updateInspector({ request, response, auth }) {
    try {
      let user = await auth.getUser();

      const {
        first_name,
        last_name,
        username,
        password,
        zipcode,
        email,
        image_url
      } = request.post();
      //updates user to form data
      user.first_name = first_name;
      user.last_name = last_name;
      user.username = username;
      user.email = email;
      user.password = password;
      user.zipcode = zipcode;
      user.image_url = image_url;
      await user.save();
      response.json({
        updated_user: user
      });
    } catch (e) {
      response.send(e);
    }
  }
  async deleteInspector({ request, response, auth }) {
    try {
      let user = await auth.getUser();
      await user.delete();
      response.json({
        message: "user was deleted"
      });
    } catch (e) {
      response.send(e);
    }
  }
  async getInspectorSkills({ request, auth, response }) {
    try {
      let user = await auth.getUser();
      let inspectorId = user.inspector_id;
      let inspectorSkills = await Database.query()
        .table("inspector_skills")
        .where("inspector_id", inspectorId);
      let array = [];
      for (let i = 0; i < inspectorSkills.length; i++) {
        let skills = await Database.query()
          .table("skills")
          .where("id", inspectorSkills[i].skill_id);
        array.push(skills[0].skill);
      }
      response.send(array);
    } catch (e) {
      response.send(e);
    }
  }
  async getInspectorRating({ request, auth, response }) {
    try {
      let user = await auth.getUser();
      let inspectorId = request.input("inspector_id");
      // let inspector = await
    } catch (e) {
      console.log(e);
    }
  }

  async showInspectorProfile({ request, response, params, auth }) {
    const inspector = await Inspector.query()
      .with("user")
      .where({ id: params.id })
      .fetch();
    const allSkills = await Skill.all();

    const i_skills_pivot = await InspectorSkill.query()
      .where({ inspector_id: params.id })
      .fetch();

    const i_skills = i_skills_pivot.rows.map(is => {
      return allSkills.rows
        .map(s_id => {
          if (is.skill_id === s_id.id) {
            return s_id.skill;
          }
        })
        .filter(obj => obj);
    });

    response.json({
      inspector: inspector,
      skills: i_skills //flat arr method takes a nested array and flattens to single array, pretty neat
    });
  }
}

module.exports = InspectorController;
