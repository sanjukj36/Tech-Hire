import React, { useEffect, useState } from 'react';
import CandidateProfileForm from '../Components/CandidateProfileForm';
import { profileStatusAPI } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import CandidateLeftSideProfile from '../Components/CandidateLeftSideProfile';
import JobCardCandidateShow from '../Components/JobCardCandidateShow';
import TableJobTrackerCandidate from '../Components/TableJobTrackerCandidate';
import CandidateProfileUpdate from '../Components/CandidateProfileUpdate';



function CandidateDashboard() {
  const navigate = useNavigate()

  const [profile, setProfile] = useState(true)

  const [displayName, setDisplayName] = useState("")


  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const { username } = JSON.parse(sessionStorage.getItem("existingUser"))
      setDisplayName(username)
    } else {
      setDisplayName("")
    }
  })

  const [candidateDetails, setCandidateDetails] = useState("")
  console.log(candidateDetails);

  useEffect(() => {
    profileStatus()

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
        setCandidateDetails(result.data.candidateDetails)
        if (!result.data.candidateDetails.aboutYou) {
          setProfile(false)
        } else {
          setProfile(true)
        }
        setTimeout(() => {
          navigate('/dashboard-Candidate')
        }, 1000);

      } else {
        // setProfile(false); // Uncomment this line if you have a function to set profile status to false
      }
    } catch (error) {
      console.error("Error checking profile status:", error);
      toast.error("An error occurred while checking profile status. Please try again later.");
    }
  }

  // ********************************************************
 

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const { username } = JSON.parse(sessionStorage.getItem("existingUser"))
      setDisplayName(username)
    } else {
      setDisplayName("")
    }
  })



  // *************************************************************************************

  const handleUpdateProfile = () => {
    setProfile(false)

};

  return (
    <>
      {profile ?

        <div className=" ps-4 mt-5">
          <div className=" row">

            {/* Candidate Profile */}
            <div className="con col-md-2 card pt-4 pb-3">
              <CandidateLeftSideProfile candidateDetails={candidateDetails} handleUpdateProfile={handleUpdateProfile}/>
              
            </div>

            {/* Job Search Form */}
            <div className="col-md-5 mb-5 ">
              {/* <h3>Job Search</h3> */}
              {/* <form onSubmit={handleJobSearch}>
              <input type="text" className="form-control mb-2" placeholder="Keywords" value={jobSearchCriteria.keywords} onChange={(e) => setJobSearchCriteria({ ...jobSearchCriteria, keywords: e.target.value })} />
              <input type="text" className="form-control mb-2" placeholder="Location" value={jobSearchCriteria.location} onChange={(e) => setJobSearchCriteria({ ...jobSearchCriteria, location: e.target.value })} />
              <input type="text" className="form-control mb-2" placeholder="Technology" value={jobSearchCriteria.technology} onChange={(e) => setJobSearchCriteria({ ...jobSearchCriteria, technology: e.target.value })} />
              <input type="text" className="form-control mb-2" placeholder="Experience Level" value={jobSearchCriteria.experienceLevel} onChange={(e) => setJobSearchCriteria({ ...jobSearchCriteria, experienceLevel: e.target.value })} />
              <button type="submit" className="btn btn-primary">Search</button>
            </form> */}

            <JobCardCandidateShow/> 

            </div>

            {/* Application Management */}
            <div className="col-md-5 mb-5">
              <h2>Application Tracker</h2>

              <TableJobTrackerCandidate/>

              
            </div>

          </div>
        </div>
        :
        <div>
          {/* <CandidateProfileForm displayName={displayName} /> */}
          <CandidateProfileUpdate displayName={displayName} candidateDetails={candidateDetails} />
        </div>
      }
      <ToastContainer position='top-center' theme='colored' autoClose={2000} />

    </>
  );
}

export default CandidateDashboard;
