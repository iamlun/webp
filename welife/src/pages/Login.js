import { useState } from 'react';
import '../pages/Login.css';
import { signup, login} from '../utils/firebase';
import { useNavigate } from "react-router-dom";
const Login = () => {
    const navigate=useNavigate();
    const [register,setRegister]=useState(true);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const handleSelect=(t)=>{
        setRegister(t);
    }
    const handleSubmit=()=>{
        if(!email){
            alert('please input email');
            return;
        }
        else if(!password){
            alert('please input password');
            return;
        }

        if(register===true){
            setLoading(true);
            signup(email,password)
            .then(()=>{
                setEmail('');
                setPassword('');
                alert('sign up succ, and login auto');
                navigate('/');
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err.code);
                switch(err.code){
                    case "auth/weak-password":
                        alert('weak-password');
                        break;
                    case "auth/email-already-in-use":
                        alert('email-already-in-use');
                        break;
                    case "auth/invalid-email":
                        alert('invalid-email');
                        break;
                    default:
                        break;
                }
                setLoading(false);
            })
            
        }
        else{
            setLoading(true);
            login(email,password)
            .then(()=>{
                setEmail('');
                setPassword('');
                navigate('/');
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err.code);
                switch(err.code){
                    case "auth/wrong-password":
                        alert('wrong-password');
                        break;
                    case "auth/user-not-found":
                        alert('user-not-found');
                        break;
                    case "auth/invalid-email":
                        alert('invalid-email');
                        break;
                    default:
                        break;
                }
                setLoading(false);
            })
        }
    }

    return (
        <div className="loginPage_wrapper">
            {loading && <div className='loginPage_loading'>Loading...</div> }
            {!(loading) && <div className="loginPage_select">
                <button className='loginPage_select-register' onClick={()=>handleSelect(true)}>SIGN UP</button>
                <button className='loginPage_select-login' onClick={()=>handleSelect(false)}>SIGN IN</button>
            </div>}
            { !(loading) && <div className="loginPage_info-wrapper">
                <div className="info_email">
                    <label>Email</label><br/>
                    <input type='text' className='info_email-input' placeholder='example@gmail.com' onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                </div>
                <div className="info_password">
                    <label>Password</label><br/>
                    <input type='password' className='info_password-input' onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                </div>
            </div>}
            { !(loading) && (register ? <button className='loginPage_sendbtn' onClick={()=>handleSubmit()}>Sign Up</button>:<button className='loginPage_sendbtn' onClick={()=>handleSubmit()}>Sign In</button>)}
        </div>
    );
}
 
export default Login;