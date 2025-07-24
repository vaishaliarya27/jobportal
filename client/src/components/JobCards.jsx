import React from 'react';
import { assets, jobsApplied } from '../assets/assets';
import {useNavigate, useParams} from 'react-router-dom'

const JobCards = ({ job }) => {

  const navigate = useNavigate()
  return (
    <div className='border p-6 shadow rounded'>
      <div className='flex justify-between items-center'>
        <img className='h-8' src={assets.company_icon} alt=""/>
      </div>
      <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
      <div className='flex items-center gap-3 mt-2  text-xs'>
        <span className='bg-pink-50 border border-pink-200 px-4 py-1.5 rounded'>{job.location}</span>
        <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
      </div>
      <p className='text-gray-600 text-sm mt-4' dangerouslySetInnerHTML={{__html:job.description.slice(0,150)}}></p>
      <div className='mt-4 flex gap-4 text-sm'>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='cursor-pointer bg-blue-600 text-white  px-4 py-2 rounded'>Apply now</button>
        <button onClick={()=>{navigate(`/apply-job/${job._id}`); scrollTo(0,0)}} className='cursor-pointer px-1.5 text-gray-600 py-2  border border-gray-500 rounded'>Learn more</button>
      </div>
    </div>
  );
};

export default JobCards;
