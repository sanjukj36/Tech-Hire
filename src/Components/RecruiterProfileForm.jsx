import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import uploadImg from '../assets/upload.png';
import { recruiterProfileAPI } from '../services/allAPI';
import { Link, useNavigate } from 'react-router-dom'
// import { recruiterProfileAPI } from 'path-to-your-api-file';

function RecruiterProfileForm({ displayName }) {
    const navigate = useNavigate()
    const [preview, setPreview] = useState("");
    const [imageFileStatus, setImageFileStatus] = useState(false);
    const [companyDetails, setCompanyDetails] = useState({
        companyName: "",
        aboutCompany: "",
        companyWebsite: "",
        linkedIn: "",
        companyLogo: "",
        location:"",
        domain:"",
        userId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null

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

    const handleUploadCompany = async () => {
        try {
            const formData = new FormData();
            formData.append("companyName", companyDetails.companyName);
            formData.append("aboutCompany", companyDetails.aboutCompany);
            formData.append("companyWebsite", companyDetails.companyWebsite);
            formData.append("linkedIn", companyDetails.linkedIn);
            formData.append("companyLogo", companyDetails.companyLogo); 
            formData.append("location", companyDetails.location);
            formData.append("domain", companyDetails.domain);
            formData.append("userId", companyDetails.userId); // Include userId in FormData

            const reqHeader = {
                "Content-Type" : "multipart/form-data",
              }

            const result = await recruiterProfileAPI(formData,reqHeader);
            console.log(result);
            if(result.status==200){
                sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
                toast.success(`Welcome ${result.data.username}... Explore our website!!!`)
                window.location.reload();                
                setTimeout(()=>{
                  navigate('/dashboard-Recruiter')
                },1000);
              }else{
                toast.error(result.response.data)
                setCompanyDetails({
                    companyName: "",
                    aboutCompany: "",
                    companyWebsite: "",
                    linkedIn: "",
                    companyLogo: "", 
                    location:"",
                    domain:"",
                    userId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null
                });
                setTimeout(()=>{
                 
                },2000);
              }
            // Handle success or error response
        } catch (error) {
            console.error("Error uploading company details:", error);
            toast.error("An error occurred while uploading company details. Please try again later.");
        }
    };


    return (
        <div className='container p-5'>

            <h1>Welcome {displayName},</h1>
            <p>{displayName} successfully logged, but we need additional information about your Company</p>
            <p>Please Fill the Form</p>
            <div className="row">
                <div className="col-lg-4">
                    <label>
                        <input
                            onChange={(e) => setCompanyDetails({ ...companyDetails, companyLogo: e.target.files[0] })}
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
            </div>
            <Button
                onClick={handleUploadCompany}
                style={{ backgroundColor: '#60eb60', color: 'white', border: 'none', marginTop: '20px' }}
                variant="primary"
            >
                Upload
            </Button>
            <ToastContainer position='top-center' theme='colored' autoClose={3000} />
        </div>
    );
}

export default RecruiterProfileForm;
