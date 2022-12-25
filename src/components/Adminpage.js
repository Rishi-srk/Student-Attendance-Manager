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
import './Adminpage.css';



// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import {Form} from 'react-bootstrap/Form'
function Secondpage() {
    const dbRef = ref(getDatabase());
    const [user, setUser] = useState();
    const [name, setName] = useState()
    let navigate=useNavigate()

    useEffect(() => {
        getData()
    }, [])
    let getData = async () => {
        onAuthStateChanged(auth, user => setUser(user));

    }
    
    if(user==null){
        navigate('/')
    }
    let [showAttendance, setShowAttendance] = useState(false)
    let [showStudent, setStudent] = useState(false)
    let [showSub, setShowSub] = useState(false)
    let [showMedical, setShowMedical] = useState(false)
    let [showbelow65, setShowbelow65] = useState(false)
    let [showfaculty,setShowfaculty]=useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [active,setActive]=useState(0)
    let [data, setData] = useState([])
    let [subjects, setSubjects] = useState([])
    let [attendanc, setAttendance] = useState(null)
    let [below65, setbelow65] = useState()
    let [medical, setmedical] = useState()
    let [faculty,setFaculty]=useState()
    console.log(user)
    // attendance=[{rno:"20071a3251",attendance:98}]

    let [sub, setSub] = useState("")



    let handleCLick =  () => {
      
        navigate('/studentspage')
    }
    let handleSub = async () => {
        setStudent(false)
        setShowAttendance(false)
        setShowMedical(false)
        setShowbelow65(false)
        setShowfaculty(false)
        await axios.get("http://localhost:5000/getsubject").then((x) => {
            setSubjects(x.data.payload)
            setShowSub(true)
            

        })
            .catch(err => console.log(err))
    }


    let handleAttendance = async () => {
        // e.preventDefault()

        setStudent(false)
        setShowbelow65(false)
        setShowSub(false)
        setShowMedical(false)
        await axios.get("http://localhost:5000/getattendance").then((x) => {
            // console.log(x.data.payload)
            setAttendance(x.data.payload)
            console.log(x.data.payload)
            console.log(attendanc)
            setShowAttendance(true)

        }).catch(err => console.log(err))
        console.log(attendanc)
    }
    let medicalList = async () => {
        setStudent(false)
        setShowSub(false)
        setShowAttendance(false)
        setShowbelow65(false)
        await axios.get("http://localhost:5000/getMedicalList").then((x) => {
            console.log(x.data.payload)
            setmedical(x.data.payload)
            setShowMedical(true)
        })
            .catch(err => console.log(err))
    }
    let getBelow65 = async () => {
        setStudent(false)
        setShowSub(false)
        setShowAttendance(false)
        setShowMedical(false)
        await axios.get("http://localhost:5000/getbelow65").then((x) => {
            console.log(x.data.payload)
            setbelow65(x.data.payload)
            setShowbelow65(true)
        })

    }
    let Logout=()=>{
        signOut(auth).then(() => {
            navigate('/')
          }).catch((error) => {
            // An error happened.
          });
    }

    let getFaculty=()=>{
        setShowSub(false)
        axios.get("http://localhost:5000/getfaculty").then((x)=>{
            console.log(x.data.payload)
            setFaculty(x.data.payload)
            setShowfaculty(true)
            
        })
  
    }
    let fun=()=>{
        navigate('/addfaculty')
    }

    return (
        <div className='w-100 h-100 adminpage'>
            <div className='first-navbar w-100'>
                <nav className="w-100 navbar navbar-expand-lg p-2 m-0 justify-content-between gap-2" style={{ backgroundColor: '#749F82' }} >
                    <button onClick={handleShow} className="navbar-toggler bg-light shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown #navbar2" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <p className='mt-2 text-white display-5'>Admin Page</p>
                    

                    <Offcanvas show={show} onHide={handleClose} className='w-50'>
                        <Offcanvas.Header closeButton style={{ backgroundColor: '#557B83' }}>
                            <Offcanvas.Title className='text-light' > Categories</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ backgroundColor: '#557B83' }}>

                       
                            <ul className="navbar-nav navbar-collapse d-flex flex-column justify-content-center gap-2  text-center w-100 "  >
                                <li className="nav-item nav-items-2 border w-100 "><Link className='nav-link text-light'  onClick={handleCLick}>Students</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' >Subjects</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' onClick={getFaculty}  >Faculty</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light'  onClick={Logout}>Logout</Link></li>



                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                    

                    {/* Collapsible navbar */}
                    <div className=" nav-item collapse navbar-collapse" id="navbarNavDropDown">

                        <ul className="navbar-nav navbar-collapse justify-content-around p-0" >

                            <li className="nav-item ">
                                {/* <Button className="btn border-0 bg-light text-dark shadow-none ms-3" >Categories</Button> */}
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className=' text-light shadow-none border-0' style={{ backgroundColor: '#749F82' }}>Categories</Dropdown.Toggle>

                                    <Dropdown.Menu className='p-2 dropdown-menu shadow' style={{ backgroundColor: '#E1FFB1' }} >
                                        <Dropdown.Item onClick={handleCLick} className='p-2'>Students</Dropdown.Item>
                                        <Dropdown.Item onClick={handleSub} className='p-2'>Subjects</Dropdown.Item>
                                        <Dropdown.Item className='p-2' onClick={getFaculty}>Faculty</Dropdown.Item>

                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>


                            <li className="nav-item ">
                                <button className='btn btn-success' onClick={Logout}>Logout</button>

                               

                            </li>
                        </ul>


                    </div>

                </nav>
            </div>
            <div >
            {user ? <h2 className='mb-5 mt-3 text-start ms-5 blockquote ' >Hello {user.displayName}!</h2> : null}
            </div>

            {
                showStudent ? <div>
                    <h5>Students List</h5>
                    <button className='btn btn-primary float-end '>  Add Student </button>
                    </div> : showAttendance ? <h5>Attendance List</h5> : showSub ? <h5>Subject List</h5> : showMedical ? <h5>Medical List</h5> : showbelow65 ? <h5>Students below 65% attendance</h5> : null
            }
            <div className=' mt-3 ms-5 me-5 p-5' style={{ backgroundColor: '#E9EFC0' }} >
                <div className='bg'></div>
                {showStudent ?
                    <div>
                       
                            <div className='row'>

                                <div scope="col" className='col-sm-2 blockquote' ><h5>Rollno</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Name</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Class</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Phno</h5></div>
                                <div scope='col' className='col-sm-2 blockquote'><h5>Address</h5></div>

                            </div>
                            <hr />
                           
                                {data.map((data) =>
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


                          
                        

                    </div> : <div> </div>
                }
                
              
                
                <div>

                    {
                        showfaculty ? <div>
                            <div className='row'>
                                <div scope="col" className='col-sm-3 blockquote' ><h5>Name</h5></div>
                                <div scope="col" className='col-sm-3 blockquote' ><h5>Class</h5></div>
                                <div scope="col" className='col-sm-3 blockquote'><h5>Email</h5></div>
                        

                            </div>
                            <hr/>
                            <div>
                                {
                                    faculty.map((x, i) =>
                                        <div className='row' key={i + 1}>
                                            <div scope="col" className='col-sm-3 blockquote' >{x.name}</div>
                                            <div scope="col" className='col-sm-3 blockquote' >{x.branch}</div>
                                            <div scope="col" className='col-sm-3 blockquote'>{x.mail}</div>
                                           <hr/>
                                        </div>
                                        
                                    )
                                }

                            </div>
                            <button className='btn btn-primary' onClick={fun} >Add faculty</button>

                        </div> : null
                    }
                </div>
                <div>

                    {
                        showSub ? <div>
                            <div className='row'>
                                <div scope="col" className='col-sm-2 blockquote' ><h5>Subid</h5></div>
                                <div scope="col" className='col-sm-2 blockquote' ><h5>Subname</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Faculty</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Fid</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>DEPT</h5></div>
                        

                            </div>
                            <hr/>
                            <div>
                                {
                                    subjects.map((x, i) =>
                                        <div className='row' key={i + 1}>
                                            <div scope="col" className='col-sm-2 blockquote' >{x.Subid}</div>
                                            <div scope="col" className='col-sm-2 blockquote' >{x.Subname}</div>
                                            <div scope="col" className='col-sm-2 blockquote'>{x.Faculty}</div>
                                            <div scope="col" className='col-sm-2 blockquote'>{x.fid}</div>
                                            <div scope="col" className='col-sm-2 blockquote'>{x.dept}</div>


                                           <hr/>
                                        </div>
                                        
                                    )
                                }

                            </div>
                           

                        </div> : null
                    }
                </div>





            </div>

        </div>
    );
}
export default Secondpage;