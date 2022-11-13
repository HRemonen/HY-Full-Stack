import { useDispatch, useSelector } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'
import { newNotification, clearNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      <p>
        {anecdote.content} <br />
        has {anecdote.votes} votes.
        <button onClick={
          handleClick}>
          vote
        </button>
      </p>
    </li>
  )
}

const Anecdotes = () => {
  const anecdotes = useSelector(state => {
    if (state.filter) {
      return state.anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      })
    }
    return state.anecdotes
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnectode(anecdote.id))
  
    dispatch(newNotification(`you voted for '${anecdote.content}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  const sortByVotes = (anecdotes) => {
    return [...anecdotes].sort((a, b) => b.votes - a.votes)
  }

  return (
    <ul>
      {sortByVotes(anecdotes).map(anecdote =>
       <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote)}
      />
    )}
    </ul>
  )
  
}

export default Anecdotes