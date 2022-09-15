import React, {useEffect, useState} from 'react'
import CreateForm from '../components/CreateForm'
import DestinationTable from '../components/DestinationTable'
import axios from 'axios'

const Main = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/jobs')
            .then( response => setJobs(response.data))
            .catch(err => console.log(err))
    }, [])

    const addDest = (newDest) => {
        setJobs([...destinations, newDest])
    }

    const filterList = (deleteId) => {
        const updatedList = destinations.filter(
            (eachDest) => deleteId !== eachDest._id)
        setDestinations(updatedList)
    }

    return (
        <div>
            <CreateForm onCreate={addDest}/>
        </div>
    )
}

export default Main