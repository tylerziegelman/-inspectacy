'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InspectorRatingSchema extends Schema {
  up () {
    this.create('inspector_ratings', (table) => {
      table.integer("inspector_id").unsigned().references("id").inTable("inspectors")
      table.integer("user_id").unsigned().references("id").inTable("users")
      table.integer("user_rating").notNullable()
      table.string("user_rating_message", 500)
      table.timestamps()
    })
  }

  down () {
    this.drop('inspector_ratings')
  }
}

module.exports = InspectorRatingSchema
