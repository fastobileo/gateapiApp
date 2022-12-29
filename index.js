const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const routes = require("./routes")
const stringService = require("./services/StringService")


const app = express()

dotenv.config();
mongoose
	.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.json())
		app.use("/api", routes)


		app.listen(4090, () => {
			console.log("Server has started!")
		})
	})

	//stringService.jsonToArray({"test": "yes","teste2":"ok"})