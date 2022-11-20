import { connect } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={({ target }) => props.newFilter(target.value)} />
    </div>
  )
}

export default connect(null, { newFilter })(Filter)