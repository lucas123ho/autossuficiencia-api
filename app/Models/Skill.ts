import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, beforeSave, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'
import Formatter from 'Utils/Formatter'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => Member, {
    pivotTable: 'profession_members',
  })
  public members: ManyToMany<typeof Member>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static normilizeName(skill: Skill) {
    if (skill.$dirty.name) {
      skill.name = Formatter.normalizeText(skill.name).toLocaleLowerCase()
    }
  }
}
