import React, {useEffect, useState} from 'react';
import './posts.scss';
import Post from '../Post/Post';
import {getAssignedRequests, getUserRequests} from "../../services/ClientAPI";
import {useAuth} from "../../context/authContext";

function Posts() {
    const {currentUser} = useAuth();
    const [myRequests, setMyRequests] = useState([]);
    const getMyRequests = () => {
        if(currentUser.role === 'ADMIN') {
            getUserRequests(currentUser.userId).then(resp => {
                console.log(resp)
                setMyRequests(resp.data)
            }).catch(err => {

            })
        }else {
            getAssignedRequests(currentUser.userId).then(resp => {
                console.log(resp)
                setMyRequests(resp.data)
            }).catch(err => {

            })
        }
    };  

    useEffect(() => {
        getMyRequests();
    }, []);


  return (
    <div>
    {
       
myRequests.length===0 ?
    <div className='norequests'>
    There is no request for you at the moment!
    </div>
    :
    
    <div className='posts'>
    {
        myRequests.map(request=>(
            <Post request={request} key={request.requestId}/>
        ))
    }
</div>
}
</div>
  )
}

export default Posts;