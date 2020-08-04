import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('channels', (table) => {
    table.increments();
    table.string('name').unique().notNullable();
    table
      .integer('team_id')
      .notNullable()
      .references('id')
      .inTable('teams')
      .onDelete('CASCADE');
    table
      .integer('profile_id')
      .notNullable()
      .references('id')
      .inTable('profiles')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('channels');
}
