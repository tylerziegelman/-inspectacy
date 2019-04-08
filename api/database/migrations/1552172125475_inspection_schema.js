'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InspectionSchema extends Schema {
  up () {
    this.create('inspections', (table) => {
      table.increments()
      table.integer("inspector_id").unsigned().references("id").inTable("inspectors")
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.text('description')
      table.boolean("inspection_completed")
      table.timestamps()
    })
  }

  down () {
    this.drop('inspections')
  }
}

module.exports = InspectionSchema


 