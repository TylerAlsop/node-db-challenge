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

// router.get("/", async (req, res, next) => {
// 	try {
//         const projects = await db("projects_resources as pr")
//         .join("projects as p", "p.id", "pr.project_id")
//         .join("resources as r", "r.id", "pr.resources_id")
//         .select(
//             "p.*",
//             "r.*"
//         )

//         res.json(projects)
        
// 	} catch(err) {
// 		next(err)
// 	}
// })

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

/////////////// GET tasks ///////////////

router.get("/:id/tasks", async (req, res, next) => {
	try {
        const { id } = req.params
		const tasks = await db("projects as p")
			.join("tasks as t", "p.id", "t.project_id")
			.where("project_id", id)
			.select(
                "p.name as project_name",
                "p.description as project_description",
				"t.id as task_id",
				"t.name as task_name",
				"t.description as task_description",
                "t.notes as task_notes",
                "t.completed as task_completed"
            )
            .orderBy("t.id")

		res.json(tasks)

	} catch(err) {
		next(err)
	}
})


/////////////// POST tasks ///////////////

router.post("/:id/tasks", async (req, res, next) => {
	try {
        const taskData = req.body

        await db("tasks as t")
        .join("projects as p", "p.id", "t.project_id")
        .insert({...taskData, project_id: req.params.id})

        

		res.status(201).json(taskData)
	} catch(err) {
		next(err)
	}
})

/////////////// DELETE tasks ///////////////

router.delete("/:id/tasks/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        await db ("tasks").where({ id }).del()
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})


module.exports = router