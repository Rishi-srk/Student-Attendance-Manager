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
import { Controller, useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';


function Updateattendance(){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    const navigate=useNavigate()
    let [students,setStudents]=useState(null)
    const[email,setEmail]=useState()
    const [user,setUser]=useState()
    let [val,setVal]=useState()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [dbms,setDbms]=useState(true)
    let [os,setOS]=useState(false)
    let [or,setOR]=useState(false)
    let [isloading,setIsloading]=useState(true)
    let [loading,setLoading]=useState(true)
    let [check,setCheck]=useState([])
    let [data,setData]=useState()
      var showdate= new Date()
      var today= showdate.getDate()+'/'+(showdate.getMonth()+1)+'/'+showdate.getFullYear()
    const getData =  () => {
         onAuthStateChanged(auth, user => {
        setUser(user)
        setEmail(user.email)
        setLoading(false)
    }
)
if(user){
    getStudents()
}
        
        
    }

    useEffect(() => {
        
        getData()
       
       
        
       
        
        
    }, [email])
    let [cnt,setCnt]=useState({
        dbms:0,
        os:0,
        or:0
    })
    const getStudents=async()=>{
        console.log(user?.email)
            axios.post("http://localhost:5000/getsectio",{"email":user?.email}).then((x) => {
                setStudents(x.data.payload)
                setIsloading(false)
                console.log(x.data.payload)
            }).catch(err => console.log(err))
      
        
    }
    let handleDbms=()=>{
        setDbms(true)
        setOR(false)
        setOS(false)
    }
  
    let handleos=()=>{
        setDbms(false)
        setOR(false)
        setOS(true)

    }
    let handleor=()=>{
        setDbms(false)
        setOR(true)
        setOS(false)

    }
    const [checkedvalues,setValue]=useState()
    // let handleChange=(e)=>{
    //     const {value,checked}=e.target
    //     if(checked){
    //         setValue(pre=>[...pre,value])
    //     }
    //     else{
    //         setValue(pre=>{
    //             return [...pre.filter(skill=>skill!==value)]
    //         })
    //     }
    //     console.log(checkedvalues)
    // }

    let onFormSubmit=(e)=>{
        
        console.log(e.rollno)
        let rollno=e.rollno
        let subject;
        if(dbms){
            subject="dbms";
        }
        else if(os){
            subject="os";
        }
        else{
            subject="or";
        }
        console.log(subject)
        let data={subject:subject,rollno:e.rollno}
        console.log(data)
        axios.post("http://localhost:5000/addattendance",data).then(()=>{
            console.log("success")
            alert("attendance updated successfully")
            
    
    
    }
        ).catch(err=>console.log(err))
    alert('attendance updated successfully')
    }
    let handleMain=()=>{
        navigate('/main')
    }

    return(
        <div className='attendancepage' >
            <nav className="w-100 navbar navbar-expand-lg p-2 m-0 justify-content-between gap-2" style={{ backgroundColor: '#4b86b4' }} >
                    <button onClick={handleShow} className="navbar-toggler bg-light shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown #navbar2" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    
                    

                    <Offcanvas show={show} onHide={handleClose} className='w-50'>
                        <Offcanvas.Header closeButton style={{ backgroundColor: '#557B83' }}>
                            <Offcanvas.Title className='text-light' > Subjects</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ backgroundColor: '#557B83' }}>

                       
                            <ul className="navbar-nav navbar-collapse d-flex flex-column justify-content-center gap-2  text-center w-100 "  >
                                <li className="nav-item nav-items-2 border w-100 "><Link className='nav-link text-light'onClick={handleDbms} >DBMS</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light'  onClick={handleos} >OS</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light'  onClick={handleor} >OR</Link></li>
                                


                            </ul>
                        </Offcanvas.Body>
                    </Offcanvas>
                    

                    {/* Collapsible navbar */}
                    <div className=" nav-item collapse navbar-collapse" id="navbarNavDropDown">

                        <ul className="navbar-nav navbar-collapse justify-content-around p-0" >

                            <li className="nav-item ">
                                {/* <Button className="btn border-0 bg-light text-dark shadow-none ms-3" >Categories</Button> */}
                                <Dropdown>
                                    <Dropdown.Toggle id="dropdown-basic" className=' text-light shadow-none border-0' style={{ backgroundColor: '#4b86b4' }}>Subjects</Dropdown.Toggle>

                                    <Dropdown.Menu className='p-2 dropdown-menu shadow' style={{ backgroundColor: '#E1FFB1' }} >
                                        <Dropdown.Item  className='p-2' onClick={handleDbms}>DBMS</Dropdown.Item>
                                        <Dropdown.Item  className='p-2' onClick={handleos}>OS</Dropdown.Item>
                                        <Dropdown.Item className='p-2' onClick={handleor}>OR</Dropdown.Item>
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>


                            <li className="nav-item ">
                                <button className='btn btn-light' onClick={handleMain} >Go to Main</button>

                               

                            </li>
                        </ul>


                    </div>

                </nav>
             <div className='secondpage'>     
            <h2>Update Attendance for {today}</h2>
            {
              isloading===true?(<div> </div>)  :
               <div>
                <div className=' mt-3 ms-5 me-5 p-5' style={{ backgroundColor: '#E9EFC0' }} >
                 
                 <div className='row p-1 mb-3 '> 
                 <div className='col-sm-3 h5 mb-3'> Name</div>
                 <div className='col-sm-3 h5'>Rollno </div>
                 {
                    dbms?<div className='col-sm-2 h5  '>DBMS</div>:os? <div className='col-sm-2 h5 '>OS </div>:or?  <div className='col-sm-2 h5 '>OR</div>:null
                 }


                 
                 </div>
                 <form onSubmit={handleSubmit(onFormSubmit)}>
                 {
                    students.map((x,i)=>

                    <div className='row   p-1 ' key={i}>
                        <div className='col-sm-3 mb-3'> {x.name}</div>
                        <div className='col-sm-3'>{x.rollno}</div>
                        <div className="form-check col-sm-3 ms-5">
                        <input className="form-check-input ms-5" type="checkbox" value={x.rollno} name="DBMS" id="flexCheckDefault" {...register("rollno")}/>
                        </div>
                       <hr/>

                    </div>)
                 }
                 <button className='btn btn-primary mt-5' type='submit'>Submit</button>
                 </form>
                 </div>
                 </div>
            }
            </div>  
            
            

        </div>
    )
}
export default Updateattendance;