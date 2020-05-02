exports.up = async function(knex) {

    /////////////// projects ///////////////
    
        await knex.schema.createTable("projects", (table) => {
            table.increments("id")
            table.text("name").notNullable()
            table.text("description").nullable()
            table.boolean("completed").defaultTo(false)
        })
    
    /////////////// tasks ///////////////
    
        await knex.schema.createTable("tasks", (table) => {
            table.increments("id")
            table.text("name").notNullable()
            table.text("description").notNullable()
            table.text("notes").nullable()
            table.boolean("completed").defaultTo(false)
        })
    
    /////////////// resources ///////////////
    
        await knex.schema.createTable("resources", (table) => {
            table.increments("id")
            table.text("name").notNullable()
            table.text("description").nullable()

        })
    
    /////////////// projects_resources ///////////////
    
        await knex.schema.createTable("projects_resources", (table) => {
            table.integer("project_id")
                .references("id")
                .inTable("projects")
                .onDelete("CASCADE")
                .onUpdate("CASCADE")
    
            table.integer("resource_id")
                .references("id")
                .inTable("resources")
                .onDelete("CASCADE")
    
            table.primary(["project_id", "resource_id"])
        })
    
    
    };
    
    exports.down = async function(knex) {
        await knex.schema.dropTableIfExists("projects_resources")
        await knex.schema.dropTableIfExists("resources")
        await knex.schema.dropTableIfExists("tasks")
        await knex.schema.dropTableIfExists("projects")
    };
    