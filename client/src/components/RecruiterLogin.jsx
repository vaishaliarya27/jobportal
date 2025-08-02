import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const RecruiterLogin = () => {


  const navigate = useNavigate();
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(false);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const {setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sign Up" && !isTextDataSubmitted) {
      return setIsTextDataSubmitted(true);
      return;
    }


    try {

      if (state ==="Login") {

        const {data} = await axios.post(backendUrl + '/api/company/login', {email,password})

        if( data.success) {
          setCompanyToken(data.token);
          setCompanyData(data.company);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
    
        }
        else{
          toast.error(data.message);
        }
        
      }


      else {
         const formData = new FormData();
         formData.append('name', name);
         formData.append('email', email);
         formData.append('password', password);
         formData.append('image', image);

         const {data} = await axios.post(backendUrl + '/api/company/register', formData)

         if (data.success) {
          setCompanyToken(data.token);
          setCompanyData(data.company);
          localStorage.setItem('companyToken', data.token);
          setShowRecruiterLogin(false);
          navigate('/dashboard');
         }
         else {
          toast.error(data.message);
         }
      }
      
    } catch (error) {
      toast.error(error.message);
      
    }


  }
  

    if (state === "Login") {
      console.log("Logging in with", { email, password });
    } else {
      console.log("Creating account with", { name, email, password });
    }
  

  useEffect(()=> {
   document.body.style.overflow = 'hidden'

   return ()=> {
    document.body.style.overflow = 'unset'
   }

  },[])

  return (
    <div className="fixed inset-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500 z-20 w-[90%] max-w-md"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm mb-4">Welcome back! Please sign in to continue</p>

        {state === "Sign Up" && isTextDataSubmitted ? <>

        <div className="flex items-center gap-4 my-3">
          <label htmlFor="image">
            <img className="w-16 rounded-full" src={image ? URL.createObjectURL(image) : assets.upload_area}/>
            <input onChange={e=> setImage(e.target.files[0])} type="file" id='image' hidden/>
          </label>
          <p>
            Upload Company <br/> logo
          </p>
        </div>
        </> 
          :<>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-3">
                <img src={assets.person_icon} alt="person" />
                <input
                  className="outline-none text-sm w-full"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  placeholder="Company Name"
                  required
                />
              </div>
            )}

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-3">
              <img src={assets.email_icon} alt="email" />
              <input
                className="outline-none text-sm w-full"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email Id"
                required
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-3">
              <img src={assets.lock_icon} alt="lock" />
              <input
                className="outline-none text-sm w-full"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
              />
            </div>
          </>
        }

        {state === 'Login' && <p className="text-sm text-blue-600 mt-4 cursor-pointer">
          Forgot Password?
        </p>}

        <button
          type="submit"
          className="bg-blue-600 w-full text-white py-2 rounded-full mt-4"
        >
          {state === "Login"
            ? "Login"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => {
                setState("Sign Up");
                setIsTextDataSubmitted(false);
              }}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="cursor-pointer text-blue-600"
              onClick={() => {
                setState("Login");
                setIsTextDataSubmitted(false);
              }}
            >
              Login
            </span>
          </p>
        )}

        <img onClick={e => setShowRecruiterLogin (false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
