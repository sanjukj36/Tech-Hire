import React, { useRef, useEffect, useState } from 'react'
import { Dropdown, Table } from 'react-bootstrap'
import { getAllUserByTypeAPI, userAuthUpdateAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BgAdminGIF from '../assets/admin.gif'


import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate=useNavigate()
    const [candidateDetails, setCandidateDetails] = useState({})
    const [recruiterDetails, setRecruiterDetails] = useState({})
    var auth


    useEffect(() => {
        getCandidateDetails()
        getRecruiterDetails()

    }, [])

    const getCandidateDetails = async () => {
        try {
            const requestBody = {
                "type": "Candidate"
            };
            const result = await getAllUserByTypeAPI(requestBody);
            console.log(result);
            if (result.status == 200) {

                setCandidateDetails(result.data)
                console.log(candidateDetails);
            }

        } catch (error) {
            console.error("Error occurred:", error);

        }
    }

    const getRecruiterDetails = async () => {
        try {
            const requestBody = {
                "type": "Recruiter"
            };
            const result = await getAllUserByTypeAPI(requestBody);
            console.log(result);
            if (result.status == 200) {

                setRecruiterDetails(result.data)
                console.log(recruiterDetails);
            }

        } catch (error) {
            console.error("Error occurred:", error);

        }
    }

    const handleUserAuthUpdate = async (recruiterId, auth) => {
        console.log(auth, recruiterId);
        try {
            const requestBody = {
                "auth": auth,
                "_id": recruiterId
            };
            const result = await userAuthUpdateAPI(requestBody);
            console.log(result);
            if (result.status === 200) {
                console.log(result.data.existingUser.auth);
                if (result.data.existingUser.auth === "Pending") {

                    const { username, email } = result.data.existingUser;
                    const message = `We wanted to inform you that your account status is currently pending. Please note that this process typically takes a minimum of two days to complete. 
                    \n If you have any questions or concerns regarding your account status or need assistance, please do not hesitate to reach out to us at admin@gmail.com Our team will be more than happy to assist you.
                    `;

                    sendEmail({ user_name: username, user_email: email, message: message });
                } else if (result.data.existingUser.auth === "Approved") {

                    const { username, email } = result.data.existingUser;
                    const message = `We are pleased to inform you that your account with [TechHire] has been successfully accepted and activated. You are now free to access all the features and functionalities available to our members.
                    \n Feel free to explore and utilize the resources and services provided within your account. Should you encounter any issues or require assistance navigating through our platform, please don't hesitate to contact us at admin@gmail.com. Our team is here to support you every step of the way.
                    `;

                    sendEmail({ user_name: username, user_email: email, message: message });
                } else if (result.data.existingUser.auth === "Denied") {

                    const { username, email } = result.data.existingUser;
                    const message = `We regret to inform you that your recent application for an account with [TechHire] has been denied. After careful consideration, our team has determined that your application does not meet our current requirements.
                    \n We understand that this news may be disappointing, and we appreciate the time and effort you put into your application. If you have any questions or would like further clarification regarding the denial of your application, please don't hesitate to reach out to us at admin@gmail.com. We are more than happy to provide additional information and address any concerns you may have.Thank you for your interest in [TechHire]. We encourage you to continue exploring opportunities within our community, and we wish you the best in your future endeavors.Sincerely,`;

                    sendEmail({ user_name: username, user_email: email, message: message });

                }
                getRecruiterDetails();
            }



        } catch (error) {
            console.error("Error occurred:", error);

        }


    }


    const form = useRef();

    const sendEmail = async ({ user_name, user_email, message }) => {
        try {
            const result = await emailjs.send('service_1qlwyak', 'template_66aai08', {
                user_name: user_name,
                user_email: user_email,
                message: message
            }, {
                publicKey: 'hVM2aCXBeEHskd79I'
            });

            console.log('SUCCESS!', result.text);
            toast.success(`Email Send Successfully to ${user_name}`);

            // Reset the form if needed
            if (form.current) {
                form.current.reset();
            }
        } catch (error) {
            console.log('FAILED...', error);
            toast.warning(`Something wrong with his email:${user_email}`);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("existingUser")
        navigate('/')
    }



    const [windowHeight, setWindowHeight] = useState(window.innerHeight);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const style = {
        backgroundImage: `url(${BgAdminGIF})`,
        backgroundSize: 'cover',
        minHeight: windowHeight,

    };

    return (

        <div className='' style={style} >
            <button onClick={handleLogout} type="button" class="btn m-5 btn-outline-success position-absolute top-0 end-0">Logout <i class="fa-solid fa-right-from-bracket"></i></button>
            <div className='me-5 ms-5 p-5'>

                <h1 className='display-1 pt-5 fw-bolder text-center' style={{ color: "green" }}><u>Admin Dashboard</u></h1>


                <h2 className='mt-5 text-white fw-bolder'><u>Recruiter Joined</u></h2>

                <Table striped className="table mt-4  table-bordered table-dark">
                    <thead>
                        <tr className='text-center table-success' >
                            <th className='text-success'>Username</th>
                            <th className='text-success'>Email</th>
                            <th className='text-success'>Company Name</th>
                            <th className='text-success'>Company Website</th>
                            <th className='text-success'>linkedIn</th>
                            <th className='text-success'>location</th>
                            <th className='text-success'>Status</th>
                        </tr>
                    </thead>
                    <tbody>


                        {recruiterDetails?.length > 0 ?

                            recruiterDetails?.map(recruiter => (
                                <tr className='text-center' key={recruiter._id}>
                                    <td>{recruiter.username}</td>
                                    <td>{recruiter.email}</td>
                                    <td>{recruiter.companyName}</td>
                                    <td>
                                        <a href={recruiter.companyWebsite} target="_blank" ><i class="fa-solid fa-globe"></i></a>

                                    </td>
                                    <td>
                                        <a href={recruiter?.linkedIn} target="_blank" ><i class="fa-brands fa-linkedin-in me-5"></i></a>

                                    </td>
                                    <td>{recruiter.location}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant={
                                                recruiter.auth === "Pending" ? "warning" :
                                                    recruiter.auth === "Approved" ? "success" :
                                                        recruiter.auth === "Denied" ? "primary" :
                                                            "warning" // Default variant
                                            } id="dropdown-basic">
                                                {recruiter.auth}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleUserAuthUpdate(recruiter._id, auth = "Pending")}>Pending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleUserAuthUpdate(recruiter._id, auth = "Approved")}>Approved</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleUserAuthUpdate(recruiter._id, auth = "Denied")}>Denied</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>

                                </tr>)) :
                            <div>No Candidate Joined</div>
                        }



                    </tbody>
                </Table>

                <h2 className='mt-5 text-white fw-bolder'><u>Candidate Joined</u></h2>

                <Table striped className="table mt-4 table-bordered table-dark">
                    <thead>
                        <tr className='text-center  table-success' >
                            <th className='text-success'>Username</th>
                            <th className='text-success'>Email</th>
                            <th className='text-success'>Phone Number</th>
                            <th className='text-success'>Linkedin</th>
                            <th className='text-success'>location</th>

                        </tr>
                    </thead>
                    <tbody>

                        {candidateDetails?.length > 0 ?

                            candidateDetails?.map(candidate => (
                                <tr className='text-center' key={candidate._id}>
                                    <td >{candidate.username}</td>
                                    <td>{candidate.email}</td>
                                    <td>{candidate.phoneNumber}</td>
                                    <td>
                                        <a href={candidate?.linkedIn} target="_blank" ><i class="fa-brands fa-linkedin-in me-5"></i></a>

                                    </td>
                                    <td>{candidate.place}</td>



                                </tr>)) :
                            <div>No Candidate Joined</div>
                        }

                    </tbody>
                </Table>

            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </div>
    )
}

export default AdminDashboard