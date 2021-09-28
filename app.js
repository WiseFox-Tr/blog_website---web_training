
const express = require("express")
const ejs = require("ejs")
const postController = require(__dirname + "/postController.js")
const contentController = require(__dirname + "/contentController.js")
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
  const post = {
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
  }
  postController.updatePostsList(post)
  res.redirect("/")
})

app.get("/posts/:postName", function(req, res) {
  const postName = req.params.postName
  console.log("post name = " + postName)

  const specificPost = postController.getSpecificPostByName(postName)
  if(specificPost != null) {
    res.render("post", {
      postName: specificPost.postTitle,
      postContent: specificPost.postBody
    })
  } else {
    res.redirect("/")
  }
})

app.listen(port, function() {
  console.log(`Server started on port ${port}`)
})
