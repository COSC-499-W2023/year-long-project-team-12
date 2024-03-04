import React, { useEffect, useState } from 'react';
import './Edit.scss';
import { useAuth } from '../../context/authContext';
import {deleteRequest, updateRequest} from '../../services/ClientAPI';
import logo from "../../components/Navbar/logo.png";
import {useNavigate} from "react-router-dom";
import {getUserById} from "../../services/ClientAPI";

const Edit = () => {
  let navigate = useNavigate();
  const {currentUser, currentRequest} = useAuth();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [title, setRequestTitle] = useState(currentRequest.title);
  const [description, setRequestDescription] = useState(currentRequest.description);
  const [assigneeEmail, setAssigneeEmail] = useState('');
  let currDate = new Date(currentRequest.expiration);
  currDate.setMinutes(currDate.getMinutes() - currDate.getTimezoneOffset());
  const [expirationDate, setExpirationDate] = useState(currDate.toISOString().slice(0, -1));

  const fetchRequestUsers = async () => {
        try {
            getUserById(currentRequest.assigneeId).then(resp => {
                setAssigneeEmail(resp.data.email);
            });
        } catch (error) {

        }
  };

  useEffect(() => {
      fetchRequestUsers();
  }, []);

  const toggleDeleteConfirmation = (event) => {
      event.preventDefault();
      setDeleteConfirmation(true);
  }

  const cancelDelete = () => {
      setDeleteConfirmation(false);
  }

  const handleDeleteRequest = (event) => {
      event.preventDefault();

      try {
          deleteRequest(currentRequest.requestId).then(resp => {
              navigate('/jobs');
          })
      } catch {

      }
  }

  const handleEditRequest = async (event) => {
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

      updateRequest(currentRequest.requestId, requestDataObject).then(resp => {
        navigate('/jobs');
      })

    } catch  {

    }
  };

  return (
    <div className="editUser">
      <div className="card">
        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="right">
          <h1>Edit Request</h1>
          <form onSubmit={handleEditRequest}>
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
              type="datetime-local"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />

            <div className='buttonContainer'>
                <button type="submit">
                    Save 
                </button>

                <button onClick={toggleDeleteConfirmation}>
                    Delete 
                </button>
            </div>

              {deleteConfirmation &&
                  <div className='modalbackground'>
                      <div className="confirmation-dialog">
                          <p>Are you sure you want to delete this Request?</p>

                          <div className="button-container">
                              <button onClick={handleDeleteRequest}>Yes</button>
                              <button onClick={cancelDelete}>No</button>
                          </div>
                      </div>
                  </div>
              }

          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
