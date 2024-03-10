import React, {useEffect, useState} from 'react'
import "./post.scss";
import { Link } from 'react-router-dom';
import {useAuth} from "../../context/authContext";
import {getUserById} from "../../services/ClientAPI";
import handleNewRequest from "../../pages/Profile/Profile"
import CloseIcon from '@mui/icons-material/Close';

function Post({request}) {
    const {setCurrentRequest, currentUser} = useAuth();
    const [requestCreator, setRequestCreator] = useState(null);
    const [requestAssignee, setRequestAssignee] = useState(null);
    const [expirationDate, setExpirationDate] = useState(null);
    const [details, viewDetails] = useState(false);

    const fetchRequestUsers = async () => {
        try {
            getUserById(request.creatorId).then(resp => {
                setRequestCreator(resp.data.lastName + ', ' + resp.data.firstName)
            });
            getUserById(request.assigneeId).then(resp => {
                setRequestAssignee(resp.data.lastName + ', ' + resp.data.firstName)
            });
            setExpirationDate(new Date(request.expiration).toString());
        } catch (error) {

        }
    };

    const handleRequestContext = () => {
        setCurrentRequest(request);
    };

    const toggleDetails = () => {
        viewDetails(!details);
    };

    useEffect(() => {
        fetchRequestUsers();
    }, []);


  return (
    <div className='post'>
        <div className="container">
            <div className='job'>
            <div className='jobInfo'>
                <div className="details">

                <span data-testid="jobTitle" className='jobTitle'>Title: {request.title}</span>
                <span></span>
                {(() => {
                    if(currentUser.role === 'ADMIN'){
                        return (<span data-testid="companyName" className='companyName'>To: {requestAssignee}</span>)
                    }else {
                        return (<span data-testid="companyName" className='companyName'>From: {requestCreator}</span>)
                    } 
                })()}
                
                { (request.submitted === true)?
                <span data-testid="status" style={{color:"#08c608"}}>Status: Submitted</span>:
                <span data-testid="status" style={{color:"red"}}>Status: Not Submitted</span>
                }
                
                </div>
            </div>
            </div>
            
            {(() => {
                if (currentUser.role === 'ADMIN') {
                    return (
                        <div className='buttonContainer'>
                            <div className='info' id="uploadb">
                                <div className='info' id="details">
                                    <button onClick={toggleDetails}>Details</button>
                                </div>
                                <Link to="/editRequest">
                                    <button onClick={handleRequestContext}>Edit</button>
                                </Link>
                            </div>
                            <div className='info'>
                                <Link to="/viewVideo">
                                    <button onClick={handleRequestContext}>View</button>
                                </Link>
                            </div>
                            {details && (
                                    <div className="modalContainer">
                                        <div className="detailsModal">
                                            <div className='detailsContent'>
                                                <div className='expdate'><strong>Expiration: </strong> {expirationDate}</div>
                                                
                                                <div className='content'>
                                                    <p><strong>Description: </strong> {request.description}</p>
                                                </div>
                                            </div>
                                            <div className='close'>   
                                                <CloseIcon onClick={toggleDetails}/>
                                            </div>    
                                        </div>
                                    </div>
                                )}
                        </div>
                    )
                } else if (request.submitted === true) {
                    return (
                        <div className='buttonContainer'>
                            <div className='info' id="details">
                                <button onClick={toggleDetails}>Details</button>
                            </div>
                            <div className='info'>
                                <Link to="/viewVideo">
                                    <button onClick={handleRequestContext}>View</button>
                                </Link>
                            </div>
                            {details && (
                                    <div className="modalContainer">
                                        <div className="detailsModal">
                                            <div className='detailsContent'>
                                                <div className='expdate'><strong>Expiration: </strong> {expirationDate}</div>
                                                
                                                <div className='content'>
                                                    <p><strong>Description: </strong> {request.description}</p>
                                                </div>
                                            </div>
                                            <div className='close'>   
                                                <CloseIcon onClick={toggleDetails}/>
                                            </div>    
                                        </div>
                                    </div>
                                )}
                        </div>
                    )
                } else {
                    return (
                        <div className='buttonContainer'>
                            <div className='info' id="details">
                                <button onClick={toggleDetails}>Details</button>
                            </div>
                            <div className='info' id="submit">
                                <Link to="/recording">
                                    <button onClick={handleRequestContext}>Record Video</button>
                                </Link>
                            </div>
                            <div className='info' id="submit">
                                <Link to="/upload">
                                    <button onClick={handleRequestContext}>Upload Video</button>
                                </Link>
                            </div>

                            {details && (
                                    <div className="modalContainer">
                                        <div className="detailsModal">
                                            <div className='detailsContent'>
                                                <div className='expdate'><strong>Expiration: </strong> {expirationDate}</div>
                                                <div className='content'>
                                                    <p><strong>Description: </strong> {request.description}</p>
                                                </div>
                                            </div>
                                            <div className='close'>   
                                                <CloseIcon onClick={toggleDetails}/>
                                            </div>    
                                        </div>
                                    </div>
                                )}
                        </div>
                    )
                }
            })()}

        </div>
    </div>
  )
}

export default Post