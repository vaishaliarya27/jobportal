import React, { useRef } from 'react';
import { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext);

  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value
    });
    setIsSearched(true);
  };

  return (
    <div className="w-full px-4 mt-[60px]">
      {/* Hero Pink Box */}
      <div className="bg-gradient-to-r from-pink-300 to-pink-950 rounded-[16px] max-w-5xl mx-auto mt-24 px-6 py-10 text-white text-center">
        <h2 className="text-3xl font-bold mb-2">Over 10,000+ jobs to apply</h2>
        <p className="text-sm text-purple-200 mb-6">
          Your Next Big Career Move Starts Right Here – Explore The Best Job Opportunities<br />
          And Take The First Step Toward Your Future!
        </p>

        {/* Search Input Section */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-[12px] shadow-md px-4 py-3 gap-4 max-w-3xl mx-auto">
          {/* Job Title Input */}
          <div className="flex items-center flex-grow bg-white px-2 py-1 rounded-md border border-gray-300 w-full md:w-auto">
            <img src={assets.search_icon} alt="Search Icon" className="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="w-full text-sm text-black outline-none"
              ref={titleRef}
            />
          </div>

          {/* Location Input */}
          <div className="flex items-center flex-grow bg-white px-2 py-1 rounded-md border border-gray-300 w-full md:w-auto">
            <img src={assets.location_icon} alt="Location Icon" className="w-4 h-4 mr-2" />
            <input
              type="text"
              placeholder="Location"
              className="w-full text-sm text-black outline-none"
              ref={locationRef}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={onSearch}
            className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium"
          >
            Search
          </button>
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="w-full max-w-5xl mx-auto mt-6 p-4 md:p-6 border border-gray-300 shadow-md rounded-lg bg-white">
        <div className="flex justify-center flex-wrap items-center gap-6">
          <p className="font-medium whitespace-nowrap">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="Microsoft" />
          <img className="h-6" src={assets.accenture_logo} alt="Accenture" />
          <img className="h-6" src={assets.walmart_logo} alt="Walmart" />
          <img className="h-6" src={assets.samsung_logo} alt="Samsung" />
          <img className="h-6" src={assets.adobe_logo} alt="Adobe" />
          <img className="h-6" src={assets.amazon_logo} alt="Amazon" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
