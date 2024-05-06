import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getJobTrackerAPI } from '../services/allAPI'

function TableJobTrackerCandidate() {
    const [jobTracker, setJobTracker] = useState({})

    console.log("sssss", jobTracker);
    useEffect(() => {
        getJobTracker()
    }, [])


    const getJobTracker = async () => {
        const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));

        console.log(existingUser);
        if (!existingUser || !existingUser._id) {
            console.error("User ID is missing or invalid");
            return; // Exit early if user ID is missing or invalid
        }


        const candidateId = existingUser._id;

        const result = await getJobTrackerAPI(candidateId)
        console.log(result);
        console.log(result.data.jobTrackDetails)

        if (result.status == 200) {
            setJobTracker(result.data.jobTrackDetails)
        }

    }
    return (
        <>
            <Table striped className="table mt-4">
                <thead>
                    <tr >
                        <th className='text-danger'>Job Title</th>
                        <th className='text-danger'>Company</th>
                        <th className='text-danger'>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        jobTracker?.length > 0 ?
                            jobTracker?.map(job => (

                                <tr>
                                    <td>{job.jobTitle}</td>
                                    <td>{job.company}</td>
                                    <td className={
                                        job.status === "Applied" ? "text-info" :
                                        job.status === "Shortlisted" ? "text-warning" :
                                        job.status === "Approved" ? "text-success" :
                                        job.status === "Canceled" ? "text-primary" :
                                                    "success" // Default variant
                                    } 
                                    
                                    >{job.status}</td>
                                </tr>
                            ))
                            :
                            <div className='fw-bolder text-warning'>No Job Applied Yet!!! </div>
                    }

                    {/* <tr>
                        <td>ReactJS Developer</td>
                        <td>Infosys</td>
                        <td className='text-info'>Applied</td>
                    </tr>
                    <tr>
                        <td>Django Developer</td>
                        <td>Digital Brain Media</td>
                        <td className='text-warning'>Pending</td>
                    </tr>
                    <tr>
                        <td>MERN Stack Developer</td>
                        <td>Sneed</td>
                        <td className='text-success-emphasis'>Shortlisted</td>
                    </tr>
                    <tr>
                        <td>MEAN/MERN stack Developer</td>
                        <td>Alp Consulting Ltd</td>
                        <td className='text-danger'>Canceled</td>
                    </tr>
                    <tr>
                        <td>Django Developer</td>
                        <td>Infinitum Global</td>
                        <td className='text-success'>Approved</td>
                    </tr>
                    <tr>
                        <td>Django Developer</td>
                        <td>EverBee.io</td>
                        <td className='text-success'>Approved</td>
                    </tr> */}


                </tbody>
            </Table>
        </>
    )
}

export default TableJobTrackerCandidate