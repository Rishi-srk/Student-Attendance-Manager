import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch } from 'react-icons/bs';
import './secondapage.css';
import React from 'react'
import { json, Link } from 'react-router-dom'
import { Form, FormControl, Button, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faCartArrowDown, faHeart, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import jsondata from '../students.json';

// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import {Form} from 'react-bootstrap/Form'
function Secondpage() {
    const [show, setShow] = useState(false);
    const sData = jsondata.students;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let [showStudent, setStudent] = useState(false)
    let [data, setData] = useState("")
    let handleCLick = () => {
        setStudent(!showStudent)
        setData(jsondata)
        console.log(jsondata)
    }

    return (
        <div className='w-100 h-100' style={{ backgroundColor: '#CFFF8D' }}>
            <div className='first-navbar w-100'>
                <nav className="w-100 navbar navbar-expand-lg p-2 m-0 justify-content-between gap-2" style={{ backgroundColor: '#749F82' }} >
                    <button onClick={handleShow} className="navbar-toggler bg-light shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown #navbar2" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>


                    <Offcanvas show={show} onHide={handleClose} className='w-50'>
                        <Offcanvas.Header closeButton style={{ backgroundColor: '#557B83' }}>
                            <Offcanvas.Title className='text-light' > Categories</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body style={{ backgroundColor: '#557B83' }}>


                            <ul className="navbar-nav navbar-collapse d-flex flex-column justify-content-center gap-2  text-center w-100 "  >
                                <li className="nav-item nav-items-2 border w-100 "><Link className='nav-link text-light' to='development'>Students</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' to='marketing'>Subjects</Link></li>
                                <li className="nav-item nav-items-2 border w-100"><Link className='nav-link text-light' to='itsoftware'>Total Attendance</Link></li>


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
                                        <Dropdown.Item href="/business" className='p-2'>Subjects</Dropdown.Item>
                                        <Dropdown.Item href="/music" className='p-2'>Total Attendance</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>


                            <li className="nav-item ">
                                {/* search bar */}

                                <Form >

                                    {/* <span className=""><FontAwesomeIcon icon={faMagnifyingGlass}  /></span>  */}
                                    <FormControl
                                        type="search"
                                        placeholder="Search for anything"
                                        className=" p-2 m-2 border-1 rounded-pill shadow-none border-dark "
                                        aria-label="Search"
                                        style={{ width: "40rem" }}
                                    />

                                </Form>

                            </li>
                        </ul>


                    </div>

                </nav>
            </div>

            <h4 className='mt-5 ms-5 me-5 display-6'>Result:</h4>
            <div className=' mt-3 ms-5 me-5 p-5' style={{ backgroundColor: '#E9EFC0' }} >
                <div className='bg'></div>
            {showStudent?
            <div>
                <table class="table">
  <thead>
    <tr>
      <th scope="col">Rno</th>
      <th scope="col">Name</th>
      <th scope="col">Class</th>
      <th scope="col">Phno</th>
      <th scope='col'>Address</th>
    </tr>
  </thead>
  <tbody>
    {sData.map((data)=>
    <tr>
      <th scope="row">{data.rno}</th>
      <td>{data.name}</td>
      <td>{data.class}</td>
      <td>{data.phno}</td>
      <td>{data.address}</td>
    </tr>
    )
        
    }
    
    
  </tbody>
</table>
                 
            </div>:<div> </div>}


            </div>
        </div>
    );
}
export default Secondpage;