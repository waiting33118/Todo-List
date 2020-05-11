const express = require('express')
const exphdbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.engine('handlebars', exphdbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.render('home')
})

app.listen(port, () => {
	console.log(`The Server is running on http://localhost:${port}`)
})
