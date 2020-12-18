exports.up = async (knex) => {
	await knex.schema.createTable('rooms', (table) => {
		table.increments('room_id').primary()
		table.string('room_name').notNullable()
		table.integer('room_capacity').notNullable().defaultTo(0)
		table.string('photo').notNullable()
		table.string('room_status').defaultTo('ready')
		table.timestamp('created_at').defaultTo(null)
		table.timestamp('updated_at').defaultTo(null)
		table.timestamp('deleted_at').defaultTo(null)
	})
}

exports.down = (knex) => knex.schema.dropTable('rooms')
