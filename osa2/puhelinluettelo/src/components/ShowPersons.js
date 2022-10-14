import Person from "./Person"

const ShowPersons = ({ persons, filtered, handleDelete }) => {
    const personsToShow = filtered ? filtered : persons
    
    if (personsToShow.length === 0) return <h4>No persons matching search input.</h4>
  
    return (
        <ul>
          {personsToShow.map(person =>
            <Person key={person.name} props={person} handleDelete={handleDelete} />
          )}
        </ul>
    )
}

export default ShowPersons