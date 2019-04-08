'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InspectionRequestSchema extends Schema {
  up () {
    this.create('inspection_requests', (table) => {
      table.increments()
      table.integer("inspector_id").unsigned().references("id").inTable("inspectors")
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.string('item')
      table.string('item_url')
      table.boolean('approved')
      table.timestamps()
    })
  }

  down () {
    this.drop('inspection_requests')
  }
}

module.exports = InspectionRequestSchema
