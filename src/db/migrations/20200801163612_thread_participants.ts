import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('thread_participants', (table) => {
    // id
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

    // no duplicate participants in threads
    table.unique(['thread_id', 'profile_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('thread_participants');
}
