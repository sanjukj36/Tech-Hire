import React, { useEffect, useState } from 'react'
import BgCandidateGIF from '../assets/BG-Candidate-GIF.gif';

import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { candidateProfileAPI, loginAPI, registerAPI } from '../services/allAPI';
import uploadImg from '../assets/upload.png';
import { SERVER_URL } from '../services/serverUrl';




function CandidateProfileUpdate({ }) {
    const [preview, setPreview] = useState("");
    const [imageFileStatus, setImageFileStatus] = useState(false);
    const [candidateDetails, setCandidateDetails] = useState({
        aboutYou: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).aboutYou : null,
        domain: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).domain : null,
        email: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).email : null,
        git: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).git : null,
        linkedIn: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).linkedIn : null,
        password: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).password : null,
        phoneNumber: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).phoneNumber : null,
        place: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).place : null,
        portfolio: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).portfolio : null,
        profileImage: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).profileImage : null,
        resumeUrl: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).resumeUrl : null,
        username: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).username : null,
        userId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null
    });
    console.log("ffffff",candidateDetails.profileImage);


    useEffect(() => {
        if (candidateDetails.profileImage.type == "image/png" || candidateDetails.profileImage.type == "image/jpg" || candidateDetails.profileImage.type == "image/jpeg") {
            console.log("dddd\nddddd\nddd\n");
            setPreview(URL.createObjectURL(candidateDetails.profileImage))
        } else {
          setPreview("")
        }
      }, [candidateDetails])




    const handleUploadProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("profileImage", candidateDetails.profileImage);
            formData.append("aboutYou", candidateDetails.aboutYou);
            formData.append("domain", candidateDetails.domain);
            formData.append("email", candidateDetails.email);
            formData.append("git", candidateDetails.git);
            formData.append("linkedIn", candidateDetails.linkedIn);
            formData.append("password", candidateDetails.password);
            formData.append("phoneNumber", candidateDetails.phoneNumber);
            formData.append("place", candidateDetails.place);
            formData.append("portfolio", candidateDetails.portfolio);
            preview ? formData.append("profileImage", candidateDetails.projectImage) : formData.append("projectImage", candidateDetails.projectImage)
            formData.append("resumeUrl", candidateDetails.resumeUrl);
            formData.append("username", candidateDetails.username);
            formData.append("userId", candidateDetails.userId); // Include userId in FormData

            const reqHeader = {
                "Content-Type": "multipart/form-data",
            }

            const result = await candidateProfileAPI(formData, reqHeader);
            console.log(result);
            console.log(result);
            if (result.status == 200) {
                sessionStorage.setItem("existingUser", JSON.stringify(result.data))
                toast.success(`Welcome ${result.data.username}... Explore our website!!!`)
                window.location.reload();
                setTimeout(() => {
                    navigate('/dashboard-Recruiter')
                }, 1000);
            } else {
                toast.error(result.response.data)
                setCandidateDetails({
                    aboutYou: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).aboutYou : null,
                    domain: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).domain : null,
                    email: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).email : null,
                    git: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).git : null,
                    linkedIn: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).linkedIn : null,
                    password: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).password : null,
                    phoneNumber: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).phoneNumber : null,
                    place: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).place : null,
                    portfolio: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).portfolio : null,
                    profileImage: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).profileImage : null,
                    resumeUrl: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).resumeUrl : null,
                    username: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).username : null,
                    userId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null
                });
                setTimeout(() => {

                }, 2000);
            }

            // Handle success or error response
        } catch (error) {
            console.error("Error uploading candidate details:", error);
            toast.error("An error occurred while uploading company details. Please try again later.");
        }
    };

    const goBack=()=>{
        window.location.reload();
    }


    return (
        <div style={{ width: "100%", height: '100%', backgroundImage: `url(${BgCandidateGIF})` }} className='d-flex justify-content-center align-items-center'>
            {/* <img src{BgC=andidateGIF} className="img-fluid" alt="Candidate Background" /> */}

            <div className="container w-75">
                <Link style={{ textDecoration: 'none' }}onClick={goBack} className='fw-bolder mb-2'><i className='fa-solid fa-arrow-left'></i> Go Back</Link>
                <div className="card shadow p-5 mt-2" style={{opacity:"0.97",background:"transparent",border: "1px"}} >
                    <div className="row align-item-center">
                    <h1 className="fw-bolder display-2 text-light mb-2"><i>Update Your Account</i></h1>
                        <div className="col-lg-6">
                            {/* <img className='w-100' src="https://img.freepik.com/free-vector/login-concept-illustration_114360-4525.jpg" alt="Auth" /> */}

                            {/* <img className='w-100' src={BgCandidateGIF} alt="Auth" /> */}
                            <label className='d-flex justify-content-center' >
                                <input
                                    onChange={(e) => setCandidateDetails({ ...candidateDetails, profileImage: e.target.files[0] })}
                                    type="file"
                                    style={{ display: 'none' }}
                                />
                                <img style={{height:"500px", width:"500px"}} className='img-fluid align-center mb-4' src={preview ? preview : `${SERVER_URL}/${candidateDetails?.profileImage}`} alt="" />
                            </label>
                            {!imageFileStatus && (
                                <div className="text-danger my-2">
                                    *Upload only following file types (png, jpg, jpeg) here !!!
                                </div>
                            )}

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Your Linkedin Profile"
                                className="mb-3"
                            >
                                <Form.Control type="text" value={candidateDetails.linkedIn} onChange={e => setCandidateDetails({ ...candidateDetails, linkedIn: e.target.value })} placeholder="name@example.com" />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Your Git Profile Link"
                                className="mb-3"
                            >
                                <Form.Control type="text" value={candidateDetails.git} onChange={e => setCandidateDetails({ ...candidateDetails, git: e.target.value })} placeholder="username" />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="floatingInput"
                                label="Your portfolio Website Link"
                                className="mb-3"
                            >
                                <Form.Control type="email" value={candidateDetails.portfolio} onChange={e => setCandidateDetails({ ...candidateDetails, portfolio: e.target.value })} placeholder="name@example.com" />
                            </FloatingLabel>

                        </div>
                        <div className="col-lg-6">
                            {/* <h1 className='d-flex'><strong><i class="fa-brands fa-docker"></i>TECH HIRE</strong></h1> */}
                            {/* <h1 className="fw-bolder display-2 text-primary mt-2">Update Your Account</h1> */}
                            <Form>

                                <div>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Username"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={candidateDetails.username} onChange={e => setCandidateDetails({ ...candidateDetails, username: e.target.value })} placeholder="username" />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Email address"
                                        className="mb-3"
                                    >
                                        <Form.Control type="email" value={candidateDetails.email} onChange={e => setCandidateDetails({ ...candidateDetails, email: e.target.value })} placeholder="name@example.com" />
                                    </FloatingLabel>


                                    <FloatingLabel controlId="floatingPassword" label="Password" className='mb-3'>

                                        <Form.Control type="password" value={candidateDetails.password} onChange={e => setCandidateDetails({ ...candidateDetails, password: e.target.value })} placeholder="Password" />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Your Domain"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={candidateDetails.domain} onChange={e => setCandidateDetails({ ...candidateDetails, domain: e.target.value })} placeholder="name@example.com" />
                                    </FloatingLabel>

                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Your Current Place"
                                        className="mb-3"
                                    >
                                        <Form.Control type="text" value={candidateDetails.place} onChange={e => setCandidateDetails({ ...candidateDetails, place: e.target.value })} placeholder="username" />
                                    </FloatingLabel>
                                    <FloatingLabel controlId="floatingInpu" label="Your Number" className='mb-3'>

                                        <Form.Control type="tel" value={candidateDetails.phoneNumber} onChange={e => setCandidateDetails({ ...candidateDetails, phoneNumber: e.target.value })} placeholder="Password" />
                                    </FloatingLabel>



                                    <textarea
                                        value={candidateDetails.aboutYou}
                                        onChange={(e) =>
                                            setCandidateDetails({ ...candidateDetails, aboutYou: e.target.value })
                                        }
                                        rows="8"
                                        className="form-control"
                                        placeholder='About You'
                                    ></textarea>


                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Your Resume:</label>
                                        <input onChange={(e) => setCandidateDetails({ ...candidateDetails, resumeUrl: e.target.files[0] })} class="form-control" type="file" id="formFile" />
                                    </div>



                                </div>
                            </Form>

                        </div>
                        <div className='mt-3 text-center'>
                            <button onClick={handleUploadProfile} className='btn btn-primary mb-4 mt-3' to={'/dashboard-Recruiter'}> Register</button>

                            <p>Already have an Account? Click here to <Link className='text-info' to={"/login-Candidate"}>Login</Link> </p>

                        </div>


                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </div>
    )
}

export default CandidateProfileUpdate
