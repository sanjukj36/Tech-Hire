import React, { useEffect, useState } from 'react'
import BgCandidateGIF from '../assets/BG-Candidate-GIF.gif';

import { FloatingLabel, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { companyRegisterAPI, loginAPI, registerAPI, registerCandidateAPI } from '../services/allAPI';
import { SERVER_URL } from '../services/serverUrl';
import uploadImg from '../assets/upload.png';



function Auth({ Candidate, insideRegister }) {
    const navigate = useNavigate()
    const [preview, setPreview] = useState("")
    const [candidateDetails, setCandidateDetails] = useState({ profileImage: "" })
    const [imageFileStatus, setImageFileStatus] = useState(false);

    console.log(candidateDetails);


    useEffect(() => {
        if (candidateDetails.profileImage.type == "image/png" || candidateDetails.profileImage.type == "image/jpg" || candidateDetails.profileImage.type == "image/jpeg") {
            setImageFileStatus(true)
            setPreview(URL.createObjectURL(candidateDetails.profileImage))
        } else {
            setPreview(uploadImg)
            setImageFileStatus(false)
            setCompanyDetails({ ...candidateDetails, profileImage: "" })
        }
    }, [candidateDetails.profileImage])

    const handleCandidateRegister = async (e) => {
        e.preventDefault();
        if (candidateDetails.username && candidateDetails.email && candidateDetails.password && candidateDetails.aboutYou) {
            const userType = Candidate ? "Candidate" : "Recruiter";

            const formData = new FormData();
            formData.append("username", candidateDetails.username);
            formData.append("email", candidateDetails.email);
            formData.append("password", candidateDetails.password);
            formData.append("type", userType);
            formData.append("auth", "Pending");
            formData.append("aboutYou", candidateDetails.aboutYou);
            formData.append("domain", candidateDetails.domain);
            formData.append("git", candidateDetails.git);
            formData.append("linkedIn", candidateDetails.linkedIn);
            formData.append("phoneNumber", candidateDetails.phoneNumber);
            formData.append("place", candidateDetails.place);
            formData.append("portfolio", candidateDetails.portfolio);

            if (candidateDetails.profileImage) {
                formData.append("profileImage", candidateDetails.profileImage);
            }

            if (candidateDetails.resumeUrl) {
                formData.append("resumeUrl", candidateDetails.resumeUrl);
            }

            if (!candidateDetails.email.includes("@gmail.com")) {
                toast.warning("Please provide a valid Gmail address!");
                return;
            }

            try {
                const reqHeader = { "Content-Type": "multipart/form-data" };
                const result = await registerCandidateAPI(formData, reqHeader);
                console.log(result);
                if (result.status === 200) {
                    toast.success(`Welcome ${result.data.username}...Please Login to explore our website!!!`);
                    // setUserInputs({ username: "", email: "", password: "" });
                    if (Candidate) {
                        setTimeout(() => {
                            navigate('/login-Candidate');
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            navigate('/login-Recruiter');
                        }, 2000);
                    }

                } else {
                    toast.error(result.response.data);
                    setTimeout(() => {
                        // setUserInputs({ username: "", email: "", password: "" });
                    }, 2000);
                }
            } catch (err) {
                console.error(err);
            }

        } else {
            toast.warning("Please fill the form completely!!!");

        }
    };




    // *********************CompanyRegister*******************************************
    const [companyDetails, setCompanyDetails] = useState({
        username: "", email: "", password: "",
        companyName: "",
        aboutCompany: "",
        companyWebsite: "",
        linkedIn: "",
        companyLogo: "",
        location: "",
        domain: "",

    });
    console.log(companyDetails);

    useEffect(() => {
        if (companyDetails.companyLogo.type == "image/png" || companyDetails.companyLogo.type == "image/jpg" || companyDetails.companyLogo.type == "image/jpeg") {
            setImageFileStatus(true)
            setPreview(URL.createObjectURL(companyDetails.companyLogo))
        } else {
            setPreview(uploadImg)
            setImageFileStatus(false)
            setCompanyDetails({ ...companyDetails, companyLogo: "" })
        }
    }, [companyDetails.companyLogo])

    const handleCompanyRegister = async (e) => {
        e.preventDefault(); 
        const userType = Candidate ? "Candidate" : "Recruiter";

        if (companyDetails.username && companyDetails.email && companyDetails.password &&
            companyDetails.companyName && companyDetails.aboutCompany && companyDetails.companyWebsite &&
            companyDetails.linkedIn && companyDetails.companyLogo && companyDetails.location && companyDetails.domain
        ) {
            if (!companyDetails.email.includes("@gmail.com")) {
                toast.warning("Please provide a valid Gmail address!");
                return;
            }
            try {

                // Assuming companyDetails contains the necessary data for registration
                const formData = new FormData();
                formData.append("username", companyDetails.username);
                formData.append("email", companyDetails.email);
                formData.append("password", companyDetails.password);
                formData.append("type", userType);
                formData.append("auth", "Pending");
                formData.append("companyName", companyDetails.companyName);
                formData.append("aboutCompany", companyDetails.aboutCompany);
                formData.append("companyWebsite", companyDetails.companyWebsite);
                formData.append("linkedIn", companyDetails.linkedIn);
                formData.append("companyLogo", companyDetails.companyLogo);
                formData.append("location", companyDetails.location);
                formData.append("domain", companyDetails.domain);

                const reqHeader = { "Content-Type": "multipart/form-data" };

                const result = await companyRegisterAPI(formData, reqHeader);
                console.log(result);

                if (result && result.status === 200) {
                    console.log("Successful registration:", result.data.username);
                    toast.success(`Welcome ${result.data.username}...Please Login to explore our website!!!`);
                    if (Candidate) {
                        console.log("Redirecting to Candidate login...");
                        setTimeout(() => {
                            navigate('/login-Candidate');
                        }, 2000);
                    } else {
                        console.log("Redirecting to Recruiter login...");
                        setTimeout(() => {
                            navigate('/login-Recruiter');
                        }, 2000);
                    }
                } else {
                    toast.error(result.response.data);
                    setTimeout(() => {
                        // setUserInputs({ username: "", email: "", password: "" });
                    }, 2000);
                }
            } catch (error) {
                console.error("Error uploading company details:", error);
                toast.error("An error occurred while uploading company details. Please try again later.");
            }

        } else {
            toast.warning("Please provide all the fields !");
            return;
        }


    };
    // *********************CompanyRegister******************************************
    // **************************END*************************************************







    // const [forStudent, setForStudent] = useState(false);
    const [userInputs, setUserInputs] = useState({
        username: "", email: "", password: ""
    })
    console.log(userInputs);

    // useEffect(() => {
    //     if (Candidate) {
    //         setForStudent(true)
    //     } else {
    //         setForStudent(false)
    //     }
    // }, [Candidate])


    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     if (userInputs.username && userInputs.email && userInputs.password) {
    //         // Set type based on whether it's a Candidate or Recruiter
    //         const userType = Candidate ? "Candidate" : "Recruiter";
    //         const requestBody = {
    //             username: userInputs.username,
    //             email: userInputs.email,
    //             password: userInputs.password,
    //             type: userType,
    //             auth: "Pending"
    //         };

    //         // Make API call
    //         try {
    //             const result = await registerAPI(requestBody);
    //             console.log(result);
    //             if (result.status === 200) {
    //                 toast.success(`Welcome ${result.data.username}...Please Login to explore our website!!!`);
    //                 setUserInputs({ username: "", email: "", password: "" });
    //                 if (Candidate) {
    //                     setTimeout(() => {
    //                         navigate('/login-Candidate');
    //                     }, 2000);
    //                 } else {
    //                     setTimeout(() => {
    //                         navigate('/login-Recruiter');
    //                     }, 2000);
    //                 }

    //             } else {
    //                 toast.error(result.response.data);
    //                 setTimeout(() => {
    //                     setUserInputs({ username: "", email: "", password: "" });
    //                 }, 2000);
    //             }
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     } else {
    //         toast.warning("Please fill the form completely!!!");
    //     }
    // };



    const handleLogin = async (e) => {
        e.preventDefault()
        // Set type based on whether it's a Candidate or Recruiter
        const userType = Candidate ? "Candidate" : "Recruiter";
        const requestBody = {
            email: userInputs.email,
            password: userInputs.password,
            type: userType
        };
        if (requestBody.email && requestBody.password) {
            console.log(requestBody);

            // api call
            try {
                const result = await loginAPI(requestBody)
                console.log("result", result);
                if (result.status == 200) {
                    sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))

                    // sessionStorage.setItem("token",result.data.token)
                    toast.success(`Welcome ${result.data.existingUser.username}...`)
                    setUserInputs({ username: "", email: "", password: "" })
                    if (result.data.existingUser.type == "Recruiter") {
                        setTimeout(() => {
                            navigate('/dashboard-Recruiter');
                        }, 1000);
                    } else if (result.data.existingUser.type == "Candidate") {
                        setTimeout(() => {
                            navigate('/dashboard-Candidate');
                        }, 1000);
                    } else if (result.data.existingUser.type == "admin") {
                        setTimeout(() => {
                            navigate('/dashboard-Admin');
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            navigate('/dashboard-Candidate');
                        }, 1000);
                    }
                } else {
                    toast.error(result.response.data)
                }
            } catch (err) {
                console.log(err);
            }
        } else {

            toast.warning("Please fill the form completely!!!")
        }
    }




    return (
        <div style={{ width: "100%", height: insideRegister ? '100%' : '920px', backgroundImage: `url(${BgCandidateGIF})` }} className='d-flex justify-content-center align-items-center'>
            {/* <img src{BgC=andidateGIF} className="img-fluid" alt="Candidate Background" /> */}

            <div className="container w-75 mt-4">
                <Link to={'/'} style={{ textDecoration: 'none' }} className='fw-bolder text-danger mt-5'><i className='fa-solid fa-arrow-left'></i> Go Back</Link>
                <div className="card shadow p-5 mt-2" style={{ opacity: "0.97", background: "transparent", border: "1px" }}  >
                    <div className="row align-item-center">
                        <div className="col-lg-6">

                            {
                                insideRegister ?
                                    <div className='mt-3'>
                                        {Candidate ?
                                            <div>

                                                <label className="d-flex justify-content-center">
                                                    <input
                                                        onChange={(e) => setCandidateDetails({ ...candidateDetails, profileImage: e.target.files[0] })}
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                    />
                                                    <img style={{ height: "680px", width: "500px" }} className='img-fluid mt-5 mb-3' src={preview || uploadImg} alt="" />
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
                                            :
                                            <div>
                                                <label className='d-flex justify-content-center mt-5 my-5'>
                                                    <input
                                                        onChange={(e) => setCompanyDetails({ ...companyDetails, companyLogo: e.target.files[0] })}
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                    />
                                                    <img style={{ height: "680px" }} className='img-fluid' src={preview || uploadImg} alt="" />
                                                </label>
                                                {!imageFileStatus && (
                                                    <div className="text-danger my-2">
                                                        *Upload only following file types (png, jpg, jpeg) here !!!
                                                    </div>
                                                )}

                                            </div>


                                        }
                                    </div>
                                    :
                                    <div className='mt-3'>
                                        <div>

                                            <img className='w-100' src="https://img.freepik.com/free-vector/login-concept-illustration_114360-4525.jpg" alt="Auth" />
                                        </div>

                                    </div>

                            }


                        </div>
                        <div className="col-lg-6">
                            {/* <h1 className='d-flex'><strong><i class="fa-brands fa-docker"></i>TECH HIRE</strong></h1> */}
                            <h5 className="display-2 fw-bolder mt-5 text-light">Sign {insideRegister ? 'up' : 'in'} to Your Account</h5>
                            <Form>


                                {
                                    insideRegister ?
                                        <div className='mt-3'>
                                            {Candidate ?
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
                                                :
                                                <div> 

                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.username}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, username: e.target.value })
                                                            }
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='Recruiter Username'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.email}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, email: e.target.value })
                                                            }
                                                            type='email'
                                                            className="form-control"
                                                            placeholder='Recruiter Email'
                                                        />
                                                    </div>

                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.password}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, password: e.target.value })
                                                            }
                                                            type='password'
                                                            className="form-control"
                                                            placeholder='Password'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.companyName}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, companyName: e.target.value })
                                                            }
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='Company Name'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.domain}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, domain: e.target.value })
                                                            }
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='eg: IT Services and IT Consulting'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <textarea
                                                            value={companyDetails.aboutCompany}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, aboutCompany: e.target.value })
                                                            }
                                                            rows="5"
                                                            className="form-control"
                                                            placeholder='About the Company'
                                                        ></textarea>
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.companyWebsite}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, companyWebsite: e.target.value })
                                                            }
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='Company Website'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.linkedIn}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, linkedIn: e.target.value })
                                                            }
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='Company LinkedIn Profile'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            value={companyDetails.location}
                                                            onChange={(e) =>
                                                                setCompanyDetails({ ...companyDetails, location: e.target.value })
                                                            }
                                                            type='text'
                                                            className="form-control"
                                                            placeholder='Location'
                                                        />
                                                    </div>


                                                </div>
                                            }
                                        </div>
                                        :
                                        <div className='mt-3'>
                                            <div>

                                                <FloatingLabel
                                                    controlId="floatingInput"
                                                    label="Email address"
                                                    className="mb-3"
                                                >
                                                    <Form.Control type="email" value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} placeholder="name@example.com" />
                                                </FloatingLabel>

                                                <FloatingLabel controlId="floatingPassword" label="Password">
                                                    <Form.Control type="password" value={userInputs.password} onChange={e => setUserInputs({ ...userInputs, password: e.target.value })} placeholder="Password" />
                                                </FloatingLabel>

                                            </div>
                                            {/* {Candidate ?
                                                <p>New User? Click here to <Link className='text-info' to={"/signUp-Candidate"}>Register</Link> </p>
                                                :
                                                <p>New User? Click here to <Link className='text-info' to={"/signUp-Recruiter"}>Register</Link> </p>
                                            } */}
                                        </div>

                                }






                                {
                                    insideRegister ?
                                        <div className='mt-3'>
                                            {Candidate ?
                                                <div>
                                                    <button onClick={handleCandidateRegister} className='btn btn-primary mb-2' to={'/dashboard-Recruiter'}> Register</button>

                                                    <p>Already have an Account? Click here to <Link className='text-info' to={"/login-Candidate"}>Login</Link> </p>

                                                </div> :
                                                <div>
                                                    <button onClick={handleCompanyRegister} className='btn btn-primary mb-2'> Register</button>

                                                    <p>Already have an Account? Click here to <Link className='text-info' to={"/login-Recruiter"}>Login</Link> </p>

                                                </div>}
                                        </div>
                                        :
                                        <div className='mt-3 ms-4'>
                                            <button onClick={handleLogin} className='btn btn-primary mb-2 mt-5 ' >Login</button>
                                            {Candidate ?
                                                <p>New User? Click here to <Link className='text-info' to={"/signUp-Candidate"}>Register</Link> </p>
                                                :
                                                <p>New User? Click here to <Link className='text-info' to={"/signUp-Recruiter"}>Register</Link> </p>
                                            }
                                        </div>

                                }

                            </Form>

                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </div>
    )
}

export default Auth
