import React, { moment } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"


const JobTable = (props) => {
    const { jobs, changeRefresh, onDelete} = props

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:8000/api/jobs/${deleteId}`)
            .then(response=>{
                onDelete(deleteId)
            })
            .catch(err=>console.log(err))
    }

    const toggleRemote = (job) => {
        axios.put(`http://localhost:8000/api/jobs/${job._id}`, {remote: !job.remote})
        .then(response => {
            console.log(response.data);
            changeRefresh();
        })
        .catch(err=>console.log(err))
    }

    

    return (
        <table>
            <thead>
                <tr>
                    <th> Title</th>
                    <th> Date </th>
                    <th> Company</th>
                    <th> Salary</th>
                    <th> Description</th>
                    <th> City</th>
                    <th> Remote</th>
                    <th colSpan={3}> Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    jobs? jobs.map((eachJob, i)=>{
                        return(
                            <tr key={i}>
                                <td> <Link to={`/jobs/${eachJob._id}`}>{eachJob.title}</Link></td>
                                <td> {moment(eachJob.createdAt).format('MMM d, YYYY')} </td>
                                <td> {eachJob.company}</td>
                                <td> ${eachJob.salary}</td>
                                <td> {eachJob.description}</td>
                                <td> {eachJob.city} </td>
                                <td> {eachJob.remote ? "Yes" : "No"}</td>
                                <td><button onClick={()=>toggleRemote(eachJob)} >Change Remote</button></td>
                                <td> <button><Link to={`/jobs/edit/${eachJob._id}`}>Edit</Link></button>
                                <button onClick={()=>handleDelete(eachJob._id)}> Delete</button></td>
                            </tr>
                        )
                    }) : <h2>No jobs available</h2>
                }
            </tbody>
        </table>
    )
}

export default JobTable