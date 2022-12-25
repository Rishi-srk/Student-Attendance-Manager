import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import {BsFillPersonFill,BsFillTelephoneFill,BsFillLockFill,BsBook } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import {auth,db} from '../Firebase';
import {signOut,getAuth,createUserWithEmailAndPassword,sendSignInLinkToEmail,sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail,onAuthStateChanged,updateProfile} from 'firebase/auth';
import {child, get, onValue,ref} from 'firebase/database';
import {setDoc,doc,collection,getDocs,getDoc} from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { faColonSign } from "@fortawesome/free-solid-svg-icons";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Signup.css';
function Signup() {
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    const [user, setUser] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const gotoLogin=()=>navigate('/login')
    let [name,setName]=useState("")
    let [phno,setPhno]=useState("")
    let [section,setSection]=useState("")
    const [err,setErr]=useState("")
    const navigate = useNavigate()
    console.log(email,password,name)
    console.log(name)
    useEffect(() => {
        onAuthStateChanged(auth, user => setUser(user));
    }, [])

    const  signup=async(e)=>{
        e.preventDefault()
        let data={name:name,class:section,mail:email}
         axios.post('http://localhost:5000/insertFaculty',data).then((x)=>console.log("success",x)).catch(err=>console.log(err))
        await createUserWithEmailAndPassword(auth,email,password)
        .then(async (x)=>{
          console.log(x)
          const auth=getAuth()
          updateProfile(auth.currentUser,{
            displayName:name
          })
          
          await setDoc(doc(db, "database",x.user?.uid ),{Name:name,Phno:phno,Section:section} );
          await sendEmailVerification(auth.currentUser)
        .then(() =>setShow(true)).catch(e=>console.log(e))
          
        })
        .catch(e=>{
          
          let errorcode=e.code.split("auth/")[1]
          alert(errorcode)
          
        })
        
    
      }
 return (
    <div className='container-fluid  text-light signup'  >
      
      <div className=" w-50 rounded mx-auto second" >
      <div className="display-4 text-center mb-3">Add a Faculty</div>
      <div className="row">
        <div className="  mx-auto">
      <Form onSubmit={signup}>
        {/* username */}
        <Form.Group className="mb-3">
          <Row>
          <Col lg={2} xs={2}><Form.Label> <BsFillPersonFill className='mt-2' size={25} /></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="text"
            placeholder="Enter Name" onChange={(e)=>setName(e.target.value)}/></Col>
            </Row>
        </Form.Group>
        
        <Form.Group className="mb-3">
        <Row>
          <Col lg={2} xs={2}><Form.Label> <AiTwotoneMail size={25} className='mt-2'/></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="email"
            placeholder="Enter Mail ID"
            onChange={(e)=>setEmail(e.target.value)}
          /></Col>
        </Row>
          
        </Form.Group>

        
        {/* city */}
        <Form.Group className="mb-3">
          <Row>
          <Col lg={2} xs={2}><Form.Label>< BsFillLockFill className='mt-2' size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e)=>setPassword(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3">
          <Row>
          <Col lg={2} xs={2}><Form.Label><BsBook className='mt-2' size={25}/></Form.Label></Col>
          <Col lg={9} xs={9}><Form.Control
            type="text"
            placeholder="Enter Section"
            onChange={(e)=>setSection(e.target.value)}
          /></Col>
          </Row>
        </Form.Group>
        <Button variant="light" type="submit" >
          Signup <MdLogin />
        </Button>
      </Form>
      <p className="lead">Already have an account?Click here to <a href="login" className="text-light">Login</a></p>
      </div>
      </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Check ur mail to verify your acccount</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={gotoLogin}>
           Go to  Login Page
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>
  );
}

export default Signup;