import React, { useEffect, useState } from "react";
// import { getAllHospitalRequests } from "../services/operations/authAPI";
import { useSelector } from "react-redux";

const HospitalDashboard = () => {
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const { user } =
    useSelector((state) => state.profile) || localStorage.getItem("user");

    console.log("Printing user in Hospital Dashboard: ", user);

    return (
      <div>
        <h2>Hospital Dashboard</h2>
        {user.Requested.length > 0 ? (
          user.Requested.map((request) => (
            <div key={request._id}>
              <p>Blood Group: {request.bloodGroup}</p>
              {/* Access other request properties as needed */}
            </div>
          ))
        ) : (
          <p>No requests found for this hospital.</p>
        )}
      </div>
    );
};

export default HospitalDashboard;
