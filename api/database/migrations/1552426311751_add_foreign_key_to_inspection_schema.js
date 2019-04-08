'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddForeignKeyToInspectionSchema extends Schema {
  up () {
    this.alter('inspections', (table) => {
      table.integer("request_id").unsigned().references("id").inTable("inspection_requests")
    })
  }

  down () {
    this.alter('inspections', (table) =>{
      table.dropForeign('request_id')
    })
    }
}

module.exports = AddForeignKeyToInspectionSchema
