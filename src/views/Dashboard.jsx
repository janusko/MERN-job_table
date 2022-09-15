import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import JobTable from '../components/JobTable'

const Dashboard = (props) => {
    const [jobs, setJobs] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/jobs`)
            .then(response => {
                console.log(response.data)
                setJobs(response.data)
            })
            .catch(err => console.log(err))
    }, [refresh])

    const filterList = (deleteId) => {
        const updatedList = jobs.filter(
            (eachJob) => deleteId !== eachJob._id);
        setJobs(updatedList)
    }

    const changeRefresh = () => {setRefresh(!refresh)}

    return (
        <div>
            <button><Link to='/jobs/add'> Create a job </Link></button>
            {
                jobs?
                <JobTable onDelete={filterList} jobs={jobs} changeRefresh={changeRefresh}/> :
                <h3>No jobs available right now</h3>
            }
        </div>
    )
}

export default Dashboard