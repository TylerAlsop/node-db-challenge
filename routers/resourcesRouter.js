const express = require("express")
const db = require("../data/config")

const router = express.Router()

/////// This file handles the route http://localhost:5555/resources  ///////


/////////////// GET ///////////////

router.get("/", async (req, res, next) => {
	try {
		res.json(await db("resources"))
	} catch(err) {
		next(err)
	}
})

/////// GET by id ///////

router.get("/:id", async (req, res, next) => {
	try {
		const resource = await db("resources")
			.where("id", req.params.id)
			.first()
		
		if (!resource) {
			return res.status(404).json({
				message: "Resource not found.",
			})
		}

		res.json(resource)
	} catch(err) {
		next(err)
	}
})

/////////////// POST ///////////////

router.post("/", async (req, res, next) => {
	try {
		const resourceData = req.body
		await db("resources").insert(resourceData)

		res.status(201).json(resourceData)
	} catch(err) {
		next(err)
	}
})


module.exports = router