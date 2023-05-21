import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  ManyToMany,
  belongsTo,
  column,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Ala from './Ala'
import Profession from './Profession'
import Skill from './Skill'

export default class Member extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public phoneNumber: string

  @column()
  public alaId: number

  @belongsTo(() => Ala)
  public ala: BelongsTo<typeof Ala>

  @manyToMany(() => Profession, {
    pivotTable: 'profession_members',
  })
  public professions: ManyToMany<typeof Profession>

  @manyToMany(() => Skill, {
    pivotTable: 'skill_members',
  })
  public skills: ManyToMany<typeof Skill>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
