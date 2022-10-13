const AddPerson = ({ addPerson, newName, newNumber, handleNumberChange, handlePersonChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handlePersonChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}></input>
            </div>
            <div>
                <button type="submit">Add person</button>
            </div>
      </form>
    )
}

export default AddPerson