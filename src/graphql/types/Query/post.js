const Post = require('../../../models/Post')

const postResolver = async (obj, args, context) => {
  // TODO: Write a resolver which returns a post given its id.

  const post = await Post.query().findById(args.id)
  return post
}

const postsResolver = async (obj, args, context) => {
  /* TODO: Write a resolver which returns a list of all posts.
    - this list should be ordered with the most recent posts first 
  */

  const post = await Post.query().orderBy('createdAt', 'desc')
  return post
}

const resolver = {
  Query: {
    post: postResolver,
    posts: postsResolver,
  },
}

module.exports = resolver
