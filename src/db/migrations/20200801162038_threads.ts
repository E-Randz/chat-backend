import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('threads', (table) => {
    // id
    table.increments();
    table.string('name');
    table.integer('channel_id').notNullable();
    table.timestamps(true, true);

    table.foreign('channel_id').references('id').inTable('channels');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('profiles');
}
