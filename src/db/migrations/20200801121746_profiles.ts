import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('profiles', (table) => {
    // id
    table.increments();
    table.string('display_name').notNullable();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('team_id')
      .notNullable()
      .references('id')
      .inTable('teams')
      .onDelete('CASCADE');
    table.timestamps(true, true);

    // no duplicate display names allowed in a single team
    table.unique(['team_id', 'display_name']);
    // a user can only create one profile per team
    table.unique(['team_id', 'user_id']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('profiles');
}
