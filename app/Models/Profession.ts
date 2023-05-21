import { DateTime } from 'luxon'
import { BaseModel, ManyToMany, beforeSave, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Member from './Member'
import Formatter from 'Utils/Formatter'

export default class Profession extends BaseModel {
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
  public static normilizeName(profession: Profession) {
    if (profession.$dirty.name) {
      profession.name = Formatter.normalizeText(profession.name).toLocaleLowerCase()
    }
  }
}
