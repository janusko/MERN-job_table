import React from 'react'
import axios from 'axios';
import styles from '../modules/buttons.module.css'
    
const DeleteButton = (props) => {
    const { jobId, onDeleteProp } = props;
    
    const deleteJob = (e) => {
        axios.delete('http://localhost:8000/api/job/' + jobId)
            .then(response =>{
                console.log(response);
                onDeleteProp(jobId);
            })
    }
    
    return (
        <button className={styles.btn} onClick={deleteJob}>
            Delete
        </button>
    )
}

export default DeleteButton;