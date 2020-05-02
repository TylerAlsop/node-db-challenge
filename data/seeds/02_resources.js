exports.seed = async function(knex) {
	await knex("resources").insert([   
    { name: "Broom", description: "Long stick with bristles on one end." },
    { name: "Bucket", description: "" },
    { name: "Wet Rag", description: "It is a rag that is wet." },
    { name: "Vaccum", description: "It really sucks." },
	])
}
