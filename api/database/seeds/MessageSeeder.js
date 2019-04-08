'use strict'

/*
|--------------------------------------------------------------------------
| MessageSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const MESSAGE = use('App/Models/Message')
class MessageSeeder {
  async run () {
    // await MESSAGE.create({inspector_id:3, message: "hello my dude",user_id: 1})
    // await MESSAGE.create({inspector_id:3, message: "hello my other dude",user_id: 1})
    // await MESSAGE.create({inspector_id:3, message: "hello my other dude",user_id: 1})
    // await MESSAGE.create({inspector_id:3, message: "hello my other dude",user_id: 1})
  }
}

module.exports = MessageSeeder
