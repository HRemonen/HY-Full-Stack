const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  response.json(updatedBlog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.user) || await User.findOne()

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'Blog post mandatory info missing!'
    })
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author || undefined,
    user: user.id,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter