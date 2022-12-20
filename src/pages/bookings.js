import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../authcontext.js';
import TopBar from '../components/topbar';
import {Link, Navigate} from 'react-router-dom';
import CrossIcon from '../icons/cross.svg';
import InfoIcon from '../icons/info.svg';
import SettingsIcon from '../icons/settings.svg';
import {auth} from '../firebase.js';
import {signOut} from 'firebase/auth';
import SingleBooking from '../components/singleBooking.js';


function Bookings() {
  const {userLoaded, user} = useContext(UserContext);
  const [state, setState] = useState(['X', 'X', 'X', 'X', 'X', 'X', 'X']);

  if (!userLoaded || !user) {
    return <Navigate to='/' redirect />;
  }

  async function logout() {
    await signOut(auth);
  }

  function update(dayIndex, time) {
    setState((oldState) => {
      const newState = [...oldState];
      newState[dayIndex] = time;
      return newState;
    });
  }

  useEffect(() => {
    console.log(state);
  }, [state]);


  return (
    <div className='min-h-screen bg-black'>
      <TopBar title='BOOKINGS' />
      <div className='flex justify-around min-h-min mt-3 mb-8'>
        <Link to='/settings'><img src={SettingsIcon} width={70}/></Link>
        <Link to='/info'><img src={InfoIcon} width={20}/></Link>
        <button onClick={logout}><img src={CrossIcon} width={50}/></button>
      </div>
      {state.map((item, index) => <SingleBooking key={index} dayIndex={index} time={item.time} updateValue={update}/>)}
    </div>
  );
}

export default Bookings;
