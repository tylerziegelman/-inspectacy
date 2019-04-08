'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Skill extends Model {
    inspectors(){
        return this
        .belongsToMany('App/Models/Inspector')
        .pivotTable("inspector_skills")
    }

    
}

module.exports = Skill
