// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Profession from 'App/Models/Profession'

export default class ProfessionsController {
  public async list() {
    return await Profession.all()
  }
}
