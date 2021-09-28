const mongoose = require("mongoose")
const dbPort = "27017"
const dbName = "blogPostDB"
const dbURL = `mongodb://localhost:${dbPort}/${dbName}`
mongoose.connect(dbURL)

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "A title must be provided"]
    },
    body: {
        type: String,
        required: [true, "A body message must be provided"]
    }
})

const PostModel = mongoose.model("Post", postSchema)

exports.getAllPosts = function() {
    return PostModel.find().exec()
}

exports.saveAPost = function(title, body) {
    PostModel({
        title: title,
        body: body
    }).save()
}
