import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { BsFillPersonFill } from 'react-icons/bs';
import './Hompage.css';
import img from './images/img.svg';
function Homepage() {
    const navigate = useNavigate();
    let handleClick = () => {
        navigate('/login')
    }

    return (
        <div className='main' >
            <div className='row ' >
                <div className='col-sm-8 mx-auto text-center mt-5'>
                    <h1 className='text-center head mb-2'>Student Attendance Database Manager</h1>
                <img src={img} height={250}/>
                </div>
                <div className='col-sm-4 '>
                    <p className='col2 mt-5 h5 pt-5'>Class Co-ordinator</p>
                    <BsFillPersonFill size={250}/><br></br>
                    <button className=' button ' onClick={handleClick}>Login</button>
                </div>
            </div>

        </div>
    )
}
export default Homepage;