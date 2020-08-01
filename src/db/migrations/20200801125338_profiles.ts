import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('profiles', (table) => {
    // id
    table.increments();
    table.string('display_name').notNullable();
    table.integer('team_id').notNullable();
    table.integer('user_id').notNullable();
    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users');
    table.foreign('team_id').references('id').inTable('teams');
    table.unique(['team_id', 'display_name']);
    table.unique(['team_id', 'user_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('profiles');
}
