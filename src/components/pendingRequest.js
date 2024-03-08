// import { response } from "express";
import React, { useEffect, useState } from "react";

const PendingRequest = () => {
  const [allReq, setallReq] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:4000/request/getAllPendingRequest"
      );
      const data = await response.json();
      setallReq(data.requests);
    } catch (error) {
      console.log(
        "Error occurred while fetching requests from the database in PendingRequest.js file",
        error
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div>
        {allReq.length === 0 ? (
          <span className="loader"></span>
        ) : (
          allReq.map((req) => {
            return (
              <>
                <div
                  key={req._id}
                  className="flex bg-slate-500 mt-1"
                >
                  <p>Hospital Name: {req.Hospital_id.hospitalName}</p>
                  <p>Blood Group: {req.bloodGroup}</p>
                </div>
                <button onClick={() => console.log(req.bloodGroup)}>Click Here</button>
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PendingRequest;
