import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('team', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table.integer('created_by').notNullable();
    table.timestamps(true, true);

    table.foreign('created_by').references('id').inTable('user');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('team');
}
