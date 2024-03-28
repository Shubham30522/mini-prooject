import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllHospitalRequests } from "../services/operations/authAPI";

const HospitalDashboard = () => {
  const { user } =
    useSelector((state) => state.profile) || localStorage.getItem("user");

  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState(null);

  const fetchHospital = async () => {
    // console.log("Printing user's id: ", user._id);
    const requestData = { userId: user._id };
    console.log("Printing hospital Id in Hospital Dashboard: ", requestData);
    try {
      setLoading(true);
      const hospital = await getAllHospitalRequests({ userId: user._id });
      setHospital(hospital);
      console.log("Printing hospital in hospital Dashboard: ", hospital);
      setLoading(false);
    } catch (error) {
      console.log("Error while fetching hospital information: " + error);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  return (
    <div>
      <h2>Hospital Dashboard</h2>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
          {!hospital && (
            <p>Here we are going to show all the request made by hospital</p>
          )}

          {hospital &&
            hospital.data.requested.map((req, index) =>
              req.D_id !== null ? (
                <div>
                  <p key={index}>
                    {req.bloodGroup} Donor of this request: {req.D_id.donorName}
                  </p>
                </div>
              ) : (
                <p key={index}>{req.bloodGroup}</p>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;
