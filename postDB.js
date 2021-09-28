const mongoose = require("mongoose")
const dbPort = "27017"
const dbName = "blogPostDB"

mongoose.connect(`mongodb://localhost:${dbPort}/${dbName}`)

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
