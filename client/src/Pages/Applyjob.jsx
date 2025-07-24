import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import NavBar from "../components/NavBar";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import kconvert from "k-convert";
import moment from "moment";
import JobCards from "../components/JobCards";
import Footer from "../components/Footer";

const Applyjob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const { jobs } = useContext(AppContext);

  const fetchJob = () => {
    const data = jobs.filter((job) => job._id === id);
    if (data.length !== 0) {
      setJobData(data[0]);
      console.log(data[0]);
    }
  };

  useEffect(() => {
    if (jobs.length) fetchJob();
  }, [id, jobs]);

  return jobData ? (
    <>
      <NavBar />
      <div className="px-4 sm:px-6 mt-15 sm:mt-17 md:mt-25">
        <div className="w-full max-w-[900px] bg-pink-50 border border-pink-200 rounded-xl px-6 sm:px-10 py-5 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <img
              src={assets.company_icon}
              alt="Company Logo"
              className="w-14 h-14 object-contain"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                {jobData.title}
              </h1>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-gray-600 text-sm mt-1">
                <div className="flex items-center gap-1">
                  <img src={assets.suitcase_icon} className="w-4 h-4" />
                  {jobData.companyId.name}
                </div>
                <div className="flex items-center gap-1">
                  <img src={assets.location_icon} className="w-4 h-4" />
                  {jobData.location}
                </div>
                <div className="flex items-center gap-1">
                  <img src={assets.person_icon} className="w-4 h-4" />
                  {jobData.level}
                </div>
                <div className="flex items-center gap-1">
                  <img src={assets.money_icon} className="w-4 h-4" />
                  CTC: {kconvert.convertTo(jobData.salary)}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
              Apply now
            </button>
            <p className="text-xs text-gray-500 mt-1">
              Posted {moment(jobData.date).fromNow()}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-[1200px] mx-auto">
          <div className="lg:w-2/3">
            <div className="text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Job description
              </h2>
              <div
                className="rich-text text-gray-700"
                dangerouslySetInnerHTML={{ __html: jobData.description }}
              />
            </div>

            <div className="mt-10 text-left">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm">
                Apply Now
              </button>
            </div>
          </div>

          {/* More Jobs - Right Side */}
          <div className="lg:w-1/3">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              More jobs from {jobData.companyId.name}
            </h2>
            <div className="space-y-4">
              {jobs
                .filter(
                  (job) =>
                    job._id !== jobData._id &&
                    job.companyId._id === jobData.companyId._id
                )
                .slice(0, 4)
                .map((job, index) => (
                  <JobCards key={index} job={job} />
                ))}
            </div>
          </div>
        </div>
      </div>
     <Footer/>
    </>
  ) : (
    <Loading />
  );
};

export default Applyjob;
