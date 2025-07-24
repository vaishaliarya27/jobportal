import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Applications from './Pages/Applications';
import Applyjob from './Pages/Applyjob';
import Home from './Pages/Home';
import RecruiterLogin from './components/RecruiterLogin';
import { AppContext } from './context/AppContext';
import Dashboard from './Pages/Dashboard';
import AddJobs from './Pages/AddJobs';
import ManageJobs from './Pages/ManageJobs';
import ViewApplications from './Pages/ViewApplications';
import 'quill/dist/quill.snow.css'

const App = () => {

const {showRecruiterLogin} = useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path= '/' element={<Home/>}/>
        <Route path= '/applications' element={<Applications/>}/>
        <Route path= '/apply-job/:id' element={<Applyjob/>}/>
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='add-jobs' element={<AddJobs/>} />
          <Route path='manage-jobs' element={<ManageJobs/>} />
          <Route path='view-applications' element={<ViewApplications/>} />

        </Route>
      </Routes>
    </div>
  );
};

export default App;
