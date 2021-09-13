const postsList = []

exports.updatePostsList = function(newPost) {
    console.log("post title = " + newPost.postTitle + "\npost body = " + newPost.postBody)
    postsList.push(newPost)
}

exports.getPostsList = function() {
    return postsList
}
