const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {url: 1, title: 1, author: 1})

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const validateDefinitionAndLength = (input, type) => {
    if (!input || input === undefined) {
      return response.status(400).json({error: [type] + ' must be given and of allowed type!'})
    }
    else if (input.length < 3) {
      return response.status(400).json({error: [type] + ' must be atleast 3 characters long!'})
    }
    return true
  }

  const existingUser = await User.findOne({username})

  if (existingUser) {
    return response.status(400).json({error: 'username is already taken by another user'})
  }

  const isValidUsername = await validateDefinitionAndLength(username, "username")
  const isValidPassword = await validateDefinitionAndLength(password, "password")

  if (isValidUsername && isValidPassword) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  }
  
})

module.exports = usersRouter