import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from "react-router-dom";

const Update = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState(70000);
    const [remote, setRemote] = useState(false);
    const [description, setDescription] = useState('')
    const [city, setCity] = useState('New York')
    const [errors, setErrors] = useState([]);
    
    const { id } = useParams();
    const navigate = useNavigate();

    // get info from API to pre-populate the form
    useEffect(() => {
        axios.get(`http://localhost:8000/api/jobs/${id}`)
            .then(response => {
                const currentJob = response.data
                setTitle(currentJob.title)
                setCompany(currentJob.company)
                setSalary(currentJob.salary)
                setDescription(currentJob.description)
                setCity(currentJob.city)
                setRemote(currentJob.remote)
            })
            .catch(err => console.log(err))
    }, [])

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/jobs/${id}`)
            .then(response => {
                navigate(`/jobs`)
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/jobs/${id}`, { title, company, salary, description, city, remote })
            .then(response => {
                console.log(response.data)
                navigate(`/jobs/${id}`)
            })
            .catch(err=>{
                const errorResponseDataErrors = err.response.data.errors
                console.log(errorResponseDataErrors)
                const errMsgArr =[]
                for(const eachKey in errorResponseDataErrors){
                    errMsgArr.push(errorResponseDataErrors[eachKey].message)
                }
                setErrors(errMsgArr)
            })
    }

    const handleChange = (e) => {
        setCity(e.target.value)
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Job Title: </label>
                    <input type="text" name="title" value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label> Company: </label>
                    <input type="text" name="company" value={company}
                        onChange={(e) => setCompany(e.target.value)} />
                </div>
                <div>
                    <label> Salary: </label>
                    <input type="number" name="salary" value={salary}
                        onChange={(e) => setSalary(e.target.value)} />
                </div>
                <div>
                    <label> Description: </label>
                    <textarea name="description" value={description} placeholder='Please add a description'
                        onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div>
                    <div>
                        <input type="radio" name="newyork" value="New York" checked={city === 'New York'}
                        onChange={handleChange} /> New York
                    </div>
                    <div>
                        <input type="radio" name="chicago" value="Chicago" checked={city === 'Chicago'}
                        onChange={handleChange} /> Chicago
                    </div>
                    <div>
                        <input type="radio" name="la" value="Los Angeles" checked={city === 'Los Angeles'}
                        onChange={handleChange} /> Los Angeles
                    </div>
                </div>
                <div>
                    <label> Remote
                        <input type="checkbox" checked={remote} name="remote" value={remote}
                        onChange={(e) => setRemote(e.target.checked)} /></label>
                </div>
                <button type="submit"> Edit </button>
                <button><Link to={'/jobs'}>Cancel</Link></button>
                <button onClick={() => handleDelete()}> Delete</button>
            </form>
            {
                errors.map((eachErr, i)=>(
                    <p key={i} style={{color: "red"}}> {eachErr}</p>
                    ))
            }
        </div>
    )
}

export default Update