import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAppState } from "../state/useAppState";
import axios from "axios";

const Dashboard = () => {
  const [credentials, setCredentials] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    const fetchCredentials = async () => {
      const response = await api.get(`/api/credentials/${id}/`);
      console.log("cehck data", response);
      setCredentials(response.data);
    };

    fetchCredentials();
  }, [id]);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");
  // const { userID } = useAppState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("dkjfkdjf", token, id);
    const dashboardApi = axios.create({
      baseURL: "http://localhost:8000",
    });

    const url = "/api/credentials/";

    const headers = {
      Authorization: `Token ${token}`,
    };
    // Log the request URL and headers
    console.log("Request URL:", url);
    console.log("Request headers:", headers);
    try {
      const response = await dashboardApi.post(
        url,
        {
          user: id,
          website,
          username,
          password,
        },
        {
          headers: headers,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const downloadPassword = (password) => {
    const element = document.createElement("a");
    const file = new Blob([password], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "password.txt";
    document.body.appendChild(element);
    element.click();
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="website"
            placeholder="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
          <input
            type="username"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <h2>My Credentials</h2>
        <ul>
          {credentials.map((credential) => (
            <tr key={credential.id}>
              {/* <td>{credential.id}</td> */}
              <td>{credential.website_name}</td>
              <td>{credential.username}</td>
              <td>
                <button onClick={() => downloadPassword(credential.password)}>
                  Download Password
                </button>
              </td>
            </tr>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Dashboard;
