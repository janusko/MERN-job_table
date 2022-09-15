import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom'

const Details = (props) => {
    const { id } = useParams();
    const [job, setJob] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/jobs/${id}`)
            .then(response => {
                setJob(response.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/jobs/${id}`)
            .then(response => {
                navigate(`/jobs`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {
                job &&
                <div>
                    <h2>Job Title: {job.title} </h2>
                    <h3>Company: {job.company} </h3>
                    <h4>Salary: ${job.salary} </h4>
                    <h4>Description: {job.description} </h4>
                    <h4>City: {job.city} </h4>
                    <h4>Remote: {job.remote ? "Yes" : "No"} </h4>
                    <button><Link to={'/jobs'}>Home</Link></button>
                    <button onClick={() => handleDelete()}> Delete</button>
                </div>
            }
        </div>
    )
}

export default Details