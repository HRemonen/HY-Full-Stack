const Part = ({ name, exercises }) => {
    return (
        <>
            <li> {name} {exercises}</li>
        </>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(part =>
                    <Part key={part.id} 
                        name={part.name} 
                        exercises={part.exercises} 
                    />)}
            </ul>
            
        </>
    )
    
}

export default Course