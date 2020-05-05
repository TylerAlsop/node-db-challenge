const express = require("express")
const db = require("../data/config")

const router = express.Router()

/////////////// PROJECT TASKS CRUD OPERATIONS ///////////////

/////////////// GET tasks ///////////////

router.get("/", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
	try {
        const taskData = req.body
        // const { project_id } = req.params
        // {...taskData, project_id: project_id}

        await db("tasks as t")
        .join("projects as p", "p.id", "t.project_id")
        .insert({...taskData, project_id: req.params})

        

		res.status(201).json(taskData)
	} catch(err) {
		next(err)
	}
})

/////////////// DELETE tasks ///////////////

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        await db("tasks").where({ id }).del()

    } catch (err) {
        next(err)
    }
})

module.exports = router
