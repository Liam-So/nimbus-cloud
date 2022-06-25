const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

const userRoutes = require('./routes/userRoutes')

// user routes
app.use('/users', userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})