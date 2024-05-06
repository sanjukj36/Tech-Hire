import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImg from '../assets/upload.png';
import { candidateProfileAPI } from '../services/allAPI';
import { Button } from 'react-bootstrap';

function CandidateProfileForm({ displayName }) {
    const [preview, setPreview] = useState("");
    const [imageFileStatus, setImageFileStatus] = useState(false);
    const [candidateDetails, setCandidateDetails] = useState({
        profileImage: '',
        domain: '',
        aboutYou: '',
        phoneNumber: '',
        place: '',
        linkedIn: '',
        git: '',
        portfolio: '',
        resumeUrl: '',
        userId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null
    });
    console.log(candidateDetails);


    useEffect(() => {
        if (candidateDetails.profileImage.type == "image/png" || candidateDetails.profileImage.type == "image/jpg" || candidateDetails.profileImage.type == "image/jpeg") {
            setImageFileStatus(true)
            setPreview(URL.createObjectURL(candidateDetails.profileImage))
        } else {
            setPreview(uploadImg)
            setImageFileStatus(false)
            setCandidateDetails({ ...candidateDetails, profileImage: "" })
        }
    }, [candidateDetails.profileImage])


    const handleUploadProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("profileImage", candidateDetails.profileImage);
            formData.append("domain", candidateDetails.domain);
            formData.append("aboutYou", candidateDetails.aboutYou);
            formData.append("phoneNumber", candidateDetails.phoneNumber);
            formData.append("place", candidateDetails.place);
            formData.append("linkedIn", candidateDetails.linkedIn);
            formData.append("git", candidateDetails.git);
            formData.append("portfolio", candidateDetails.portfolio);
            formData.append("resumeUrl", candidateDetails.resumeUrl);
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
                    profileImage: '',
                    domain: '',
                    aboutYou: '',
                    phoneNumber: '',
                    place: '',
                    linkedIn: '',
                    git: '',
                    portfolio: '',
                    resumeUrl: '',
                    userId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null,
                    email:sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).email : null,
                    password:sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).password : null,
                    username:sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).username : null
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



    return (
        <div className='container p-5'>
            <h1>Welcome {displayName},</h1>
            <p>{displayName} successfully logged in, But we need additional information about you to create your profile.</p>
            <div className="row">
                <div className="col-lg-4">
                    <label>
                        <input
                            onChange={(e) => setCandidateDetails({ ...candidateDetails, profileImage: e.target.files[0] })}
                            type="file"
                            style={{ display: 'none' }}
                        />
                        <img height={'200px'} className='img-fluid' src={preview || uploadImg} alt="" />
                    </label>
                    {!imageFileStatus && (
                        <div className="text-danger my-2">
                            *Upload only following file types (png, jpg, jpeg) here !!!
                        </div>
                    )}
                </div>
                <div className="col-lg-8">
                <div className="mb-2">
                        <textarea
                            value={candidateDetails.aboutYou}
                            onChange={(e) =>
                                setCandidateDetails({ ...candidateDetails, aboutYou: e.target.value })
                            }
                            rows="5"
                            className="form-control"
                            placeholder='About You'
                        ></textarea>
                    </div>
                    <div className="mb-2">
                        <input
                            value={candidateDetails.domain}
                            onChange={(e) =>
                                setCandidateDetails({ ...candidateDetails, domain: e.target.value })
                            }
                            type='text'
                            className="form-control"
                            placeholder='Your Domain'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={candidateDetails.phoneNumber}
                            onChange={(e) =>
                                setCandidateDetails({ ...candidateDetails, phoneNumber: e.target.value })
                            }
                            type='tel'
                            className="form-control"
                            placeholder='Your Number'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={candidateDetails.place}
                            onChange={(e) =>
                                setCandidateDetails({ ...candidateDetails, place: e.target.value })
                            }
                            type='text'
                            className="form-control"
                            placeholder='Your Current Place'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={candidateDetails.linkedIn}
                            onChange={(e) =>
                                setCandidateDetails({ ...candidateDetails, linkedIn: e.target.value })
                            }
                            type='text'
                            className="form-control"
                            placeholder='Your LinkedIn Profile'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={candidateDetails.git}
                            onChange={(e) =>
                                setCandidateDetails({ ...candidateDetails, git: e.target.value })
                            }
                            type='text'
                            className="form-control"
                            placeholder='Your Git Profile Link'
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            value={candidateDetails.portfolio}
                            onChange={(e) =>
                                setCandidateDetails({ ...candidateDetails, portfolio: e.target.value })
                            }
                            type='text'
                            className="form-control"
                            placeholder='Your portfolio Website Link (Not mandatory)'
                        />
                    </div>
                    
                    {/* <div className="form-group">
                        <label htmlFor="resumeUrl">Resume</label>
                        <input type="file" className="form-control-file" id="resumeUrl" name="resumeUrl"/>
                    </div> */}
                    <div className="form-group mt-4">
                        <label htmlFor="resumeUrl">Resume</label>
                        <input onChange={(e) => setCandidateDetails({ ...candidateDetails, resumeUrl: e.target.files[0] })} type="file" className="form-control-file" id="resumeUrl" name="resumeUrl"/>
                    </div>
                    
                    
                </div>
            </div>
            <Button
                onClick={handleUploadProfile}
                style={{ backgroundColor: '#60eb60', color: 'white', border: 'none', marginTop: '20px' }}
                variant="primary"
            >
                Upload
            </Button>

            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </div>
    );
}

export default CandidateProfileForm;
