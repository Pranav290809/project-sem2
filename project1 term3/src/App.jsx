import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import Donors from "./components/donors";
import Banner from "./components/banner";
import InfoSection from "./components/infosection";
import ContactSection from "./components/contactsection";
import Spinner from "./components/spinner";
import Requests from "./components/requests";
import { HashRouter, Routes, Route } from "react-router-dom";
import ChatBot from "./components/ChatBot";

const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];

const maharashtraCities = [
  "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad",
  "Dhule", "Kolhapur", "Solapur", "Amravati", "Thane"
];

function App() {
  const [patientData, setPatientData] = useState([]);
  const [requestStatus, setRequestStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Override cities with Maharashtra cities
        const updatedData = response.data.map((user, index) => ({
          ...user,
          address: {
            ...user.address,
            city: maharashtraCities[index % maharashtraCities.length],
          },
        }));

        setPatientData(updatedData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  function handleRequest(id) {
    setRequestStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <HashRouter>
      <Navbar />
      <div className="pt-20">
        <Routes>
          <Route
            path="/"
            element={
              loading ? (
                <Spinner />
              ) : (
                <>
                  <Banner />
                  <InfoSection patientData={patientData} />
                  <ContactSection />
                </>
              )
            }
          />
          <Route
            path="/Donors"
            element={
              loading ? (
                <Spinner />
              ) : (
                <Donors
                  data={patientData}
                  bloodGroups={bloodGroups}
                  requestStatus={requestStatus}
                  handleRequest={handleRequest}
                />
              )
            }
          />
          <Route
            path="/Requests"
            element={
              loading ? (
                <Spinner />
              ) : (
                <Requests
                  data={patientData}
                  bloodGroups={bloodGroups}
                  requestStatus={requestStatus}
                />
              )
            }
          />
        </Routes>
      </div>
      <ChatBot />
    </HashRouter>
  );
}

export default App;
