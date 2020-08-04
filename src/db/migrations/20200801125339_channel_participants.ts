import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('channel_participants', (table) => {
    table
      .integer('channel_id')
      .notNullable()
      .references('id')
      .inTable('channels')
      .onDelete('CASCADE');
    table
      .integer('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE');

    // no duplicate participants in channels
    table.unique(['channel_id', 'profile_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('channel_participants');
}
