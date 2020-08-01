import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    // id
    table.increments();
    table.string('email').unique().notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user');
}
