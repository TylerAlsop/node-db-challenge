const express = require("express")
const db = require("../data/config")

const router = express.Router()

/////// This file handles the route http://localhost:5555/projects  ///////


/////////////// GET ///////////////

router.get("/", async (req, res, next) => {
	try {
		res.json(await db("projects"))
	} catch(err) {
		next(err)
	}
})

/////// GET by id ///////

router.get("/:id", async (req, res, next) => {
	try {
		const project = await db("projects")
			.where("id", req.params.id)
			.first()
		
		if (!project) {
			return res.status(404).json({
				message: "Project not found",
			})
		}

		res.json(project)
	} catch(err) {
		next(err)
	}
})



router.get("/:id/animals", async (req, res, next) => {
	try {
		const animals = await db("zoos_animals as za")
			.join("zoos as z", "z.id", "za.zoo_id")
			.join("animals as a", "a.id", "za.animal_id")
			.join("species as s", "s.id", "a.species_id")
			.where("za.zoo_id", req.params.id)
			.select(
				"a.id",
				"a.name",
				"s.name as species",
				"za.from_date as arrived_on",
				"za.to_date as left_on"
			)

		res.json(animals)

	} catch(err) {
		next(err)
	}
})

module.exports = router