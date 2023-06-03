const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const fs = require("fs")
const { Database } = require("./database")
const path = require("path")

const app = express()

const db = new Database()

// Enable CORS
app.use(cors())

// Parse URL-encoded request bodies (canvas image)

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

// Parse JSON request bodies
app.use(bodyParser.json({ limit: "10mb" }))

// Endpoint to get JSON
app.post("/api/sendJSON", (req, res) => {
	const { data } = req.body
	console.log("Received JSON data: ", data.modelData)

	saveImage(data.phone, data.image)

	db.addOrder(
		data.phone,
		data.image,
		data.modelData.width,
		data.modelData.width,
		data.modelData.price,
		data.modelData.elements
	)
	getOrders()

	res.sendStatus(200)
})

async function getOrders() {
	try {
		const rows = await db.select("*", "ITEMS")
		console.log(rows)
		return rows
	} catch (error) {
		console.error(error)
	}
}
function saveImage(phone, dataUrl) {
	// get the data URL string from canvas.toDataURL()

	const imageData = dataUrl.split(",")[1]
	const buffer = Buffer.from(imageData, "base64")
	let date = Date.now()
	const imagePath = `${phone}/${date}.png`

	if (!fs.existsSync(phone)) {
		fs.mkdirSync(`${phone}`, (err) => {
			if (err) throw err
		})
	}
	writeFile()

	function writeFile() {
		fs.writeFileSync(imagePath, buffer, (err) => {
			if (err) throw err
			console.log(`
                The image for phone number: ${phone} was saved
                Image path: ${imagePath}
                `)
		})
	}
	return imagePath
}

app.use(express.static(path.join(__dirname + "/dashboard")))

app.get("/api/", async (req, res) => {
	console.log("request from /")
	res.json(await getOrders())
})
// app.get('', async (req, res)=>{
//   console.log('request from /')
//   res.json(await getOrders())
// })

// Start the server
const port = 5501
app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
