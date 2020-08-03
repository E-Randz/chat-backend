import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('messages', (table) => {
    table.increments();
    table.integer('thread_id').notNullable();
    table.integer('profile_id').notNullable();
    table.text('text');
    // for emoji code, profile_id and emoji reaction count
    table.json('reactions');
    table.timestamps(true, true);

    table
      .foreign('thread_id')
      .references('id')
      .inTable('threads')
      .onDelete('CASCADE');
    table
      .foreign('profile_id')
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('messages');
}
