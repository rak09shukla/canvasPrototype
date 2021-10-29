import React, { Component,Fragment } from 'react';
import Sidebar from "./sidebar";
import axios from "axios";
import { Link} from 'react-router-dom'
import cookie from 'react-cookies';
import {rootUrl} from "../helpers/urlhelper";
import {Redirect} from "react-router";
import img from "../images/sjsugold.png"
import SVG from 'react-inlinesvg';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logoutuser} from '../../actions/loginActions';
import {getprofile,getcourselist} from '../../actions/navbarActions';

import dashboardsvg from "../images/dashboard.svg"
// import profileSVG from "../images/dashboard.svg"
import coursesSVG from "../images/courses.svg"
import groupsSVG from "../images/groups.svg"

class Navbar extends Component {
  
  constructor(props){
    super(props);

    let uid=0;
    if(cookie.load("cookie"))
    {
    uid=cookie.load("cookie").email;
    }
    this.state={
     list:[],
     showSidebar:0,
     logout:0,
     selected:"",
     activated:props.path,
     activatedLast:"",
     uid
    }


  }

  hideSidebar=()=>{
    this.setState({
      activatedLast:"",
      activated:this.state.activatedLast,
      selected:"",
      showSidebar:0
    })
  }
  showSidebar=()=>{
    this.setState({
      showSidebar:1
    }) 
  }

  logout=()=>{
    this.props.onLogoutUser();
  
    // this.setState({
    //   logout:1
    // });
  }

  getprofiledetails=()=>{
    this.props.onGetProfile(this.state.uid);
  }

  async componentDidMount(){

    this.getprofiledetails();
    let cookieData=cookie.load("cookie");
    this.props.onGetCourselist(cookieData);

  }
  menuclick=(option)=>{
      this.setState({
        activatedLast:this.state.activated,
        activated:"",
        selected:option
      });
      
   
  }
  render() {
    let sidebarVar=null;
    let logoutVar=null;
    if(!cookie.load("cookie")){
      logoutVar=<Redirect to="/login"/>
    }
    if(this.state.showSidebar){
      sidebarVar=<Sidebar list={this.props.navbar.list} hide={this.hideSidebar}></Sidebar>
    }
    return (
      <Fragment>
        <div>{logoutVar}</div>
        <header className="navbar-parent">
        <div><img className="navbar-image" src={img}></img></div>
        <div className="rest-menu">
        <div className={this.state.activated=="/profile"?"active":""}>
        <Link to="/profile"><img src={this.props.navbar.imageUrl}></img>
       Account</Link></div>
        <div className={this.state.activated=="/"?"active":""}><Link to="/"><SVG src={dashboardsvg}></SVG><span>Dashboard</span></Link></div>
        <div className={this.state.selected==="courses"?"active":""} onClick={()=>{this.menuclick("courses");this.showSidebar();}}><SVG src={coursesSVG}></SVG>
        <span>Courses</span></div>
        <div><SVG src={groupsSVG}></SVG><span>Groups</span></div>
        <div onClick={this.logout}>Log out</div>
        </div>
        </header>
        {sidebarVar}
        </Fragment>
    )
  }
}
const mapStatetoProps=(state,props)=>{
  return{
    ...state,
    ...props
  };
}

const mapActionToProps=(dispatch,props)=>{
  return bindActionCreators({
    onLogoutUser:logoutuser,
    onGetProfile:getprofile,
    onGetCourselist:getcourselist
  },dispatch);
}

export default connect(mapStatetoProps,mapActionToProps)(Navbar);

  