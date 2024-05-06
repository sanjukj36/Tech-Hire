import React from 'react'
import { SERVER_URL } from '../services/serverUrl';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



function RecruiterRightSideProfile({ companyDetails }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        sessionStorage.removeItem("existingUser")
        navigate('/')
    }
    return (
        <>
            <div className='me-1'>
                <div className='d-flex flex-row-reverse bd-highlight mb-5'>
                    <Button className="btn btn-primary" onClick={handleLogout}>Logout <i class="fa-solid fa-right-from-bracket"></i></Button></div>
                <div className='text-center text-light'>
                    <img className='mb-2' width={200} src={`${SERVER_URL}/${companyDetails?.companyLogo}`} alt={`${SERVER_URL}/${companyDetails?.companyLogo}`} />
                    <h2>{companyDetails.companyName}</h2>
                    <p className='text-center'>
                        <a href={companyDetails?.linkedIn} target="_blank" ><i class="fa-brands fa-linkedin-in me-5"></i></a>
                        <a href={companyDetails?.companyWebsite} target="_blank" ><i class="fa-solid fa-globe me-5"></i></a>
                        <a href="mailto:{companyDetails?.email}" target="_blank" ><i class="fa-regular fa-envelope"></i></a>
                        <hr />
                    </p>
                    <p>{companyDetails?.domain}</p>

                    <p>{companyDetails?.location}</p>

                </div>
                <p className='text-light'>
                    {companyDetails?.aboutCompany}
                </p>
            </div>
        </>
    )
}

export default RecruiterRightSideProfile