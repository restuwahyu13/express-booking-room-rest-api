exports.up = async (knex) => {
	await knex.schema.createTable('bookings', (table) => {
		table.increments('booking_id').primary()
		table.string('order_id').notNullable().defaultTo(0)
		table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users').onDelete('CASCADE')
		table.integer('room_id').unsigned().notNullable().references('room_id').inTable('rooms').onDelete('CASCADE')
		table.integer('total_person').notNullable().defaultTo(0)
		table.datetime('booking_time').notNullable().defaultTo(null)
		table.string('noted').notNullable()
		table.datetime('check_in_time').defaultTo(null)
		table.datetime('check_out_time').defaultTo(null)
		table.timestamp('created_at').defaultTo(null)
		table.timestamp('updated_at').defaultTo(null)
		table.timestamp('deleted_at').defaultTo(null)
	})
}

exports.down = (knex) => knex.schema.dropTable('bookings')
