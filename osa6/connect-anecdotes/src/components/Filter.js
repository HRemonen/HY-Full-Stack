import { useDispatch } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={({ target }) => dispatch(newFilter(target.value))} />
    </div>
  )
}

export default Filter