'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddForeignKeysToMessageSchema extends Schema {
  up () {
    this.alter('messages', (table) => {
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('inspector_id').unsigned().references('id').inTable('inspectors')
    })
  }

  down () {
    this.alter('messages', (table) => {
      table.dropForeign('user_id')
      table.dropForeign('inspector_id')
    })
    
  }
}

module.exports = AddForeignKeysToMessageSchema
