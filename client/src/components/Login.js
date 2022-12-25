import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import { BsFillPersonFill, BsFillTelephoneFill, BsFillLockFill, BsBook } from "react-icons/bs";
import { AiTwotoneMail } from "react-icons/ai";
import { setDoc, doc, collection, getDocs, getDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { signOut, createUserWithEmailAndPassword, sendSignInLinkToEmail, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, child, get } from "firebase/database";
import './Login.css';
function Login() {
    let [email, setEmail] = useState()
    let [password, setPassword] = useState()
    const [user, setUser] = useState();
    const navigate = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, user => setUser(user));
    }, [])
    let verifyStatus=user?.emailVerified
    console.log(verifyStatus)
    let login = async () => {
        await signInWithEmailAndPassword(auth, email, password).then((x) => {
            
                if(email=="challa.tanmayi@yahoo.co.in"){
                    navigate('/admin')
                }
                else{
            navigate('/main')
                }
            

        }).catch(err => alert(err.message))
        // await get(child(db,"YbULHk4o8bhTPncZkWhLE4fTIk1")).then((val)=>{
        //   if(val.exists()){
        //     console.log(val.name)
        //   }
        //   else{
        //     console.log('no')
        //   }

        //   console.log(val)
        // }).catch(err=>console.log(err))
        const docRef = doc(db, "users", user?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data().name);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }


    }

    return (
    <div className="loginbackground">
        <div className='text-light '  >
            <div className="w-50  mx-auto login " >
                <div className="display-5  text-center serif   mb-5">Login</div>
                <div className="row">
                    <div className=" mx-auto">
                        <Form>
                            
                            <Form.Group className="mb-3">
                            <Row>
                                <Col lg={2} xs={2}><Form.Label  > <AiTwotoneMail size={25} className="ms-2"  /></Form.Label></Col>
                                <Col lg={9} xs={9}><Form.Control
                                    
                                    type="email"
                                    placeholder="Enter Mail ID" className="me-5 pe-4" onChange={(e) => setEmail(e.target.value)}

                                /></Col>
                            </Row>

                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                <Row>
                                <Col lg={2} xs={2}><Form.Label>< BsFillLockFill className='me-2 mt-1 ms-2' size={26} /></Form.Label></Col>
                                <Col lg={9} xs={9}><Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}

                                /></Col>
                                </Row>
                            </Form.Group>

                        </Form>
                        <p className="lead mt-3 text-end"><a href="forgot" className="text-light me-5 "><i>Forgot Password</i></a></p>
                        <Button variant="light" type="submit" className="mb-3" onClick={login}>
                            Login <MdLogin />
                        </Button>
                       
                    </div>
                </div>
            </div>

        </div>
        </div>
    );
}

export default Login;