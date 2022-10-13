const FilterPersons = ({ handleFilterChange }) => {
    
    return (
        <div>
            Filter persons: <input onChange={handleFilterChange}></input>
        </div>
    )
}

export default FilterPersons