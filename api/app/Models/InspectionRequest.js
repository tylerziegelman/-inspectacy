'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class InspectionRequest extends Model {
    inspector_request(){
        return this.belongsTo("App/Model/Inspector")
    }
}

module.exports = InspectionRequest
