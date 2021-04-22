import React, { useState } from 'react';
import './signIn.css';

async function loginUser(credentials) {
 return fetch('http://localhost:3000/', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => ({token:"test123"}))
}
function SignIn({ setToken,...rest }) {
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [formError, setFormError] = useState(null);
    const props = {...rest}
  
    const handleSubmit = async e => {
      e.preventDefault();
      if(username !== null && password !== null){
      const token = await loginUser({
        username,
        password
      });
      if(token){
              setToken(token);
      setFormError(null)
      props.showUserModal()
      localStorage.setItem('username', JSON.stringify(username));
      }


      }else{
          setFormError("نام کاربری یا رمز عبور نمیتواند خالی باشد")

      }
    }
  
    return (
        <div>
                  <form onSubmit={handleSubmit} className="d-flex flex-column">
                      <p className="text-danger">{formError}</p>
        <label>
          <p>نام کاربری</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>رمز عبوز</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">ورود</button>
        </div>
      </form>
        </div>
    )
}

export default SignIn
