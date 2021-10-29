import React from 'react';
// import axios from "axios";
import { Link } from 'react-router-dom'
const Sidebar=(props)=> {
 
    return (
       
        <div className="side-bar">
        <div className="sidebar-heading">
        <div>
        <span>Courses</span><button onClick={props.hide}>X</button>
        </div>
        </div>
        <div className="list-parent">
        <ul>
        {   
            props.list.map((data)=>{
                let link=data.link;
               return (<li onClick={props.hide} key={data.name}><Link  to={link}>{data.name}</Link></li>)
            })
        }
        </ul>
        </div>
        </div>
       
    )
}

export default Sidebar;
  