import moment from "moment";
import React, { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Applications = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);
  return (
    <>
      <NavBar />
      <div className="container px-15 min-h-[65vh] 2xl:px-20 mx-auto mt-25">
        <h2 className="tex-xl font-semibold mt-20">Your Resume</h2>
        <div className="flex gap-2 mb-4 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="cursor-pointer bg-blue-100 text-blue-500 px-4 py-2 rounded-lg mr-2">Select Resume</p>
                <input id="resumeUpload" onChange={e => setResume(e.target.files[0])} accept='application/pdf' type='file' hidden />
                <img src={assets.profile_upload_icon} />
              </label>
              <button onClick={e=>setIsEdit(false)} className=" cursor-pointer bg-green-100 border border-green-400 rounded-lg px-4 py-2">save</button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href=""
              >
                {" "}
                Resume{" "}
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="cursor-pointer text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-ul font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b text-left">Company</th>
              <th className="py-3 px-4 border-b text-left">Job Title</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-3 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((Jobs,index)=> true ? (
              <tr>
                <td className="py-3 px-4 flex items-center gap-2 border-b">
                  <img className="w-8 h-8" src={Jobs.logo}/>
                  {Jobs.company}
                </td>
                <td className="py-2 px-4 border-b">{Jobs.title}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{Jobs.location}</td>
                <td className="py-2 px-4 border-b max-sm:hidden">{moment(Jobs.date).format("ll")}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`${Jobs.status === 'Accepted' ? 'bg-green-100' : Jobs.status === 'Rejected' ? 'bg-red-100' : 'bg-blue-100'} px-4 py-1.5 rounded `}> {Jobs.status} </span> 
                  </td>
    
              </tr>
            ) : (null))}
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default Applications;
