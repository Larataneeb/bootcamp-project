const User = require('../../models/User')
const Post = require('../../models/Post')

const createPost = async (obj, { content }, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const post = await user.$relatedQuery('posts').insert({ content })

  if (!post) {
    throw new Error('Could not add post')
  }

  return {
    post,
  }
}

const editPost = async (obj, args, context) => {
  const { id, newContent } = args
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }
  // TODO - finish this function which edits a post given its id and new content.
  // .patch()
  const editedPost = await Post.query()
    .patch({ content: newContent })
    .where('id', id)
    .andWhere('userId', context.user.id)
  // Post.$relatedQuery('posts')
  return editedPost
}

const resolver = { Mutation: { createPost, editPost } }

module.exports = resolver
