'use strict'

/*
|--------------------------------------------------------------------------
| InspectorSkillSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const IS = use("App/Models/InspectorSkill")
class InspectorSkillSeeder {
  async run () {
    await IS.create({skill_id:2,inspector_id:1})
    await IS.create({skill_id:1,inspector_id:2})
    await IS.create({skill_id:3,inspector_id:1}) 
  }
}

module.exports = InspectorSkillSeeder
