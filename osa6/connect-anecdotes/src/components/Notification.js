import { connect } from 'react-redux'

const Notification = (props) => {
  console.log('Notification', props.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return { notification: state.notifications }
}

export default connect(mapStateToProps)(Notification)