const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('GET method tests', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await helper.blogsInDb()
  
    expect(response).toHaveLength(helper.initialBlogs.length)
  })
  
  test('a specific blog is within the returned blogs', async () => {
    const response = await helper.blogsInDb()
  
    const titles = response.map(o => o.title)
  
    expect(titles).toContain('Canonical string reduction')
  })

  test('blog id is in correct form', async () => {
    const response = await helper.blogsInDb()

    const allIds = response.map(blog => blog.id)
    allIds.map(id => expect(id).toBeDefined())
  })
})

describe('POST method tests', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Post Test',
      author: 'Post Test',
      url: 'https://post-test.com/',
      likes: 99,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-type', /application\/json/)
  
    const response = await helper.blogsInDb()
  
    const titles = response.map(o => o.title)
  
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })
  
  test('blog posted without likes is given the default value', async () => {
    const newBlog = {
      title: 'Post Test',
      author: 'Post Test',
      url: 'https://post-test.com/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length + 1)
    expect(response[response.length - 1].likes).toBe(0)
  })

  test('invalid blog without title cannot be added', async () => {
    const newBlog = {
      url: 'https://post-test.com/',
      likes: 99,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await helper.blogsInDb()
  
    expect(response).toHaveLength(helper.initialBlogs.length)
  })

  test('invalid blog without url cannot be added', async () => {
    const newBlog = {
      title: 'Post Test',
      likes: 99,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const response = await helper.blogsInDb()
  
    expect(response).toHaveLength(helper.initialBlogs.length)
  })
})

describe('DELETE method tests', () => {
  test('raise 404 when no id is given, no blogs are deleted', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()

    await api
      .delete('/api/blogs/')
      .expect(404)

    const blogsAfterDeletion = await helper.blogsInDb()

    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length)
  })

  test('raise 400 when id not found, no blogs are deleted', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()
    const id = "635540269a794217ed1"

    await api
      .delete(`/api/blogs/${id}`)
      .expect(400)

    const blogsAfterDeletion = await helper.blogsInDb()

    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length)
  })

  test('succeeds with status code 204 if valid id was given', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDeletion[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
      
    const blogsAfterDeletion = await helper.blogsInDb()

    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)

    const blogTitles = blogsAfterDeletion.map(o => o.title)

    expect(blogTitles).not.toContain(blogToDelete.title)
  })
})

describe('PUT method tests', () => {
  test('raise 404 when no id is given, no blogs are updated', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()

    await api
      .put('/api/blogs/')
      .expect(404)

    const blogsAfterDeletion = await helper.blogsInDb()

    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length)
  })

  test('raise 400 when id not found, no blogs are updated', async () => {
    const blogsBeforeDeletion = await helper.blogsInDb()
    const id = "635540269a794217ed1"

    await api
      .put(`/api/blogs/${id}`)
      .expect(400)

    const blogsAfterDeletion = await helper.blogsInDb()

    expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length)
  })

  test('succeeds with status code 200 if valid id was given', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]
    blogToUpdate.likes = 9999

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-type', /application\/json/)
      
    const blogsAfterUpdate= await helper.blogsInDb()

    expect(blogsAfterUpdate).toHaveLength(blogsBeforeUpdate.length)

    const blogTitles = blogsAfterUpdate.map(o => o.title)

    expect(blogTitles).toContain(blogToUpdate.title)

    expect(blogToUpdate.likes).toEqual(9999)
  })
  
})
afterAll(() => {
  mongoose.connection.close()
})