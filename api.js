const express = require("express")

const app = express()
app.use(express.json())



app.get("/", (req, res) => {
  console.log("request received: ", req.query)
  res.send("index")
  })

app.get("/test/", (req, res) => {
console.log("/test/ triggered")
console.log("request received: ", req.query)
res.send(req.query)
})

app.listen(3002)