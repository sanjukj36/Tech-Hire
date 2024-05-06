import React, { useEffect, useState } from 'react';
import { jobShowCandidateAPI } from '../services/allAPI';
import ModelJobCard from './ModelJobCard';
import { Button } from 'react-bootstrap';

function JobCardCandidateShow() {
    const [modalShow, setModalShow] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null); // Track the selected job

    const [jobCard, setJobCard] = useState([]);
    console.log("gfggggg", jobCard);

    useEffect(() => {
        jobCardShow();
    }, []);

    const jobCardShow = async () => {
        console.log("Job Show function");
        try {
            const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
            if (!existingUser || !existingUser._id) {
                console.error("User ID is missing or invalid");
                return;
            }

            const result = await jobShowCandidateAPI();

            if (result.status === 200) {
                setJobCard(result.data.jobDetails);
            } else {
                // Handle error
            }
        } catch (error) {
            console.error("Error checking profile status:", error);
            // Handle error
        }
    };

    return (
        <div>
            <ul className="list-group shadow">
                {jobCard.length > 0 ? (
                    jobCard.map((job) => (
                        <div key={job._id}>
                            <li className="list-group-item" onClick={() => { setSelectedJob(job); setModalShow(true); }}>
                                <div className="card shadow p-2">
                                    <div className="front">
                                        <div className="title d-flex">
                                            <div className=' me-4'>
                                                <h2>Job Opportunity</h2>
                                                <h3>{job.title}</h3>
                                            </div>
                                            <div className='text-info ms-5'> <h2>{job.companyName}</h2></div>
                                        </div>
                                        <div className="details">
                                            <p>Location: {job.location}</p>
                                            <p>Mode: {job.jobMode}</p>
                                            <p>Domain Experience: {job.experience}</p>
                                            <p>Salary: {job.salary}</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </div>
                    ))
                ) : (
                    <div className='fw-bolder text-danger m-5 text-center'>No Job Post</div>
                )}
            </ul>

            {selectedJob && (
                <ModelJobCard job={selectedJob} show={modalShow} onHide={() => setModalShow(false)} />
            )}
            
        </div>
    );
}

export default JobCardCandidateShow;
