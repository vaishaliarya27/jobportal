import React from 'react';
import { assets, viewApplicationsPageData } from '../assets/assets';

const ViewApplications = () => {
  return (
    <div className="container mx-auto p-4">
    <div>
      <table className="w-full max-w-4xl bg-white border border-gray-300 border-collapse max-sm:text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
            <th className="border border-gray-300 px-4 py-2 text-left">User name</th>
            <th className="border border-gray-300 px-4 py-2 text-left max-sm:hidden">Job title</th>
            <th className="border border-gray-300 px-4 py-2 text-left max-sm:hidden">Location</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Resume</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {viewApplicationsPageData.map((applicant, index) => (
            <tr key={index} className="text-gray-700">
              <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full max-sm:hidden"
                  src={applicant.imgSrc}
                  alt=""
                />
                <span>{applicant.name}</span>
              </td>
              <td className="border border-gray-300 px-4 py-2 max-sm:hidden">
                {applicant.jobTitle}
              </td>
              <td className="border border-gray-300 px-4 py-2 max-sm:hidden">
                {applicant.location}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <a
                  href=""
                  target="_blank"
                  className="bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex items-center gap-1"
                >
                  Resume <img src={assets.resume_download_icon} alt="" />
                </a>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="relative inline-block text-left group">
                  <button className="text-gray-500 action-button">...</button>
                  <div className="z-10 absolute hidden right-0 group-hover:block mt-[-2] w-32 bg-white border border-gray-200 rounded shadow">
                    <button className="w-full text-left py-2 px-4 text-blue-500 hover:bg-gray-100">Accept</button>
                    <button className="w-full text-left py-2 px-4 text-red-500 hover:bg-gray-100">Reject</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default ViewApplications;