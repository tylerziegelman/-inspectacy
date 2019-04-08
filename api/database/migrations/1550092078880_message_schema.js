'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  // up() {
  //   this.create('messages', (table) => {
  //     table.increments()
  //     table.string('message', 255)
  //     table.timestamps()
  //   })
  // }

  // down() {
  //   this.drop('messages')
  // }
  up() {
    this.create('messages', (table) => {
      table.increments()
      table.string('message')
      table.timestamps()
    })
  }

  down() {
    this.drop('messages')
  }

}

module.exports = MessageSchema
