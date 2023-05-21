import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Member from 'App/Models/Member'
import Profession from 'App/Models/Profession'
import Skill from 'App/Models/Skill'
import Formatter from 'Utils/Formatter'

const newMemberSchema = schema.create({
  name: schema.string(),
  phone_number: schema.string(),
  ala_id: schema.number(),
  professions: schema.array().members(schema.string()),
  skills: schema.array().members(schema.string()),
})

function getOnlyId(array: { id: number }[]): number[] {
  return array.map(({ id }) => id)
}

export default class MembersController {
  public async create({ request }: HttpContextContract) {
    await request.validate({ schema: newMemberSchema })

    const body = request.body()

    const member = new Member()

    member.fill({
      alaId: body.ala_id,
      name: body.name,
      phoneNumber: body.phone_number,
    })

    await member.save()

    const normalizedSkills = (body.skills as string[]).map((skill) =>
      Formatter.normalizeText(skill).toLocaleLowerCase()
    )
    const normalizedProfessions = (body.professions as string[]).map((profession) =>
      Formatter.normalizeText(profession).toLocaleLowerCase()
    )

    const skillsFromDB = await Skill.query().whereIn('name', normalizedSkills)
    const skillsFromDBNames = skillsFromDB.map((skill) => skill.name)

    const professionsFromDB = await Profession.query().whereIn('name', normalizedProfessions)
    const professionsFromDBNames = professionsFromDB.map((profession) => profession.name)

    const skillsToCreate = normalizedSkills.filter((skill) => !skillsFromDBNames.includes(skill))
    const professionsToCreate = normalizedProfessions.filter(
      (profession) => !professionsFromDBNames.includes(profession)
    )

    const createdSkills = await Promise.all(
      skillsToCreate.map((skill) => Skill.create({ name: skill }))
    )
    const createdProfessions = await Promise.all(
      professionsToCreate.map((profession) => Profession.create({ name: profession }))
    )

    member.related('skills').attach([...getOnlyId(createdSkills), ...getOnlyId(skillsFromDB)])
    member
      .related('professions')
      .attach([...getOnlyId(createdProfessions), ...getOnlyId(professionsFromDB)])

    return member
  }

  public async list() {
    return await Member.query().preload('ala').preload('professions').preload('skills')
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.params()

    const member = await Member.findOrFail(id)

    await member.related('professions').detach()
    await member.related('skills').detach()

    return await member.delete()
  }
}
