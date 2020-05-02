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

/////////////// POST ///////////////

router.post("/", async (req, res, next) => {
	try {
		const projectData = req.body
		await db("projects").insert(projectData)

		res.status(201).json(projectData)
	} catch(err) {
		next(err)
	}
})




/////////////// PROJECT TASKS CRUD OPERATIONS ///////////////


router.get("/:id/tasks", async (req, res, next) => {
	try {
		const tasks = await db("projects as p")
			.join("tasks as t", "t.id", "p.id")
			.where("p.id", req.params.id)
			.select(
                "p.name as project_name",
                "p.description as project_description",
				"t.id as task_id",
				"t.name as task_name",
				"t.description as task_description",
                "t.notes as task_notes",
                "t.completed as task_completed"
			)

		res.json(tasks)

	} catch(err) {
		next(err)
	}
})

module.exports = router