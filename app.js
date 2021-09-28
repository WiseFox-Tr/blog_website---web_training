
const express = require("express")
const ejs = require("ejs")
const postController = require(__dirname + "/controllers/postController.js")
const contentController = require(__dirname + "/controllers/contentController.js")
const port = 3000

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')


app.get("/", function(req, res){
  postController.getPostsList(res)
})

app.get("/about", function(req, res){
  contentController.renderAboutPage(res)
})

app.get("/contact", function(req, res){
  contentController.renderContactPage(res)
})

app.get("/compose", function(req, res){
  res.render("compose")
})

app.post("/compose", function(req, res){
  console.log("post request on url '/compose'")
  postController.addNewPost(req.body.title, req.body.body, res)
})

app.get("/posts/:title", function(req, res) {
  console.log(`post request on url '/posts/${req.params.title}'`)
  postController.getPostByTitle(req.params.title, res)
})

app.listen(port, function() {
  console.log(`Server started on port ${port}`)
})
