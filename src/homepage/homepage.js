import React, {useState} from 'react';
import TopBar from '../components/topbar';

function HomePage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
  }

  return (
    <div className="min-h-screen bg-black">
      <TopBar title="BOT" />
      <div className="
      container mx-auto pt-20">
        <form className="bg-white rounded p-8 m-3" onSubmit={handleSubmit}>
          <label htmlFor="email" className='block mb-2
          text-black'>Email</label>
          <input type="text" id="email" name="email"
            className= "shadow appearance-none border rounded w-full
            py-3 px-3 text-gray-700 leading-tight
            focus:outline-none focus:shadow-outline text-[0.7rem]"
            onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password" className="
          block mb-2 mt-6 text-black">Password</label>
          <input type="password" id="password" name="password"
            className= "shadow appearance-none border rounded w-full
            py-3 px-3 text-gray-700
            leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setPassword(e.target.value)}/>
          <div className="flex items-center justify-center mt-10">
            <button className="bg-black text-white
            rounded-full text-base px-8 py-2">Log In</button>
          </div>
        </form>
        <div className="flex items-center justify-center mt-20">
          <button className="bg-white text-black
          rounded-full text-base px-8 py-6">SIGN UP</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
