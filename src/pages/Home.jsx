import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BgRecruiter from '../assets/BG-Recruiter.jpg';
import BgCandidate from '../assets/BG-Candidate.png';
import BgCandidateGIF from '../assets/BG-Candidate-GIF.gif';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function Home() {
    const [forStudent, setForStudent] = useState(true);
    const [radioValue, setRadioValue] = useState('Candidate');
    const [userType, setUserType] = useState('Candidate');

    const handleUserTypeChange = (value) => {
        setUserType(value);
    };

    const radios = [
        { name: 'For Recruiter', value: 'Recruiter' },
        { name: 'For Candidate', value: 'Candidate' },
    ];

    useEffect(() => {
        console.log(radioValue);
        if (radioValue === "Candidate") {
            setForStudent(true);
        } else {
            setForStudent(false);
        }
    }, [radioValue]);

    return (
        <>
            <div className='row' style={{ position: 'relative' }}>
                {forStudent ?
                    <div className='row' style={{ backgroundColor: "rgb(83 85 118)", minHeight: window.innerHeight }}>
                        <div className='col'></div>
                        <div className='col'>

                            {/* <img src={BgCandidate} className="img-fluid" alt="Candidate Background" /> */}
                            <img style={{ marginTop: "15%", width: "100%-" }} src="https://cdn.dribbble.com/userupload/12500686/file/original-745551ffdfaabc820770650996891e08.gif" className="img-fluid" alt="Candidate Background" />


                        </div>

                    </div>
                    :

                    <div className='row' style={{ backgroundColor: "rgb(246 245 240)", minHeight: window.innerHeight }}>
                        <div className='col me-5'></div>
                        <div className='col'>

                            <img style={{ maxHeight: window.innerHeight, maxWidth: window.innerWidth, marginTop: "18%" }} src="https://cognizetech.weebly.com/uploads/1/4/2/9/142971466/recruiting-agencies-choose-the-right-talent_orig.png" className="img-fluid" alt="Candidate Background" />


                        </div>

                    </div>
                    // <img src={BgRecruiter} className='img-fluid' alt="Recruiter Background" />
                    // <img style={{ maxHeight: window.innerHeight, maxWidth: window.innerWidth }} src="https://cognizetech.weebly.com/uploads/1/4/2/9/142971466/recruiting-agencies-choose-the-right-talent_orig.png" className="img-fluid" alt="Candidate Background" />

                }
                <div className='col-6' style={{ position: 'absolute', top: '50%', left: '30%', transform: 'translate(-50%, -50%)' }}>
                    {forStudent ?
                        <h1 className='display-1 mb-5 text-light'><strong>TECH HIRE</strong></h1>
                        :
                        <h1 className='display-1 mb-5'><strong>TECH HIRE</strong></h1>

                    }
                    {forStudent ?
                        <div className='mb-5'>
                            <p className='text-light fw-bolder'>Step into the future of IT careers! Discover interview tips and resources tailored for <br /> success in the tech industry.Click 'For Candidate' and kickstart your journey today</p>
                        </div>
                        :
                        <div className='mb-5'>
                            <p className='text-black fw-bolder'>Empower your recruitment journey in the IT sector! Access a pool of top talent and <br></br> streamline your hiring process with our platform.<br></br> Click 'For Recruiter' to start connecting with the best candidates</p>
                        </div>
                    }
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? 'outline-warning' : 'outline-info-emphasis'}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                    {forStudent ?
                        <div className='mt-4'>
                            <Link to="/signUp-Candidate" className='me-5 text-light fw-bolder' style={{ textDecoration: 'none' }}> <i class="fa-solid fa-user-plus fa-beat-fade"> Sign Up</i></Link>

                            <Link to="/login-Candidate" className='ms-5 btn text-light fw-bolder' style={{ textDecoration: 'none' }}><i class="fa-solid fa-right-to-bracket fa-beat-fade"> Login </i> </Link>
                        </div>
                        :
                        <div className='mt-3'>
                            <Link to="/login-Recruiter" className='me-5 text-success-emphasis fw-bolder' style={{ textDecoration: 'none' }}><i class="fa-solid fa-right-to-bracket fa-beat-fade"> Login </i></Link>
                            <Link to="/signUp-Recruiter" className='ms-5 text-success-emphasis fw-bolder' style={{ textDecoration: 'none' }}><i class="fa-solid fa-user-plus fa-beat-fade"> Sign Up</i></Link>
                        </div>
                    }
                </div>

            </div>
        </>
    );
}

export default Home;
