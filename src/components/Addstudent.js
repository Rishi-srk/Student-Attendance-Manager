import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import {BsFillPersonFill,BsFillTelephoneFill,BsFillLockFill,BsBook,BsCalendar2Date,BsFillHddStackFill,BsMap,BsPersonPlusFill} from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, db } from '../Firebase';
import { useEffect } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { signOut, createUserWithEmailAndPassword, sendSignInLinkToEmail, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import './Addstudent.css'
function AddStudent() {
    let [rno,Setrno]=useState()
    let [name,setName]=useState()
    let [branch,setBranch]=useState()
    let [dob,setDob]=useState()
    let [phno,setPhno]=useState()
    let [address,setAddress]=useState()
    let [medical,setMedical]=useState()
    let [user,setUser]=useState()
    let navigate=useNavigate()
    useEffect(() => {
      onAuthStateChanged(auth, user => setUser(user));
  }, [])
    let handleSubmit=async(e)=>{
        e.preventDefault()
        console.log(rno,name,branch,dob,phno,address,medical)
        let data={rollno:rno,name:name,branch:branch,dob:dob,mobile:phno,address:address,medicalproof:medical}
        await axios.post("http://localhost:5000/addstudent ",data).then((x)=>console.log("sucess")).catch(err=>console.log(err))
        if(user?.email==="challa.tanmayi@yahoo.co.in"){
          navigate('/admin')
        }
        else{
        navigate('/main')
        }

    }
 return (
    <div className='container-fluid  text-light addstudent'  >
      <div className="w-50  mx-auto second" >
      <div className="display-4 text-center  ">Add Student</div>
      <div className="row">
        <div className=" mx-auto">
      <Form onSubmit={handleSubmit}>
        {/* username */}
        
        <Form.Group className="mb-3 mt-3">
        <Row>
          <Col lg={2} xs={2}><Form.Label > <BsPersonPlusFill className='me-1 mt-1' size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="text"
            placeholder="Enter Roll No"
            onChange={(e)=>Setrno(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Row>
          <Col lg={2} xs={2}><Form.Label  >  <BsFillPersonFill className='me-2' size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={(e)=>setName(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>

    
        <Form.Group className="mb-3">
        <Row>
          <Col lg={2} xs={2}><Form.Label ><BsFillHddStackFill className='me-2' size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="text"
            placeholder="Enter branch"
            onChange={(e)=>setBranch(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>
        {/* city */}
        
        <Form.Group className="mb-3">
          <Row>
          <Col lg={2} xs={2}><Form.Label ><BsCalendar2Date className='me-2' size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="date"
            placeholder="Enter DOB"
            onChange={(e)=>setDob(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3">
          <Row>
         <Col lg={2} xs={2}><Form.Label ><BsFillTelephoneFill className='me-1' size={25}/></Form.Label></Col> 
          <Col lg={9} xs={9}><Form.Control
            type="number"
            placeholder="Enter Mobile No."
            onChange={(e)=>setPhno(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
          <Col lg={2} xs={2}><Form.Label ><BsMap className='me-2 ' size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="text"
            placeholder="Enter address"
            onChange={(e)=>setAddress(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
          <Col lg={2} xs={2}><Form.Label ><BsBook className='me-2'size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}> <Form.Control
            type="text"
            placeholder="Enter Medical Proof confirmation"
            onChange={(e)=>setMedical(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>
        <Button variant="light" type="submit"  className="mb-4 mt-2">
          Add Student <MdLogin />
        </Button>
      </Form>
      </div>
      </div>
      </div>
      
    </div>
  );
}

export default AddStudent;