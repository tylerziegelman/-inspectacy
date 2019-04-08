'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const USER = use('App/Models/User')
class UserSeeder {
  async run () {
  //   await USER.create({
  //     first_name: 'mandude',
  //     last_name: 'person',
  //     username: '1133HELP',
  //     email: 'jjj@jjj.com',
  //     password: '123456',
  //     image_url: 'https://static.fjcdn.com/pictures/Mandude+lel_7fed2f_4536617.png',
  //     zipcode: 12345,
  //     inspector_id: 2
  //   })

  //   await USER.create({
  //     first_name: 'dude',
  //     last_name: 'pers0n',
  //     username: '1133',
  //     email: 'jjj@jjjo.com',
  //     password: '125456',
  //     image_url: 'https://boygeniusreport.files.wordpress.com/2014/02/dell-dude-1.jpg?quality=98&strip=all',
  //     zipcode: 12375,
  //     inspector_id: 3
  //   });

  //   await USER.create({
  //     first_name: 'doode',
  //     last_name: 'per',
  //     username: '113ww3',
  //     email: 'jjj@jjjwo.com',
  //     password: '1254w56',
  //     image_url: 'http://www.doodes.co.uk/wp-content/uploads/2013/08/136-cheery-doode-1000.png',
  //     zipcode: 12775,
  //     inspector_id: 1
  //   });
   }
}

module.exports = UserSeeder
