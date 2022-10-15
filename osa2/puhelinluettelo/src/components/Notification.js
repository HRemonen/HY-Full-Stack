const Notification = ({ message }) => {
    if (message === null ) {
        return null
    }

    return (
        <div className='success-msg' >
            {message}
        </div>
    )
}

export default Notification
