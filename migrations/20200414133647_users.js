exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.uuid('id').notNullable().primary()
        table.string('displayName', 100)
        table.string('username', 30)
        table.string('email', 100)
        table.text('password')
        table.boolean('isAdmin')
        table.string('createdOn', 13)
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('users')
}
