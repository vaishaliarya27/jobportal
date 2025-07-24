import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import JobCards from "./JobCards";

const Joblisting = () => {
  const { isSearched, searchFilter, setSearchFilter, jobs } =
    useContext(AppContext);
  const [showfilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((c) => c !== location)
        : [...prev, location]
    );
  };

  useEffect(() => {
    const matchesCategory = (job) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(job.category);

    const matchesLocation = (job) =>
      selectedLocations.length === 0 ||
      selectedLocations.includes(job.location);

    const matchesTitle = (job) =>
      searchFilter.title === "" ||
      job.title.toLowerCase().includes(searchFilter.title.toLowerCase());

    const matchesSearchLocation = (job) =>
      searchFilter.location === "" ||
      job.location.toLowerCase().includes(searchFilter.location.toLowerCase());

    const newFilteredJobs = jobs
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );

    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);
  }, [jobs, selectedCategories, selectedLocations, searchFilter]);

  return (
    <div className="container mx-auto px-4 2xl:px-20 lg:pl-32 py-6 text-xs flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 lg:gap-x-10 text-gray-700">
      {/* sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* search filter from Hero component */}
        {isSearched &&
          (searchFilter.title !== "" || searchFilter.location !== "") && (
            <>
              <h3 className="fonr-medium text-lg mb-1.5"> Current search </h3>
              <div className="flex gap-1 flex-wrap items-center">
                {searchFilter.title && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 px-4 py-1 rounded">
                    {searchFilter.title}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, title: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                    />
                  </span>
                )}

                {searchFilter.location && (
                  <span className="inline-flex items-center gap-1 bg-red-50 border border-red-200 px-4 py-1 rounded">
                    {searchFilter.location}
                    <img
                      onClick={(e) =>
                        setSearchFilter((prev) => ({ ...prev, location: "" }))
                      }
                      className="cursor-pointer"
                      src={assets.cross_icon}
                    />
                  </span>
                )}
              </div>
            </>
          )}

        <button
          onClick={(e) => setShowFilter((prev) => !prev)}
          className="px-6 py-1.5 rounded border border-gray-400 lg:hidden"
        >
          {showfilter ? "Close" : "Filter"}
        </button>
        {/* category filter*/}
        <div className={showfilter ? "" : "max-lg:hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-grey-600  ">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />

                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Loaction filter*/}
        <div className="max-lg:hidden">
          <h4 className="font-medium text-lg py-4 pt-11">Search by Location</h4>
          <ul className="space-y-4 text-grey-600  ">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/*job listings*/}
      <section className="w-full lg:w-3/4 text-grey-800 max-lg: px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCards key={job} job={job} />
            ))}
        </div>
        {/* pagination */}

        {jobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <a href="#job-list">
              <img
                onClick={() => setCurrentPage(Math.max(currentPage - 1), 1)}
                src={assets.left_arrow_icon}
                alt="Left"
                className="w-6 h-6 mt-1"
              />
            </a>

            {Array.from({ length: Math.ceil(jobs.length / 6) }).map(
              (_, index) => (
                <a key={index} href="#job-list">
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={`cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded text-sm ${
                      currentPage === index + 1
                        ? "bg-pink-100 text-pink-600"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                </a>
              )
            )}

            <a href="#job-list">
              <img
                onClick={() =>
                  setCurrentPage(
                    Math.min(currentPage + 1, Math.ceil(jobs.length / 6))
                  )
                }
                src={assets.right_arrow_icon}
                alt="Right"
                className="w-6 h-6 mt-1"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};

export default Joblisting;
