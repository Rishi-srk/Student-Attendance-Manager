import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { BsFillPersonFill } from 'react-icons/bs';
function Homepage() {
    const navigate = useNavigate();
    let handleClick = () => {
        navigate('/main')
    }

    return (
        <div className='App'>
            <div className='row  mt-5' >
                <div className='col-sm-8 mx-auto text-center'>
                    <h1 className='text-center head'>Student Database Manager</h1>
                    <p className='para  text-white'> Created By Team 11</p>
                </div>
                <div className='col-sm-4 '>
                    <p className='col2'>Faculty</p>
                    <button className='button text-white' >Login</button>
                </div>
            </div>

        </div>
    )
}
export default Homepage;