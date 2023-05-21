// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Skill from 'App/Models/Skill'

export default class SkillsController {
  public async list() {
    return await Skill.all()
  }
}
