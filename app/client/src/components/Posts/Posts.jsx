import React from 'react';
import './posts.scss';
import Post from '../Post/Post';

function Posts() {

    const posts = [
        {
            id:1,
            jobTitle:"Software Engineer",
            companyName:"Amazon",
            logo:"https://germainmaureau.com/app/uploads/2020/05/Amazon-logo.png",
            location:"Vancouver",
            description:"",

        },
        {
            id:2,
            jobTitle:"Human Resource",
            companyName:"Apple",
            logo:"https://media.licdn.com/dms/image/D4D12AQHwi4jdRd3fQQ/article-cover_image-shrink_600_2000/0/1685279753620?e=2147483647&v=beta&t=7I-pJ0kDQfNl4w-0Ue8aPyol_X-aWOQlzp18NhTldys",
            location:"Silicon Valley",
            description:"",

        },
        {
            id:3,
            jobTitle:"Electrical Engineer",
            companyName:"Boeing",
            logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Boeing_full_logo_%28variant%29.svg/1280px-Boeing_full_logo_%28variant%29.svg.png",
            location:"Dallas",
            description:"",

        },
        {
            id:4,
            jobTitle:"Web Developer",
            companyName:"Google",
            logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
            location:"San Jose",
            description:"",

        },
    ];  
  return (
    <div className='posts'>
        {
            posts.map(post=>(
                <Post post={post} key={post.id}/>
            ))
        }
    </div>
  )
}

export default Posts;