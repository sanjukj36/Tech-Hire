import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jobCardCreateAPI } from '../services/allAPI';


function JobCreateForm() {
    const navigate = useNavigate()
    const [jobDetails, setJobDetails] = useState({
        title: "", experience: "", location: "", jobMode: "", qualification: "", salary: "", jobDescription: "",
        companyName: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).companyName : null,
        recruiterId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null
    })
    console.log(jobDetails);


    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setJobDetails({
            title: "", experience: "", location: "", jobMode: "", qualification: "", salary: "", jobDescription: "",
            companyName: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).companyName : null,
            recruiterId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null
        })
    };

    const handleJobCard = async () => {
        if (!jobDetails.companyName || !jobDetails.recruiterId) {
            // toast.danger(`Some thing wrong Login again please`)
            setTimeout(() => {
                navigate('/login-Recruiter')
            }, 1000);
        } else if (!jobDetails.title || !jobDetails.experience || !jobDetails.location || !jobDetails.jobMode || !jobDetails.jobDescription) {
            toast.warning(`Fill the form completely`)
        } else {
            try {
                const reqBody = new FormData();
                reqBody.append("title", jobDetails.title);
                reqBody.append("experience", jobDetails.experience);
                reqBody.append("location", jobDetails.location);
                reqBody.append("jobMode", jobDetails.jobMode);
                reqBody.append("qualification", jobDetails.qualification);
                reqBody.append("salary", jobDetails.salary);
                reqBody.append("jobDescription", jobDetails.jobDescription);
                reqBody.append("companyName", jobDetails.companyName);
                reqBody.append("recruiterId", jobDetails.recruiterId);


                const result = await jobCardCreateAPI(reqBody);
                console.log(result);
                if (result.status == 200) {
                    toast.success(`Success Full Created ${jobDetails.title}`)
                    handleClose()
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                } else {
                    toast.error(result.response.data)
                    setJobDetails({
                        title: "", experience: "", location: "", jobMode: "", qualification: "", salary: "", jobDescription: "",
                        companyName: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).companyName : null,
                        recruiterId: sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null
                    });
                }
                // Handle success or error response
            } catch (error) {
                console.error("Error uploading:", error);
                toast.error("An error occurred while uploading job details. Please try again later.");
            }

        }

    }



    const handleShow = () => {
        const auth = JSON.parse(sessionStorage.getItem('existingUser')).auth
        if (auth == "Approved") {
            setShow(true)
        }else{
            toast.warning("Sorry, your account is currently undergoing the verification process. If you have any urgent matters, you can contact the admin.");
            toast.warning(`Your account status is ${auth}`);
        };
    }
    return (
        <>
            <button className="btn btn-primary ms-5" onClick={handleShow}>+ New Job</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Job Posts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Job title</Form.Label>
                            <Form.Control
                                value={jobDetails.title}
                                onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })}
                                type="text"
                                placeholder="Domain"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Experience</Form.Label>
                            <Form.Control
                                value={jobDetails.experience}
                                onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })}
                                type="text"
                                placeholder="eg: fresher/6-month/1-year"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                value={jobDetails.location}
                                onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })}
                                type="text"
                                placeholder=""
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Mode of Job</Form.Label>
                            <Form.Control
                                value={jobDetails.jobMode}
                                onChange={(e) => setJobDetails({ ...jobDetails, jobMode: e.target.value })}
                                type="text"
                                placeholder="eg: Office / Work from Office"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Qualification </Form.Label>
                            <Form.Control
                                value={jobDetails.qualification}
                                onChange={(e) => setJobDetails({ ...jobDetails, qualification: e.target.value })}
                                type="text"
                                placeholder=""
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Salary Range</Form.Label>
                            <Form.Control
                                value={jobDetails.salary}
                                onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })}
                                type="text"
                                placeholder="eg: 25000-30000"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Job description</Form.Label>
                            <Form.Control as="textarea" rows={10}
                                value={jobDetails.jobDescription}
                                onChange={(e) => setJobDetails({ ...jobDetails, jobDescription: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary text-dark" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleJobCard}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />
        </>
    )
}

export default JobCreateForm
