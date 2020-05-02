exports.seed = async function(knex) {
	await knex("projects").insert([   
		{ name: "Clean The Kitchen", description: "The kitchen needs to be clean before guests arrive.", completed: false },
    { name: "Empty The Garbage Cans", description: "All the garbage cans in the house need to be emptied.", completed: true },
    { name: "Plant The Garden", description: "", completed: false },
	])
}
