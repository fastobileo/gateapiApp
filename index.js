const express = require("express")
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const routes = require("./routes")
const routesViews = require("./routesViews")
const stringService = require("./services/StringService")

const app = express()

//view engine configuration
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

dotenv.config();

mongoose.set('strictQuery', false)
mongoose
	.connect("mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_HOST + "/?retryWrites=true&w=majority", { useNewUrlParser: true })
	.then(() => {
		app.use(express.json())
		//routes definition
		app.use("/", routesViews)
		app.use("/api", routes)
		app.listen(4090, () => {
			console.log("Server has started!")
		})
	})