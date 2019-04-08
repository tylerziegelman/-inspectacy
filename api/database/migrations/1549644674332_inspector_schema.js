'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InspectorSchema extends Schema {
  up () {
    this.create('inspectors', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('inspectors')
  }
}

module.exports = InspectorSchema
