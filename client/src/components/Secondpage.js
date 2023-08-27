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

import axios from 'axios';
import { async } from '@firebase/util';
import { auth, db } from '../Firebase';
import { signOut, createUserWithEmailAndPassword, sendSignInLinkToEmail, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { setDoc, doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { getDatabase, ref, child, get } from "firebase/database";
import './Hompage.css';




// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import {Form} from 'react-bootstrap/Form'
function Secondpage() {
    const dbRef = ref(getDatabase());
    const [user, setUser] = useState();
    const [name, setName] = useState()
    const[email,setEmail]=useState()
    let [section,setSection]=useState()
    let [val,setVal]=useState()
    const navigate=useNavigate()
    

    useEffect(() => {
        
        getData()
        
        
        
        
    }, [])
    let getData = async () => {
        onAuthStateChanged(auth, user => setUser(user))
        setEmail(user?.email)
    }


    
    let facultyfun=async()=>{
        await  axios.get("http://localhost:5000/getfaculty").then((x)=>
        {
            setVal(x.data.payload)
            
        }).catch(err=>console.log(err))
    
       
    }
   
    
    let [showAttendance, setShowAttendance] = useState(false)
    let [showStudent, setStudent] = useState(false)
    let [showSub, setShowSub] = useState(false)
    let [showMedical, setShowMedical] = useState(false)
    let [showbelow65, setShowbelow65] = useState(false)

    const [show, setShow] = useState(false);
    const sData = jsondata.students;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let [data, setData] = useState([])
    let [subjects, setSubjects] = useState([])
    let [attendanc, setAttendance] = useState(null)
    let [below65, setbelow65] = useState()
    let [medical, setmedical] = useState()
    console.log(user?.email)
    // attendance=[{rno:"20071a3251",attendance:98}]
    const total_attendance = subjectdata.total_attendance;
    let [sub, setSub] = useState("")

    

    let handleCLick = async () => {
        // getbranch();
        setShowAttendance(false)
        setShowMedical(false)
        setShowbelow65(false)
        await axios.post('http://localhost:5000/getsectio',{email:user?.email}).then((x) => {
            setData(x.data.payload)
            setShowSub(false)
            console.log(x.data.payload)
            setStudent(true)
        }).catch(err => console.log(err))
    }
    let handleSub = async () => {
        setStudent(false)
        setShowAttendance(false)
        setShowMedical(false)
        setShowbelow65(false)
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
        await axios.post("http://localhost:5000/getattendance",{email:user?.email}).then((x) => {
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
        await axios.post("http://localhost:5000/getMedicalList",{email:user?.email}).then((x) => {
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
        await axios.post("http://localhost:5000/getbelow65",{email:user?.email}).then((x) => {
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
    // console.log(val)
    // console.log(section)
let addstudent=()=>{
    navigate('/addstudent')
}
let handleUpdateAttendance=()=>{
    navigate('/updateattendance')
}

    return (
        <div className='secondpage'>
        <div className='secondpage ' >
            <div className='first-navbar w-100'>
                <nav className="w-100 navbar navbar-expand-lg p-2 m-0 justify-content-between " style={{ backgroundColor: '#4b86b4' }} >
                    <button onClick={handleShow} className="navbar-toggler bg-light shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown #navbar2" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    
                    

                    <Offcanvas show={show} onHide={handleClose} className='w-50'>
                        <Offcanvas.Header closeButton style={{ backgroundColor: '#4b86b4' }}>
                            <Offcanvas.Title className='text-light' > Categories</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ backgroundColor: '#557B83' }}>

                       
                            <ul className="navbar-nav navbar-collapse d-flex flex-column justify-content-center gap-2  text-center w-100 "  >
                                <li className="nav-item nav-items-2 border w-100 "><Link className='nav-link text-light' onClick={handleCLick}>Students</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' onClick={handleSub} >Subjects</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' onClick={handleAttendance} >Total Attendance</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' onClick={medicalList} >Medical Letter List</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' onClick={getBelow65} >Below 65%</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' onClick={handleUpdateAttendance} >Update Attendance</Link></li>

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
                                    <Dropdown.Toggle id="dropdown-basic" className=' text-light shadow-none border-0' style={{ backgroundColor: '#4b86b4' }}>Categories</Dropdown.Toggle>

                                    <Dropdown.Menu className='p-2 dropdown-menu shadow' style={{ backgroundColor: '#E1FFB1' }} >
                                        <Dropdown.Item onClick={handleCLick} className='p-2'>Students</Dropdown.Item>
                                        <Dropdown.Item onClick={handleSub} className='p-2'>Subjects</Dropdown.Item>
                                        <Dropdown.Item className='p-2' onClick={handleAttendance}>Total Attendance</Dropdown.Item>
                                        <Dropdown.Item className='p-2' onClick={medicalList}>Medical Letter List</Dropdown.Item>
                                        <Dropdown.Item className='p-2' onClick={getBelow65}>Below 65%</Dropdown.Item>
                                        <Dropdown.Item className='p-2' onClick={handleUpdateAttendance}>Update Attendance</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>


                            <li className="nav-item ">
                                <button className='btn btn-light' onClick={Logout}>Logout</button>

                               

                            </li>
                        </ul>


                    </div>

                </nav>
            </div>
           
            {user ? <h2 className='mb-5 mt-3 text-start ms-5 user ' >Welcome  {user.displayName}!!</h2> : null}
           

            {
                showStudent ? <div>
                    <h5>Students List</h5>
                    
                    </div> : showAttendance ? <h5>Attendance List</h5> : showSub ? <h5>Subject List</h5> : showMedical ? <h5>Medical List</h5> : showbelow65 ? <h5>Students with attendance below 65% </h5> : null
            }
            <div className=' mt-3 ms-5 me-5 p-4 seconddiv'  >
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
                            <hr  />
                           
                                {data.map((data) =>
                                    <div key={data._id} className='row'>
                                        <div scope="row" className='col-sm-2 blockquote'>{data.rollno}</div>
                                        <div className='col-sm-2 blockquote'>{data.name}</div>
                                        <div className='col-sm-2 blockquote'>{data.branch}</div>
                                        <div className='col-sm-2 blockquote'>{data.mobile}</div>
                                        <div className='col-sm-2 blockquote'>{data.address}</div>
                                        <hr />
                                    </div>

                                )

                                }


                          
                    <button className='btn btn-primary ' onClick={addstudent} >  Add Student </button>   

                    </div> : <div> </div>
                }
                {showSub ?
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Subid</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Class</th>
                                    <th scope="col">Phno</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    subjects.map((x,i) =>
                                        <tr key={i}>
                                            <th scope="row">{x.Subid}</th>
                                            <td>{x.Subname}</td>
                                            <td>{x.Faculty}</td>
                                            <td>{x.dept}</td>

                                        </tr>
                                    )

                                }


                            </tbody>
                        </table>

                    </div> : <div> </div>
                }
                {
                    showAttendance ?
                        
                            <div >
                               
                                        {/* <th scope="col">Rollno</th>
                                        
                                        <th>Operating Systems</th>
                                        <th>Operational Research</th>
                                        <th>DBMS</th>
                                        <th scope="col">Attendance</th> */}
                                <div className='row'>
                                <div scope="col" className='col-sm-2 blockquote' ><h5>Rollno</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Operating Systems</h5></div>
                                <div scope="col" className='col-sm-2 blockquote'><h5>Operational Research</h5></div>
                                <div scope="col" className='col-sm-2 blockquote' ><h5>DBMS</h5></div>
                                <div scope="col" className='col-sm-2 blockquote' ><h5>Total</h5></div>
                                </div>
                           
                                <div>
                                    {
                                        attendanc.map((x,i) =>
                                            <div className='row' key={i}>
                                                {/* <div scope="col-sm-2">{}</div>
                                                <div className='col-sm-2'>{x.osattendance}</div>
                                                <div className='col-sm-2' >{x.orattendance}</div>
                                                <div className='col-sm-2'>{x.dbmsattendance}</div>
                                                <div className='col-sm-2'>{x.attendance}</div> */}
                                            <div scope="col" className='col-sm-2 blockquote' >{x.rno}</div>
                                            <div scope="col" className='col-sm-2 blockquote'>{x.osattendance}%</div>
                                            <div scope="col" className='col-sm-2 blockquote'>{x.orattendance}%</div>
                                            <div scope="col" className='col-sm-2 blockquote' >{x.dbmsattendance}%</div>
                                            <div scope="col" className='col-sm-2 blockquote' >{x.attendance}%</div>
                                            <hr/>
                                          

                                            </div>
                                        )

                                    }


                                </div>
                            </div>


                         : null


                }
                <div>

                    {
                        showMedical ? <div>
                            <div className='row'>
                                <div scope="col" className='col-sm-3 blockquote' ><h5>Rollno</h5></div>
                                <div scope="col" className='col-sm-3 blockquote'><h5>Attendance</h5></div>
                                <div scope="col" className='col-sm-3 blockquote'><h5>Branch</h5></div>
                                <div scope="col" className='col-sm-3 blockquote' ><h5>Mobile</h5></div>


                                


                            </div>
                            <hr/>
                            <div>
                                {
                                    medical.map((x, i) =>
                                        <div className='row' key={i + 1}>
                                            
                                            <div scope="col" className='col-sm-3 blockquote' >{x.rollno}</div>
                                            <div scope="col" className='col-sm-3 blockquote'>{x.name}</div>
                                            <div scope="col" className='col-sm-3 blockquote'>{x.branch}</div>
                                            <div scope="col" className='col-sm-3 blockquote' >{x.mobile}</div>
                                          

                                        </div>
                                    )
                                }

                            </div>

                        </div> : null
                    }
                </div>
                <div>

                    {
                        showbelow65 ? <div>
                            <div className='row'>
                                <div scope="col" className='col-sm-4 blockquote' ><h5>Sno</h5></div>
                                <div scope="col" className='col-sm-4 blockquote' ><h5>Rollno</h5></div>
                                <div scope="col" className='col-sm-4 blockquote'><h5>Attendance</h5></div>
                    

                            </div>
                            <hr/>
                            <div>
                                {
                                    below65.map((x, i) =>
                                        <div className='row' key={i + 1}>
                                            <div scope="col" className='col-sm-4 blockquote' >{i + 1}</div>
                                            <div scope="col" className='col-sm-4 blockquote' >{x.rno}</div>
                                            <div scope="col" className='col-sm-4 blockquote'>{x.attendance}</div>
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
        </div>
    );
}
export default Secondpage;