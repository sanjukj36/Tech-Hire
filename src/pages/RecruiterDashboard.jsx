import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import RecruiterProfileForm from '../Components/RecruiterProfileForm';
import { getJobTrackerRecruiterAPI, jobShowAPI, jobStatusUpdateAPI, profileStatusAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import RecruiterRightSideProfile from '../Components/RecruiterRightSideProfile';
import JobCreateForm from '../Components/JobCreateForm';
import { SERVER_URL } from '../services/serverUrl';


function RecruiterDashboard() {
    var status = ""
    const navigate = useNavigate()
    const [profile, setProfile] = useState(true)
    const [displayName, setDisplayName] = useState("")
    const [jobCard, setJobCard] = useState({})
    console.log("sss", jobCard);

    const auth = JSON.parse(sessionStorage.getItem('existingUser')).auth
    const username = JSON.parse(sessionStorage.getItem('existingUser')).username


    useEffect(() => {
        if (sessionStorage.getItem("existingUser")) {
            const { username } = JSON.parse(sessionStorage.getItem("existingUser"))
            setDisplayName(username)
        } else {
            setDisplayName("")
        }
    })

    const [companyDetails, setCompanyDetails] = useState("")
    console.log(companyDetails);

    useEffect(() => {
        profileStatus()
        JobCardShow()
    }, [])

    const profileStatus = async () => {
        try {
            const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
            console.log(existingUser);
            if (!existingUser || !existingUser._id) {
                console.error("User ID is missing or invalid");
                return; // Exit early if user ID is missing or invalid
            }

            const user_id = existingUser._id;
            console.log(user_id);

            const result = await profileStatusAPI(user_id);
            console.log(result);

            // Assuming `result` is an object with a `status` property representing the HTTP status code
            if (result.status === 200) {
                setCompanyDetails(result.data.companyDetails)
                if (!result.data.companyDetails.companyName) {
                    setProfile(false)
                } else {
                    setProfile(true)
                }
                setTimeout(() => {
                    navigate('/dashboard-Recruiter')
                }, 1000);

            } else {
                // setProfile(false); // Uncomment this line if you have a function to set profile status to false
            }
        } catch (error) {
            console.error("Error checking profile status:", error);
            toast.error("An error occurred while checking profile status. Please try again later.");
        }
    }

    const [activeJobTitle, setActiveJobTitle] = useState(null);
    const [candidatesForJobPost, setCandidatesForJobPost] = useState([]);

    const handleSelectJobPost = async (title, jobId) => {

        const auth = JSON.parse(sessionStorage.getItem('existingUser')).auth
        if (auth == "Approved") {
            setCandidatesForJobPost([])
            console.log(title);
            setActiveJobTitle(title);


            const result = await getJobTrackerRecruiterAPI(jobId)
            console.log(result);
            console.log(result.data.jobTrackDetails)

            if (result.status == 200) {
                setCandidatesForJobPost(result.data.jobTrackDetails)
            }
        } else {
            toast.warning("Sorry, your account is currently undergoing the verification process. If you have any urgent matters, you can contact the admin.");
            toast.warning(`Your account status is ${auth}`);
        };

    };

    const JobCardShow = async () => {
        console.log("Job Show function");
        try {
            const existingUser = JSON.parse(sessionStorage.getItem("existingUser"));
            console.log(existingUser);
            if (!existingUser || !existingUser._id) {
                console.error("User ID is missing or invalid");
                return; // Exit early if user ID is missing or invalid
            }

            const recruiterId = existingUser._id;

            const result = await jobShowAPI(recruiterId);
            console.log("00000000", result);

            if (result.status === 200) {
                setJobCard(result.data.jobDetails)
            } else {

            }
        } catch (error) {
            console.error("Error checking profile status:", error);
            toast.error("An error occurred while checking profile status. Please try again later.");
        }
    }

    const jobStatusUpdate = async (trackingId, status) => {
        console.log(status);

        try {
            const reqBody = new FormData();
            reqBody.append("trackingId", trackingId);
            reqBody.append("status", status);

            const result = await jobStatusUpdateAPI(reqBody);
            console.log(result);
            if (result.status == 200) {
                handleSelectJobPost(result.data.jobTrackersDetails.jobTitle, result.data.jobTrackersDetails.jobId)

            } else {
                toast.error(result.response.data)
            }
            // Handle success or error response
        } catch (error) {
            console.error("Error uploading:", error);
            toast.error("An error occurred while uploading job details. Please try again later.");
        }


    }

    const handleResume = (resumeUrl) => {
        if (resumeUrl) {
            window.open(`${SERVER_URL}/${resumeUrl}`);
        }
    };

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
        background:"linear-gradient(110deg, rgb(74, 75, 76) 60%, #606060 60%)",
        minHeight: windowHeight,
    };



    return (
        <>
            <div>
                {/* style={{height:"100%",background:"linear-gradient(110deg, rgb(74, 75, 76) 60%, #606060 60%)"}} */}

                {profile ? <div className="container-fluid" style={style} >
                    <div className="row">

                        {/* Left side - List of Job Posts and Create Job Post form */}
                        <div style={{ height: "100%",background:"linear-gradient(110deg, #4a4b4c 60%, rgb(123 55 40) 60%)", marginTop:"20px"}} className="col-md-3 border-right py-5 card shadow ">
                            <div  className='d-flex mb-3'>
                                <h2 className='text-light fw-bolder ms-4 me-5'>Job Posts</h2>
                                <JobCreateForm />

                            </div>

                            <ul className="list-group shadow ">
                                {
                                    jobCard?.length > 0 ?
                                        jobCard?.map(job => (
                                            <li className="list-group-item" key={job._id} onClick={() => handleSelectJobPost(job.title, job._id)}>
                                                <div className="card shadow  p-2">
                                                    <div className="front">
                                                        <div className="title">
                                                            <h2>Job Opportunity</h2>
                                                            <h3>{job.title}</h3>
                                                        </div>
                                                        <div className="details">
                                                            <p>Location: {job.location}</p>
                                                            <p>Mode: {job.jobMode}</p>
                                                            <p>Domain Experience: {job.experience}</p>
                                                            <p>salary: {job.salary}</p>

                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                        :
                                        <div className='fw-bolder text-danger m-5 text-center'>No Job Post</div>
                                }

                                {/* <li className="list-group-item" onClick={() => handleSelectJobPost("Django Developer")}>
                                    <div className="card shadow  p-2">
                                        <div className="front">
                                            <div className="title">
                                                <h2>Job Opportunity</h2>
                                                <h3>Django Developer</h3>
                                            </div>
                                            <div className="details">
                                                <p>Location: Hyderabad</p>
                                                <p>Mode: Work from Office (Hyderabad)</p>
                                                <p>Domain Experience: Banking/Retail</p>
                                                <p>Experience: 5+ Years</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item" onClick={() => handleSelectJobPost("ReactJS Developer")}>
                                    <div className="card shadow p-2">
                                        <div className="front">
                                            <div className="title">
                                                <h2>Job Opportunity</h2>
                                                <h3>ReactJS Developer</h3>
                                            </div>
                                            <div className="details">
                                                <p>Location: Hyderabad</p>
                                                <p>Mode: Work from Office (Hyderabad)</p>
                                                <p>Domain Experience: Banking/Retail</p>
                                                <p>Experience: 5+ Years</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item" onClick={() => handleSelectJobPost("MERN Stack developer")}>
                                    <div className="card shadow p-2">
                                        <div className="front">
                                            <div className="title">
                                                <h2>Job Opportunity</h2>
                                                <h3>MERN Stack developer</h3>
                                            </div>
                                            <div className="details">
                                                <p>Location: Hyderabad</p>
                                                <p>Mode: Work from Office (Hyderabad)</p>
                                                <p>Domain Experience: Banking/Retail</p>
                                                <p>Experience: 5+ Years</p>
                                            </div>
                                        </div>
                                    </div>
                                </li> */}

                            </ul>

                        </div>

                        {/* Center - Candidates for the Selected Job Post */}
                        {auth == "Approved" ? <div className="col-md-6 py-5 text-light">
                            <h2 className=' fw-bolder'>Candidates for {activeJobTitle}  Job</h2>

                            <Table striped className="table table-bordered table-dark mt-4">
                                <thead>
                                    <tr className='text-center text-primary'>
                                        <th className='text-danger'>Candidate</th>
                                        <th className='text-danger'>Number</th>
                                        <th className='text-danger'>Email</th>
                                        <th className='text-danger'>Resume</th>
                                        <th className='text-danger'>Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {candidatesForJobPost.map(candidate => (
                                        <tr className='text-center' key={candidate.id}>
                                            <td>{candidate.candidateName}</td>
                                            <td>{candidate.candidateNumber}</td>
                                            <td>{candidate.candidateEmail}</td>
                                            <td>
                                                {!candidate.resumeUr ?
                                                    <div className='btn ' onClick={() => { handleResume(candidate.resumeUrl) }}><i class="fa-solid fa-file" style={{ color: "red" }} ></i></div>
                                                    :
                                                    <div className='btn' onClick={() => { handleResume(candidate.resumeUrl) }}>Resume</div>
                                                }
                                            </td>
                                            <td>
                                                <Dropdown>
                                                    <Dropdown.Toggle variant={
                                                        candidate.status === "Applied" ? "info" :
                                                            candidate.status === "Shortlisted" ? "warning" :
                                                                candidate.status === "Approved" ? "success" :
                                                                    candidate.status === "Canceled" ? "primary" :
                                                                        "success" // Default variant
                                                    } id="dropdown-basic">
                                                        {candidate.status}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        <Dropdown.Item onClick={() => jobStatusUpdate(candidate._id, status = "Shortlisted")}>Shortlisted</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => jobStatusUpdate(candidate._id, status = "Approved")}>Approved</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => jobStatusUpdate(candidate._id, status = "Canceled")}>Canceled</Dropdown.Item>

                                                    </Dropdown.Menu>
                                                </Dropdown>

                                            </td>


                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                            :
                            <div className="col-md-6 p-5 align-item-center text-primary">
                                <h1>Hi {username},</h1>
                                <p className='mt-4 ms-5'>Sorry, your account is currently undergoing the verification process. </p>
                                <p className='ms-5'> If you have any urgent matters, you can contact the admin.</p>
                                <p className='ms-5'>Now your account status is {auth}</p>
                            </div>
                        }

                        {/* Right side - Profile of the Company */}
                        <div className="col-md-3 border-left py-5 card shadow mt-2 mb-5" style={{background:"linear-gradient(110deg, rgb(74, 75, 76) 60%, #606060 60%)"  }}>
                            <RecruiterRightSideProfile companyDetails={companyDetails} />
                        </div>
                    </div>
                </div>
                    :
                    <div>
                        <RecruiterProfileForm displayName={displayName} />
                    </div>
                }
                <ToastContainer position='top-center' theme='colored' autoClose={2000} />
            </div>

        </>
    );
}

export default RecruiterDashboard;
