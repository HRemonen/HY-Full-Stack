import { connect } from 'react-redux'

const Notification = (props) => {
  console.log('Notification', props)

  return (
    <div>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return { notification: state.notifications }
}

export default connect(mapStateToProps)(Notification)
