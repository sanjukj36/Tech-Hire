import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { applyJobAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModelJobCard(props) {
    const { job } = props; // Destructuring the job prop from props

    const handleApplyJob = async () => {
        const reqBody = {
            "jobId": job._id,
            "jobTitle": job.title,
            "company": job.companyName,
            "status": "Applied",

            "candidateId": sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser'))._id : null,
            "candidateName": sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).username : null,
            "candidateNumber": sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).phoneNumber : null,
            "candidateEmail": sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).email : null,
            "resumeUrl": sessionStorage.getItem('existingUser') ? JSON.parse(sessionStorage.getItem('existingUser')).resumeUrl : null,

            "recruiterId": job.recruiterId
        }

        console.log(reqBody);
        const result = await applyJobAPI(reqBody)
        console.log("vcv", result);
        if (result.status == 200) {
            toast.success(`Applied Successfully...`);
            setTimeout(() => {
                props.onHide()
                window.location.reload();
            }, 2000);
        }
        if (result.response.status == 401) {
            console.log("cccc", result.response.data);
            toast.warning(`Alertly Applied...`);
            setTimeout(() => {
                props.onHide()
            }, 2000);


        }


    }
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Job Opportunity for {job.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col xs={12} md={7}>
                            <div className="details">
                                <p>Location: {job.location}</p>
                                <p>Mode: {job.jobMode}</p>
                                <p>Domain Experience: {job.experience}</p>
                            </div>
                        </Col>
                        <Col xs={6} md={5}>
                            <div className='text-info '> <h2>{job.companyName}</h2></div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={12} md={7}>
                            Qualification: {job.qualification}
                        </Col>
                        <Col xs={6} md={5}>
                            Salary: {job.salary}
                        </Col>

                    </Row>
                    <Row>
                        <Col className='mt-2'>
                            {job.jobDescription}
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleApplyJob} variant="success">Apply</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
            <ToastContainer position='top-center' theme='colored' autoClose={2000} />

        </Modal>
    );
}

export default ModelJobCard;
