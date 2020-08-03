import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('teams', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table.integer('created_by').notNullable();
    table.timestamps(true, true);

    // ** no cascade if deleting a user, user will first have to either transfer ownership of team or delete team
    table
      .foreign('created_by')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('teams');
}
