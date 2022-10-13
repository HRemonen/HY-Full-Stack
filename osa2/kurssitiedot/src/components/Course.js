const Part = ({ name, exercises }) => {
    return (
        <>
            <li> {name} {exercises}</li>
        </>
    )
}

const Course = ({ course }) => {
    const totalExercises = course.parts.reduce(
        (previous, current) => previous + current.exercises, 0
    )

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
            <b>Total of { totalExercises } exercises</b>
        </>
    )
}

export default Course