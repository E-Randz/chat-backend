import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('channel', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table.integer('team_id').notNullable();
    table.integer('created_by').notNullable();
    table.timestamps(true, true);

    table.foreign('team_id').references('id').inTable('team');
    table.foreign('created_by').references('id').inTable('user');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('channel');
}
