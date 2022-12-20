import React, {useState, useContext} from 'react';
import {UserContext} from '../authcontext';
import TopBar from '../components/topbar';
import {Navigate, Link} from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

function SignUp() {
  async function handleSubmit(e) {
    e.preventDefault();
    const reEmail = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;
    if (!reEmail.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (password !== confirmPsw) {
      alert('Passwords do not match');
      return;
    }

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert('Error creating account: ' + err.message);
    }
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPsw, setConfirm] = useState('');
  const {userLoaded, user} = useContext(UserContext);

  if (userLoaded && user) {
    return <Navigate to='/bookings' redirect />;
  }


  return (
    <div className="min-h-screen bg-black">
      <Link to='/'>
        <TopBar title="BOT" />
      </Link>
      <div className="
      container mx-auto pt-20">
        <form className="bg-white rounded p-8 m-3" onSubmit={handleSubmit}>
          <label htmlFor="email" className='block mb-2
          text-black'>Email</label>
          <input type="text" id="email" name="email"
            className= 'shadow appearance-none border border-black
            rounded w-full
            py-3 px-3 text-gray-700 leading-tight
            focus:outline-none focus:shadow-outline text-[0.7rem]'
            onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password" className="
          block mb-2 mt-6 text-black">Password</label>
          <input type="password" id="password" name="password"
            className='shadow appearance-none border border-black
            rounded w-full
            py-3 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline'
            onChange={(e) => setPassword(e.target.value)}/>

          <label htmlFor="confirmPsw" className="
          block mb-2 mt-6 text-black">Confirm Password</label>
          <input type="password" id="confirmPsw" name="confirmPsw"
            className='shadow appearance-none border border-black
            rounded w-full
            py-3 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline'
            onChange={(e) => setConfirm(e.target.value)}/>
          <div className="flex items-center justify-center mt-10">
            <button className="bg-black text-white
            rounded-full text-base px-8 py-2">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
