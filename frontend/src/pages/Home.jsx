import { useEffect, useState } from "react"
import { useWorkoutsContext} from "../hooks/useWorkoutsContexts.jsx"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from "../components/WorkoutForm"

const Home = () => {
    // const [workouts, setWorkouts] = useState(null)
    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            const json = await response.json()

            console.log(json)

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            } else {
                console.error("Failed to fetch workouts")
            }
        }

        fetchWorkouts()
    }, [dispatch])
    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm/>
        </div>
    )
}

export default Home