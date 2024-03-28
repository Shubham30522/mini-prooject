import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { DonorAgreeToDonate } from "../services/operations/authAPI";
import { useSelector } from "react-redux";
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

  const agreeToDonateHandler = async (reqId) => {
    // console.log("Printing request id in agreeToDonateHandler: " + reqId);
    const updatedRequest = await DonorAgreeToDonate(reqId);

    await fetchData(); // Fetch updated requests
  }

  useEffect(() => {
    fetchData();
  }, []);

  const { user } = useSelector((state) => state.profile);

  return (
    <div className="flex flex-wrap justify-center">
      {(allReq.length === 0 || allReq.filter((req) => req.status === "pending").length === 0) ? (
        <p>There are no pending requests at this time.</p>
      ) : (
        allReq.filter((req) => req.status === "pending").map((req) => {
          return (
            <div key={req._id} className="m-4">
              <Card
                border="secondary"
                style={{
                  width: "18rem",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Card.Header
                  style={{ backgroundColor: "#b91c1c", color: "white" }}
                >
                  Request
                </Card.Header>
                <Card.Body>
                  <Card.Title>Found a Match</Card.Title>
                  <Card.Text>
                    Hey,We need you! Please Reach out to us ASAP
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">

                  <ListGroup.Item>
                    <span className="font-medium">Hospital Name:</span>{" "}
                    {req.Hospital_id.hospitalName}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span className="font-medium">Blood Group:</span>{" "}
                    {req.bloodGroup}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <span className="font-medium">Action:</span>
                    <Button
                      variant="primary"
                      onClick={() => {
                        // console.log("Blood Group of the request: " + req.bloodGroup);
                        // console.log("Hospital Id of the request: " + req.Hospital_id);
                        // console.log("Id of the request: " + req._id);
                        const reqId = req._id;
                        const donorId = user._id;
                        const requestData = {
                          reqId,
                          donorId
                        }
                        agreeToDonateHandler(requestData);
                      }}
                    >
                      Click Here
                    </Button>
                  </ListGroup.Item>

                </ListGroup>
              </Card>
            </div>
          );
        })
      )}
    </div>
  );
};

export default PendingRequest;
