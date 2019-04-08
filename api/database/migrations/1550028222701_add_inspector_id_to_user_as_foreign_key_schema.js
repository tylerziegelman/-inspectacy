'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddInspectorIdToUserAsForeignKeySchema extends Schema {
  up () {
      this.alter('users', (table) => {
        table.integer('inspector_id').unsigned().references('id').inTable('inspectors')
      })
  }

  down () {
    this.alter('users', (table) =>{
      table.dropForeign('inspector_id')
    })
  }
}

module.exports = AddInspectorIdToUserAsForeignKeySchema
