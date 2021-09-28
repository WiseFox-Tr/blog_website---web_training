const lodash = require("lodash")
const postDB = require(__dirname + "/postDB.js")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

exports.updatePostsList = function(newPost) {
    console.log("post title = " + newPost.title + "\npost body = " + newPost.body)
    postsList.push(newPost)
}

/**
 * Check if title passed as param corresponds to a post title saved into postsList -> returns the specific post or null 
 * @param {*String} postName 
 * @returns {*Post}
 */
exports.getSpecificPostByName = function(postTitle) {

    let formattedPostTitle = lodash.lowerCase(postTitle)
    let specificPost = null 

    for(let post of postsList) {
        if(lodash.lowerCase(post.title) == formattedPostTitle) {
            specificPost = post
            break
        }
    }
    return specificPost
}

exports.getPostsList = async function(res) {
    try {
        const postsList = await postDB.getAllPosts()
        console.log("posts retrieved " + postsList)
        res.render("home", {
            homeStartingContent : homeStartingContent,
            postsList : postsList
        })
    } catch(e) {
        console.log(`postController : error ${e}`)
        res.render("home", {
            homeStartingContent : "Oups, nous avons rencontré un problème...",
            postsList : []
        })
    }
}
