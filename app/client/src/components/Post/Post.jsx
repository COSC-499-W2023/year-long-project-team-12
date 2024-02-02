import React, {useEffect, useState} from 'react'
import "./post.scss";
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/authContext";
import {getUserById} from "../../services/ClientAPI";

function Post({request}) {
    const {setCurrentRequest, currentUser} = useAuth();
    const [requestCreator, setRequestCreator] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);

    const fetchRequestCreator = async () => {
        try {
            getUserById(request.creatorId).then(resp => {
                setRequestCreator(resp.data.lastName + ', ' + resp.data.firstName)
            })
            setExpirationDate(new Date(request.expiration).toString())
        } catch (error) {

        }
    };

    const handleRequestContext = () => {
        setCurrentRequest(request);
    };


    useEffect(() => {
        fetchRequestCreator();
    }, []);


  return (
    <div className='post'>
        <div className="container">
        <div className='job'>
            <div className='jobInfo'>
                <div className="details">

                <span data-testid="jobTitle" className='jobTitle'>{request.title}</span>
                <span data-testid="companyName" className='companyName'>{requestCreator}</span>
                <span data-testid="expiration" className='location'>{expirationDate}</span>
                </div>
            </div>
        </div>
        <div className='content'>
            <p>{request.description}</p>
        </div>
            {(() => {
                if (currentUser.role === 'ADMIN') {
                    return (
                        <div>
                            <div className='info' id="uploadb">
                                <Link to="">
                                    <button onClick={handleRequestContext}>Edit</button>
                                </Link>
                            </div>
                            <div className='info'>
                                <Link to="/viewVideo">
                                    <button onClick={handleRequestContext}>View</button>
                                </Link>
                            </div>
                        </div>
                    )
                } else if (request.submitted === true) {
                    return (
                        <div>
                            <div className='info' id="uploadb">
                                <Link to="">
                                    <button onClick={handleRequestContext}>Details</button>
                                </Link>
                            </div>
                            <div className='info'>
                                <Link to="/viewVideo">
                                    <button onClick={handleRequestContext}>View</button>
                                </Link>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div>
                            <div className='info' id="uploadb">
                                <Link to="/upload">
                                    <button onClick={handleRequestContext}>Upload</button>
                                </Link>
                            </div>
                            <div className='info'>
                                <Link to="/recording">
                                    <button onClick={handleRequestContext}>Record</button>
                                </Link>
                            </div>
                        </div>
                    )
                }
            })()}

    </div>
    </div>
  )
}

export default Post