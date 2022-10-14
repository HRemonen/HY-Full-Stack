const Person = ({ props, handleDelete }) => {
    return (
      <li>{props.name} {props.number} 
        <button onClick={() => handleDelete(props.name, props.id)}>delete</button>
      </li>
    )
  }

export default Person
