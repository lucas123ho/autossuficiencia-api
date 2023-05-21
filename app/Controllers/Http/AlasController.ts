import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Ala from 'App/Models/Ala'

const newAlaSchema = schema.create({
  name: schema.string(),
})

export default class AlasController {
  public async create({ request }: HttpContextContract) {
    await request.validate({ schema: newAlaSchema })

    const body = request.body()

    const createdAla = await Ala.create(body)

    return createdAla
  }

  public async list() {
    return await Ala.all()
  }

  public async delete({ request }: HttpContextContract) {
    const { id } = request.params()

    const ala = await Ala.findOrFail(id)

    return await ala.delete()
  }
}
