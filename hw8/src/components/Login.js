import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
const Login = () => {
    return (
        <div className="login">
            <h3>CGU LOGIN</h3>
        <TextField label="username" required></TextField>
        <br/>
         <TextField label="password" type="password" required></TextField>
        <br/>
        <Button variant="contained" color="secondary" onClick={()=>{window.alert('Welcome');}} >登入</Button>
        </div>
    );
}
 
export default Login;