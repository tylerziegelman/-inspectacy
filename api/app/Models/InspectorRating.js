'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InspectorRating extends Model {
    user() {
        return this.hasOne('App/Models/User')
    }
    inspector() {
        return this.hasOne('App/Model/Inspector')
    }
}

module.exports = InspectorRating
