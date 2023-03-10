import React, {useEffect, useState, useContext} from 'react';
import {UserContext} from '../authcontext.js';
import TopBar from '../components/topbar';
import {Link, Navigate} from 'react-router-dom';
import CrossIcon from '../icons/cross.svg';
import InfoIcon from '../icons/info.svg';
import SettingsIcon from '../icons/settings.svg';
import TickIcon from '../icons/tick.svg';
import {db, auth} from '../firebase.js';
import {signOut} from 'firebase/auth';
import SingleBooking from '../components/singleBooking.js';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import Modal from '../components/modal.js';


function Bookings() {
  const {userLoaded, user} = useContext(UserContext);
  const [state, setState] = useState(['X', 'X', 'X', 'X', 'X', 'X', 'X']);
  const [modalState, setModalState] = useState({
    showModal: false,
    text: '',
  });

  function resetModal() {
    setModalState({
      showModal: false,
      text: '',
    });
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

  async function submitChanges(e) {
    e.preventDefault();
    const q = query(collection(db, 'timetables'), where('user', '==', user.uid));
    const table = (await getDocs(q)).docs[0];
    await updateDoc(table.ref, {table: state});
    setModalState({
      showModal: true,
      text: 'Changes saved!',
    });
  }

  useEffect(() => {
    async function fetchData() {
      if (!userLoaded || !user) {
        return 0;
      }
      const q = query(collection(db, 'timetables'), where('user', '==', user.uid));
      try {
        let table = (await getDocs(q)).docs;
        if (table.length == 0) {
          return 1;
        }
        table = table[0].data().table;
        setState(table);
        return 0;
      } catch (error) {
        setModalState({
          showModal: true,
          text: 'Error: ' + error.message,
        });
        return -1;
      }
    }

    // In case the gcloud function has not already done its job
    if (fetchData() == 1) {
      setTimeout(fetchData, 1500);
    }
  }, []);


  if (!userLoaded || !user) {
    return <Navigate to='/' redirect />;
  }


  return (
    <div className='min-h-screen bg-black'>
      <Modal show={modalState.showModal} onClose={resetModal} text={modalState.text} />
      <TopBar title='BOOKINGS' />
      <div className='flex justify-around min-h-min mt-3 mb-8'>
        <Link to='/settings'><img src={SettingsIcon} width={70}/></Link>
        <Link to='/info'><img src={InfoIcon} width={20}/></Link>
        <button onClick={logout}><img src={CrossIcon} width={50}/></button>
      </div>
      {state.map((item, index) => <SingleBooking key={index} dayIndex={index} time={item} updateValue={update}/>)}
      <div className='flex justify-center py-2'>
        <button><img src={TickIcon} width={50} onClick={submitChanges} /></button>
      </div>
    </div>
  );
}

export default Bookings;
