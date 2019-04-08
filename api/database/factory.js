'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')


Factory.blueprint('App/Models/Inspector', (faker) => {
  return {
    
  }
})
Factory.blueprint('App/Models/Skill', (faker) => {
  return {
    skill: faker.word()
  }
})
Factory.blueprint('App/Models/InspectorSkill', (faker,data) => {
  return {
    inspector_id: data.inspector_id,
    skill_id: data.skill,
    skill: data.skill
  }
})

Factory.blueprint('App/Models/User', (faker,data) => {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    username: data.username,
    email: data.email,
    password: data.password,
    image_url: data.image_url,
    zipcode: data.zipcode,
    inspector_id: data.inspector_id
  }
})


Factory.blueprint('App/Models/Message', (data) => {
  return {
    inspector_id: data.inspector_id,
    message: data.message,
    user_id: data.user_id
  }
})