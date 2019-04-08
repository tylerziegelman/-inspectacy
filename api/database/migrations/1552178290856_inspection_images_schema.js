'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InspectionImagesSchema extends Schema {
  up () {
    this.create('inspection_images', (table) => {
      table.integer("inspection_id").unsigned().references("id").inTable("inspections")
      table.string('image_url')
      table.string('image_description')
      table.timestamps()
    })
  }

  down () {
    this.drop('inspection_images')
  }
}

module.exports = InspectionImagesSchema
