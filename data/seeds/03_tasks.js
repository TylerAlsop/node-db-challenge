exports.seed = async function(knex) {
	await knex("tasks").insert([   
    { project_id: 1, name: "Sweep", description: "Use the broom.", notes: "The broom is in the laundry room.", completed: false },
    { project_id: 1, name: "Wipe down the countertops.", description: "Use the wet rag.", notes: "", completed: true },
    { project_id: 2, name: "1st floor.", description: "Empty garbages in the office and master bedroom.", notes: "", completed: true },
    { project_id: 2, name: "2nd floor.", description: "Empty garbages in the kids bedrooms and bathroom.", notes: "Careful in the bathroom. The floor is wet.", completed: false },
    { project_id: 2, name: "Replace Garbage Bags", description: "All the cans that were emptied now need new garbage bags in them.", notes: "New garbage bags are under the sink.", completed: false },
    { project_id: 3, name: "Buy Plants", description: "You need plants to be able to plant a garden.", notes: "Get plants to make salsa with.", completed: true },
    { project_id: 3, name: "Plant the Plants", description: "Put those suckers in the ground!", notes: "Be sure to space them far enough apart.", completed: false },
	])
}
