import React, { useState } from 'react';
import './Admin.scss';
import { useAuth } from '../../context/authContext';
import {saveRequest} from '../../services/ClientAPI';
import logo from "../../components/Navbar/logo.png";
import {useNavigate} from "react-router-dom";

const Admin = () => {
  let navigate = useNavigate();
  const {currentUser} = useAuth();
  const [title, setRequestTitle] = useState('');
  const [description, setRequestDescription] = useState('');
  const [assigneeEmail, setAssigneeEmail] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleSubmitRequest = async (event) => {
    event.preventDefault();

    try {
      const requestData = new FormData();
      requestData.append("title", title)
      requestData.append("description", description)
      requestData.append("assigneeEmail", assigneeEmail)
      requestData.append("created", new Date().toISOString())
      requestData.append("creatorId", currentUser.userId)
      requestData.append("expiration", new Date(expirationDate).toISOString())

      const object = {};
      requestData.forEach((value, key) => (object[key] = value));
      const requestDataObject = JSON.stringify(object);

      saveRequest(requestDataObject).then(resp => {
        navigate('/jobs');
      })

    } catch  {

    }
  };

  return (
    <div className="adminUser">
      <div className="card">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="right">
          <h1>Add a Request</h1>
          <form onSubmit={handleSubmitRequest}>
            <input
              type="text"
              name="title"
              placeholder="Request Title"
              value={title}
              onChange={(e) => setRequestTitle(e.target.value)}
            />

            <input
                type="text"
                name="Assignee"
                placeholder="Assign to: (Email Address)"
                value={assigneeEmail}
                onChange={(e) => setAssigneeEmail(e.target.value)}
            />

            <textarea
              name="requestDescription"
              placeholder="Request Description"
              value={description}
              onChange={(e) => setRequestDescription(e.target.value)}
            ></textarea>

            <label htmlFor="expirationDate">Request Expiration Date:</label>
            <input
              type="date"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />

            <button type="submit">
              Add Request 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
