'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Inspection extends Model {
    inspector(){
        return this.belongsTo("App/Model/Inspector")
    }
    inspectorImage(){
        return this.hasMany("App/Model/InspectionImage")
    }
}

module.exports = Inspection
