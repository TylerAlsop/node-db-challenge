const express = require("express")
const helmet = require("helmet")
const projectsRouter = require("./routers/projectsRouter")
const resourcesRouter = require("./routers/resourcesRouter")

const server = express()
const port = process.env.PORT || 5555

server.use(helmet())
server.use(express.json())

server.use("/projects", projectsRouter)
server.use("/resources", resourcesRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Oh no. Something went wrong.",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})
