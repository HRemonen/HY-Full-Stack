import { useDispatch, useSelector } from 'react-redux'
import { voteAnectode } from '../reducers/anecdoteReducer'

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
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <ul>
      {anecdotes.map(anecdote =>
       <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => 
          dispatch(voteAnectode(anecdote.id))
        }
      />
    )}
    </ul>
  )
  
}

export default Anecdotes