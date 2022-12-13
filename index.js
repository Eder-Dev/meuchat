// Import's
const express = require('express')
const cors = require('cors')
const routes = require('./routes')

//Initialize express
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

//Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port localhost:${PORT}`));