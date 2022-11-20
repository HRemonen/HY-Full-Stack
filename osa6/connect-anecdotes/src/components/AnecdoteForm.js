import { useState } from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const [anecdote, setAnecdote] = useState('')

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = anecdote

    setAnecdote('')
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    
    props.newNotification(`new anecdote '${content}' created`)
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

const mapDispatchToProps = (dispatch) => {
  return {
    newNotification: (message, time) => dispatch(newNotification(message, time)),
    createAnecdote: (anecdote) => dispatch(createAnecdote(anecdote))
  }
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
