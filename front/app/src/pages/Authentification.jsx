import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css'; // Importing the corresponding CSS file

function Login() {
    return (
        <div className='authentification'>
            <form>
                <h1><b>Authentification</b></h1>
                <div>
                    <label htmlFor="login">Login</label>
                    <input type='text' id='login' />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' placeholder='Password' />
                </div>
                <button>connexion</button>
                <span>vous n'avez pas encore un compte?<Link to="/inscri"> Inscivez-vous</Link></span>
            </form>
        </div>
    );
}

export default Login;
