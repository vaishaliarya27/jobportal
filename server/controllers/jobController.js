import Job from "../models/job.js"




// get all jobs for a company
export const getJobs = async (req, res) => {

  try {
    const jobs = await Job.findOne({visible: true})
     .populate({ path:'companyId', select: '-password' });
    
    
    res.json({success: true, jobs});
  } catch (error) {

    res.json({success: false, message: error.message});
    
  }

}


// get a single job by id
export const getJobById = async (req, res) => {

  try {

    const {id}= req.params;

    const job = await Job.findById(id)
    .populate({ 
      path: 'companyId', 
      select: '-password' });

      if (!job) {
        return res.json({success: false, message: 'Job not found'});
      }

      res.json({success: true, job});
    
  } catch (error) {

    res.json({success: false, message: error.message});
    
  }



}