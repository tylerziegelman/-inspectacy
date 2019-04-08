'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InspectorSkillsSchema extends Schema {
  up () {
    this.create('inspector_skills', (table) => {
      table.increments()
      table.integer("inspector_id").unsigned().references("id").inTable("inspectors")
      table.integer("skill_id").unsigned().references("id").inTable("skills")
      table.timestamps()
    })
  }

  down () {
    this.drop('inspector_skills')
  }
}

module.exports = InspectorSkillsSchema
