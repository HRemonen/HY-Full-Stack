const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

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

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user

  const blogToUpdate = await Blog.findById(request.params.id)

  if (user.id.toString() === blogToUpdate.user.toString()) {
    const blog = {
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

    return response.status(204).json(updatedBlog)
  }
  
  return response.status(401).json({error: 'unauthorized action'})
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  const blogToDelete = await Blog.findById(request.params.id)

  if (user.id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    return response.status(204).end()
  }
  
  return response.status(401).json({error: 'unauthorized action'})
})

module.exports = blogsRouter