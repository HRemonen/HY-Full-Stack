import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer' 

const NewAnecdote = (props) => {
  const [anecdote, setAnecdote] = useState('')

  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = anecdote
    setAnecdote('')
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input
            name="anecdote"
            onChange={({ target }) => setAnecdote(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default NewAnecdote
