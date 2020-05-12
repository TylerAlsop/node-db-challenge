exports.seed = async function(knex) {
	await knex("resources").insert([   
    { name: "Broom", description: "Long stick with bristles on one end." },
    { name: "Bucket", description: "" },
    { name: "Wet Rag", description: "It is a rag that is wet." },
    { name: "Vaccum", description: "It really sucks." },
    { name: "Garbage Bags", description: "Bags for garbage." },
    { name: "Shovel", description: "It's for diggin." },
    { name: "Dirt", description: "It's for planting." },
    { name: "Watering Can", description: "To water things with." },

	])
}
