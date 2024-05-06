import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import RecruiterDashboard from './pages/RecruiterDashboard'
import CandidateDashboard from './pages/CandidateDashboard'
import AdminDashboard from './pages/AdminDashboard'

function App() {

  return (

    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login-Recruiter' element={<Auth />}/>
    <Route path='/signUp-Recruiter' element={<Auth insideRegister/>}/>
    <Route path='/login-Candidate' element={<Auth Candidate/>}/>
    <Route path='/signUp-Candidate' element={<Auth Candidate insideRegister/>}/>

    <Route path='/dashboard-Recruiter' element={<RecruiterDashboard/>}/>
    <Route path='/dashboard-Candidate' element={<CandidateDashboard/>}/>
    <Route path='/dashboard-Admin' element={<AdminDashboard/>}/>



    {/* <Route path='/*' element={<Navigate to={'/'}/>}/> */}
  </Routes>
  )
}

export default App
