const lodash = require("lodash")
const postDB = require("../models/postDB.js")


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

exports.getPostsList = async function(res) {
    try {
        const postsList = await postDB.getAllPosts()
        res.render("home", {
            homeStartingContent : homeStartingContent,
            postsList : postsList
        })
    } catch(e) {
        console.log(`unable to retrieve posts list from db : \n${e}`)
        res.render("home", {
            homeStartingContent : "Oups, nous avons rencontré un problème...",
            postsList : []
        })
    }
}

exports.addNewPost = async function(title, body, res) {
    try {
        await postDB.saveAPost(title, body)
    } catch(e) {
        console.log(`unable to save new post into db : \n${e}`)
    }
    res.redirect("/")
}

/**
 * try to find a specific post with title equals to title passed as param, if succeed render post ejs with post's data 
 * @param {*String} title @param {*any} res
 */
 exports.getPostByTitle = async function(title, res) {
    let formattedTitle = lodash.lowerCase(title)
    formattedTitle = lodash.upperFirst(formattedTitle)
    try {
        specificPost = await postDB.getAPostByTitle(formattedTitle)
        res.render("post", {
            postTitle: specificPost.title,
            postBody: specificPost.body
          })
    } catch(e) {
        console.log(`unable to retrive specific post by title from db : \n${e}`)
        res.redirect("/")
    }
}
