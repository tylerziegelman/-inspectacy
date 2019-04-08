'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
    inspector(){
        this.belongsTo('App/Model/Inspector')
    }
    // user(){
    //     this.belongsTo('App/Model/User')
    // }
    user() {
        return this.belongsTo('App/Models/User');
    }
}

module.exports = Message
