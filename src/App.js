import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Route,useLocation } from 'react-router-dom';
import Homepage from './components/Homepage';
import Secondpage from './components/Secondpage';
import Signup from './components/Signup';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import Adminpage from './components/Adminpage';
import { auth, db } from './Firebase';
import { signOut, createUserWithEmailAndPassword, sendSignInLinkToEmail, sendEmailVerification, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth';
import AddStudent from './components/Addstudent';
import Updateattendance from './components/Updateattendance';
import StudentsPage from './components/Studentspage';


function App() {
  let location=useLocation()
  console.log(location.pathname)
  if(location.pathname=='/login'){
    signOut(auth).then(() => {
      
    }).catch((error) => {
      
    });
  }


  
  return (
    <div className="App">
     
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='main' element={<Secondpage/>}/>
        <Route path='login' element={<Login />}/>
        <Route path='signup' element={<Signup/>}/>
        <Route path='forgot' element={<ForgotPassword/>}/>
        <Route path='admin' element={<Adminpage/>}/>
        <Route path='addfaculty' element={<Signup/>}/>
        <Route path='addstudent' element={<AddStudent/>}/>
        <Route path='updateattendance' element={<Updateattendance/>}/>
        <Route path='studentspage' element={<StudentsPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
