import { useState } from "react";

const Login = () => {

    const [username,setUsername]=useState('');
    const [userpassword,setUserpassword]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        window.alert(`${username},您好`);
        setUsername('');
        setUserpassword('');
    }
    return (
        <div className="login">
            <p className="login_title">CGU LOGIN</p>
            <form className="login_form" onSubmit={handleSubmit}>
                <label>USER NAME</label>
                <input type="text" required className="login_name" value={username} onChange={(e)=>setUsername(e.target.value)}></input><br/>
                <label>PASSWORD</label>
                <input type="password" required className="login_password" value={userpassword} onChange={(e)=>setUserpassword(e.target.value)}></input><br/>
                <button className="login_btn">登入</button>
            </form>
        </div>
    );
}
 
export default Login;