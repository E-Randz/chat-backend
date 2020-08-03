import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('threads', (table) => {
    // id
    table.increments();
    table.string('name');
    table
      .integer('channel_id')
      .notNullable()
      .references('id')
      .inTable('channels')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('threads');
}
