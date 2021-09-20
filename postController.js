const lodash = require("lodash")

const postsList = []

exports.updatePostsList = function(newPost) {
    console.log("post title = " + newPost.postTitle + "\npost body = " + newPost.postBody)
    postsList.push(newPost)
}

/**
 * Check if title passed as param corresponds to a post title saved into postsList -> returns the specific post or null 
 * @param {*String} postName 
 * @returns {*Post}
 */
exports.getSpecificPostByName = function(postName) {

    let formattedPostName = lodash.lowerCase(postName)
    let specificPost = null 

    for(let post of postsList) {
        if(lodash.lowerCase(post.postTitle) == formattedPostName) {
            specificPost = post
            break
        }
    }
    return specificPost
}

exports.getPostsList = function() {
    return postsList
}
