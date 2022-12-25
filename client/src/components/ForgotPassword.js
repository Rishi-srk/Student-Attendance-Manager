import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import {BsFillPersonFill,BsFillTelephoneFill,BsFillLockFill,BsBook } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import {signOut,createUserWithEmailAndPassword,sendSignInLinkToEmail,sendEmailVerification,signInWithEmailAndPassword,sendPasswordResetEmail,onAuthStateChanged} from 'firebase/auth';
import {auth,db} from '../Firebase';
function ForgotPassword() {
  let [email,setEmail]=useState()
  let handleSubmit=(e)=>{
    e.preventDefault()
    sendPasswordResetEmail(auth,email).then(()=>alert('link sent to mail')).catch(e=>{
      alert(e.message)
      console.log(e)
    }
    )
  }
 return (
    <div className='container-fluid mt-5 text-light'  >
      <div className="bg-light w-50 rounded mx-auto" style={{backgroundImage:`Url(https://media.istockphoto.com/id/1300397135/vector/violet-purple-and-navy-blue-defocused-blurred-motion-gradient-abstract-background.jpg?s=612x612&w=0&k=20&c=YH_QbC3h3uaxsr9X55MG4oeeySjmSXHL8yKTYVYfsSU=)`,backgroundRepeat:'NoRepeat', backgroundSize:'cover',marginTop:'6rem',padding:'1rem'}}>
      <div className="display-6 text-center  mt-5">Forgot Password</div>
      <div className="row">
        <div className="col-12 col-sm-8 col-md-6  mx-auto">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-3">
          <Form.Label> <AiTwotoneMail className='me-2'/>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Mail ID"
            onChange={(e)=>setEmail(e.target.value)}
          />
          
        </Form.Group>
        <Button  variant="light" type="submit" className="mb-3 ms-3" >
          Submit <MdLogin />
        </Button>
        
      </Form>
      
        <p className="lead mt-3 text-center"><a href="login" className="text-light">Go back to login</a></p>
      </div>
      </div>
      </div>
      
    </div>
  );
}

export default ForgotPassword;