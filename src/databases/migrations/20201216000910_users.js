exports.up = async (knex) => {
	await knex.schema.createTable('users', (table) => {
		table.increments('user_id').primary()
		table.string('email').unique().notNullable()
		table.string('password').notNullable()
		table.string('photo').notNullable()
		table.string('role').notNullable().defaultTo('users')
		table.boolean('active').notNullable().defaultTo(false)
		table.timestamp('created_at').defaultTo(null)
		table.timestamp('updated_at').defaultTo(null)
		table.timestamp('deleted_at').defaultTo(null)
	})
}

exports.down = (knex) => knex.schema.dropTable('users')
