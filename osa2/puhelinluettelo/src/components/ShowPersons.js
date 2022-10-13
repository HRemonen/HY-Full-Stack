import Person from "./Person"

const ShowPersons = ({ persons, filtered }) => {
    const personsToShow = filtered ? filtered : persons
    return (
        <ul>
          {personsToShow.map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
          )}
        </ul>
    )
}

export default ShowPersons