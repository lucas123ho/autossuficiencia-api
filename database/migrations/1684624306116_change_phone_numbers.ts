import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'members'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('phoneNumber', 'phone_number')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn('phone_number', 'phoneNumber')
    })
  }
}
