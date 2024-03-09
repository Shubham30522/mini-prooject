import React, { useEffect, useState } from "react";
import { getAllHospitalRequests } from "../services/operations/authAPI";
import { useSelector } from "react-redux";

const HospitalDashboard = () => {
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const { user } = useSelector((state) => state.profile);

  async function fetchAllRequestOfHospital() {
    try {
      console.log("Printing user's id in hospital Dashboard:", user._id);
      let hospitalId = user._id;
      let response = await getAllHospitalRequests(hospitalId);

      setHospitalRequests(response.data.Requested); // Access populated requests
    } catch (err) {
      console.log("Error while fetching all request of a hospital: ", err);
    }
  }

  useEffect(() => {
    fetchAllRequestOfHospital();
  }, []);

  return (
    <div>
      <h2>Hospital Dashboard</h2>
      {hospitalRequests.length > 0 ? (
        hospitalRequests.map((request) => (
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
