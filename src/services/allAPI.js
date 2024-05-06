import { commonAPI } from "./commonAPI";
import { SERVER_URL } from "./serverUrl";

// Register api - called by authentication component
export const registerAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// registerCandidateAPI
export const registerCandidateAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/register-candidate`,reqBody,reqHeader)
}

// registerCandidateAPI
export const companyRegisterAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/register-company`,reqBody,reqHeader)
}

// Login api - called by authentication component
export const loginAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// JobCardCreate
export const jobCardCreateAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/job-card`,reqBody)
}

// 
export const applyJobAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/apply-job`,reqBody)
}

// candidateProfile
export const candidateProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/candidateProfile`, reqBody, reqHeader);
}
// 
export const jobStatusUpdateAPI = async (reqBody) =>{
    return await commonAPI("PUT",`${SERVER_URL}/jobStatusUpdate`,reqBody)
}

// recruiterProfile
export const recruiterProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/recruiterProfile`, reqBody, reqHeader); 
}


export const userAuthUpdateAPI = async (reqBody) =>{
    return await commonAPI("PUT",`${SERVER_URL}/userAuthUpdate`,reqBody)
}
// profileStatus
// export const profileStatusAPI = async (user_id,reqHeader) => {
//     return await commonAPI("GET", `${SERVER_URL}/profileStatus?userId=${user_id}`,reqHeader); 
// }

export const profileStatusAPI = async (user_id) => {
    return await commonAPI("GET", `${SERVER_URL}/profileStatus?userId=${user_id}`); 
}

export const jobShowAPI = async (recruiterId) => {
    return await commonAPI("GET", `${SERVER_URL}/job-card-user-show?userId=${recruiterId}`); 
}

export const jobShowCandidateAPI = async () => {
    return await commonAPI("GET", `${SERVER_URL}/job-card-show`); 
}

export const getJobTrackerAPI = async (candidateId) => {
    return await commonAPI("GET", `${SERVER_URL}/job-tracker-candidate?userId=${candidateId}`); 
}

export const getJobTrackerRecruiterAPI = async (jobId) => {
    return await commonAPI("GET", `${SERVER_URL}/job-tracker-recruiter?jobId=${jobId}`); 
}


export const getAllUserByTypeAPI = async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/getAllUserByType`,reqBody)
}


