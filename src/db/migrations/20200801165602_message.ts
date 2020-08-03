import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('messages', (table) => {
    table.increments();
    table
      .integer('thread_id')
      .notNullable()
      .references('id')
      .inTable('threads')
      .onDelete('CASCADE');
    table
      .integer('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE');
    table.text('text');
    // for emoji code, profile_id and emoji reaction count
    table.json('reactions');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('messages');
}
