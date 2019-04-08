'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')


class Inspector extends Model {
    static boot() {
        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (inspectorInstance) => {
            if (inspectorInstance.dirty.password) {
                inspectorInstance.password = await Hash.make(inspectorInstance.password)
            }
        })
        //   tokens () {
        //     return this.hasMany('App/Models/Token')
        //   }
    }
    user () {
        return this.hasOne('App/Models/User')
      }
    //   skills(){
    //       return this.hasMany('App/Model/Skill').pivotTable('inspector_skills')
    //   }
      skills(){
        return this
        .belongsToMany('App/Models/Skill')
        .pivotTable("inspector_skills")
    }
      messages(){
          return this.hasMany('App/Model/Message')
      }
      inspection(){
          return this.hasMany("App/Model/Inspection")
      }
      inspection_request(){
        return this.hasMany("App/Model/InspectionRequest")
    }
}

module.exports = Inspector
