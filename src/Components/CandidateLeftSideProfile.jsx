import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../services/serverUrl'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

function CandidateLeftSideProfile({ candidateDetails, handleUpdateProfile }) {
    const navigate = useNavigate()


    const handleResume = () => {
        if (candidateDetails && candidateDetails.resumeUrl) {
            window.open(`${SERVER_URL}/${candidateDetails.resumeUrl}`);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("existingUser")
        sessionStorage.removeItem("token")
        navigate('/')
    }


    return (
        <>

            <div className='text-center'>
                <h4 className='text-center'>{candidateDetails?.username}</h4>
                <img  style={{height:"400px", width:"400px"}} src={`${SERVER_URL}/${candidateDetails?.profileImage}`} alt={`${SERVER_URL}/${candidateDetails?.profileImage}`} className="img-fluid rounded-circle mb-3" />
                <h5 className='text-center w-'><u>{candidateDetails?.domain}</u></h5>
                <p className='text-center'>
                    <a href={candidateDetails?.linkedIn} target="_blank" ><i class="fa-brands fa-linkedin-in me-5"></i></a>
                    <a href={candidateDetails?.git} target="_blank" ><i class="fa-brands fa-github me-5"></i></a>
                    <a href="mailto:{candidateDetails?.email}" target="_blank"><i class="fa-regular fa-envelope me-5"></i></a>
                    <a href={candidateDetails?.portfolio} target="_blank" ><i class="fa-solid fa-globe"></i></a>

                </p>
                <p><i class="fa-solid fa-location-dot me-1"></i> {candidateDetails.place}</p>
                <p><i class="fa-solid fa-phone me-1"></i> {candidateDetails.phoneNumber}</p>
                <div className='d-flex flex-column bd-highlight mb-3'>
                    <Button className="btn btn-info" onClick={handleResume} >View Resume</Button><br />
                    <Button className="btn btn-primary mt-2" onClick={handleUpdateProfile}>Update Profile</Button>
                    <Button className="btn btn-primary mt-2" onClick={handleLogout}>Logout <i class="fa-solid fa-right-from-bracket"></i></Button>
                </div>

            </div>

        </>
    )
}

export default CandidateLeftSideProfile
