import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch } from 'react-icons/bs';
import './secondapage.css';
import React, { useEffect } from 'react';
import { json, Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faCartArrowDown, faHeart, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import jsondata from '../students.json';
import subjectdata from '../subjects.json';
import axios from 'axios';
import { async } from '@firebase/util';
import { auth, db } from '../Firebase';
import { signOut, createUserWithEmailAndPassword, sendSignInLinkToEmail, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { getDatabase, ref, child, get } from "firebase/database";
import { set, useForm } from 'react-hook-form';
import './Studentspage.css';
import './Updateattendance.css';
function StudentsPage(){
    const navigate=useNavigate()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [students,setStudents]=useState()
    let [showcsbs,setShowcsbs]=useState(false)
    let [showcse,setShowcse]=useState(false)
    let handleMain=()=>{
        navigate('/admin')
    }
    let getcsbs=async()=>{
        await axios.get("http://localhost:5000/getstudentscsbs").then((x)=>{
            setShowcse(false)
            setStudents(x.data.payload)
            console.log(x.data.payload)
            setShowcsbs(true)
        })
        .catch(err=>console.log(err))

    }
    let getcse=async()=>{
        await axios.get("http://localhost:5000/getstudentscse").then((x)=>{
            setShowcsbs(false)
            setStudents(x.data.payload)
            console.log(x.data.payload)
            setShowcse(true)
        })
        .catch(err=>console.log(err))
    }
    let addstudent=()=>{
        navigate('/addstudent')
    }
    return (
    <div className='studentspage'>
        <nav className="w-100 navbar navbar-expand-lg p-2 m-0 justify-content-between gap-2" style={{ backgroundColor: '#749F82' }} >
                    <button onClick={handleShow} className="navbar-toggler bg-light shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown #navbar2" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    
                    

                    <Offcanvas show={show} onHide={handleClose} className='w-50'>
                        <Offcanvas.Header closeButton style={{ backgroundColor: '#557B83' }}>
                            <Offcanvas.Title className='text-light' > Classes</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ backgroundColor: '#557B83' }}>

                       
                            <ul className="navbar-nav navbar-collapse d-flex flex-column justify-content-center gap-2  text-center w-100 "  >
                                <li className="nav-item nav-items-2 border w-100 "><Link className='nav-link text-light' onClick={getcsbs}>CSBS</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light'  onClick={getcse} >CSE</Link></li>
                                


                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                    

                    {/* Collapsible navbar */}
                    <div className=" nav-item collapse navbar-collapse" id="navbarNavDropDown">

                        <ul className="navbar-nav navbar-collapse justify-content-around p-0" >

                            <li className="nav-item ">
                                {/* <Button className="btn border-0 bg-light text-dark shadow-none ms-3" >Categories</Button> */}
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className=' text-light shadow-none border-0' style={{ backgroundColor: '#749F82' }}>Classes</Dropdown.Toggle>

                                    <Dropdown.Menu className='p-2 dropdown-menu shadow' style={{ backgroundColor: '#E1FFB1' }} >
                                        <Dropdown.Item  className='p-2' onClick={getcsbs}>CSBS</Dropdown.Item>
                                        <Dropdown.Item  className='p-2' onClick={getcse}>CSE</Dropdown.Item>
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>


                            <li className="nav-item ">
                                <button className='btn btn-success' onClick={handleMain}>Go to Main</button>

                            </li>
                        </ul>


                    </div>

                </nav>
                <h1 className='mt-5'>Welcome To the Students Page</h1>
                <div className=' mt-3 ms-5 me-5 p-5' style={{ backgroundColor: '#E9EFC0' }} >
                {showcsbs ?
                    <div>
                       
                            <div className='row'>

                                <div scope="col" className='col-sm-2 blockquote' ><h5>Rollno</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Name</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Class</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Phno</h5></div>
                                <div scope='col' className='col-sm-2 blockquote'><h5>Address</h5></div>

                            </div>
                            <hr />
                           
                                {students.map((data) =>
                                    <div key={data._id} className='row'>
                                        <div scope="row" className='col-sm-2'>{data.rollno}</div>
                                        <div className='col-sm-2'>{data.name}</div>
                                        <div className='col-sm-2'>{data.branch}</div>
                                        <div className='col-sm-2'>{data.mobile}</div>
                                        <div className='col-sm-2'>{data.address}</div>
                                        <hr />
                                    </div>

                                )

                                }


                          
                    <button className='btn btn-primary' onClick={addstudent} >Add  Student </button>   

                    </div> : <div> </div>
                }
                {showcse ?
                    <div>
                       
                            <div className='row'>

                                <div scope="col" className='col-sm-2 blockquote' ><h5>Rollno</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Name</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Class</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Phno</h5></div>
                                <div scope='col' className='col-sm-2 blockquote'><h5>Address</h5></div>

                            </div>
                            <hr />
                           
                                {students.map((data) =>
                                    <div key={data._id} className='row'>
                                        <div scope="row" className='col-sm-2'>{data.rollno}</div>
                                        <div className='col-sm-2'>{data.name}</div>
                                        <div className='col-sm-2'>{data.branch}</div>
                                        <div className='col-sm-2'>{data.mobile}</div>
                                        <div className='col-sm-2'>{data.address}</div>
                                        <hr />
                                    </div>

                                )

                                }


                          
                    <button className='btn btn-primary' onClick={addstudent}> Add Student</button>   

                    </div> : <div> </div>
                }



                </div>


    </div>)
}
export default StudentsPage;