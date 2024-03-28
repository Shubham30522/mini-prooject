import React from "react";
import { useForm } from "react-hook-form";
import { createRequest } from "../services/operations/authAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import authSlice from '../slices/authSlice';
import {toast} from "react-hot-toast";
import { setUser } from "../slices/profileSlice";

function Addrequest() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const requestSubmitHandler = async (requestData) => {
    const updatedRequestData = {
      ...requestData,
      token,
    };
    console.log(updatedRequestData);
    const requestResponse = await createRequest(updatedRequestData);
    console.log("Printing new request response in add request handler: ", requestResponse);
    // setUser(requestResponse.)
    if (requestResponse.data.success) {
      navigate("/HospitalDashboard");
      toast.success("Request Added Successfully");
    }
    else{
      toast.error(requestResponse.response.data.message);
    }
  };
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="relative flex m-auto justify-center items-center">
      <div className="w-[1100px] absolute flex m-auto justify-center items-center ">
        <div className="w-[600px] h-[300px] bg-yellow-400 bg-opacity-5 rounded-3xl">
          <form onSubmit={handleSubmit(requestSubmitHandler)}>
            <div className="m-auto justify-center flex text-xl text-green-500">
              Add Request For Blood
            </div>

            <div className="flex flex-col gap-6 mt-[70px]">
              <div className="flex gap-2">
                <label className="ml-[110px] ">Hospital Name:</label>
                <input type="text" {...register("name")} required />
              </div>
              <div className="flex gap-2">
                <label className="ml-[57px]">Required Blood Group:</label>
                <input type="text" {...register("bloodGroup")} required />
              </div>
              <div className="flex gap-2">
                <label className="ml-[57px]">Minimum Time Period:</label>
                <input type="Date" {...register("time")} required />
              </div>
              <button className="mt-3 w-[70px] h-[40px] bg-blue-400 text-white rounded-lg m-auto">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <img
        className="w-screen h-[550px] mt-2 "
        src="../second-icons/addrequest.jpg"
        alt=""
      />
    </div>
  );
}

export default Addrequest;
