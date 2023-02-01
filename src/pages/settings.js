import React, {useContext, useState} from 'react';
import {UserContext} from '../authcontext.js';
import {Navigate, Link} from 'react-router-dom';
import TopBar from '../components/topbar.js';
import {db} from '../firebase.js';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import BookingIcon from '../icons/book.svg';
import InfoIcon from '../icons/info.svg';
import Modal from '../components/modal.js';

function Settings() {
  const {userLoaded, user} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  if (!userLoaded || !user) {
    return <Navigate to='/' />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (email == '' || password == '') {
      setModalState({
        showModal: true,
        text: 'Please fill in all fields',
      });
      return;
    }
    async function setData() {
      const q = query(collection(db, 'credentials'), where('user', '==', user.uid));
      try {
        const cred = (await getDocs(q)).docs;
        // In case gcloud function is slow
        if (cred.length == 0) {
          return 1;
        }
        await updateDoc(cred[0].ref, {credentials: [email, password]});
        e.target.reset();
        setModalState({
          showModal: true,
          text: 'Credentials saved!',
        });
        return 0;
      } catch (err) {
        setModalState({
          showModal: true,
          text: 'Error: ' + err.message,
        });
        return -1;
      }
    }

    // if setData() returns 1, it means that the gcloud function is slow
    if (await setData() == 1) {
      setTimeout(setData, 1500);
    }
  }

  return (
    <div className='min-h-screen bg-black'>
      <Modal show={modalState.showModal} onClose={resetModal} text={modalState.text} />
      <TopBar title='SETTINGS' />
      <div className='flex justify-around min-h-min mt-3 mb-8'>
        <Link to='/bookings'><img src={BookingIcon} width={120}/></Link>
        <Link to='/info'><img src={InfoIcon} width={20}/></Link>
      </div>
      <div className="
      container mx-auto ">
        <form className="bg-white rounded p-8 m-3" onSubmit={handleSubmit}>
          <h3 className='text-center text-red-600 mb-6'>!STORE CREDENTIALS!</h3>
          <label htmlFor="email" className='block mb-2
          text-black'>Booking Email</label>
          <input type="text" id="email" name="email"
            className= 'shadow appearance-none border rounded w-full
            py-3 px-3 text-gray-700 leading-tight border-black
            focus:outline-none focus:shadow-outline text-[0.7rem]'
            onChange={(e) => setEmail(e.target.value)}/>

          <label htmlFor="password" className="
          block mb-2 mt-6 text-black">Booking Password</label>
          <input type="password" id="password" name="password"
            className='shadow appearance-none border rounded w-full
            py-3 px-3 text-gray-700 border-black
            leading-tight focus:outline-none focus:shadow-outline'
            onChange={(e) => setPassword(e.target.value)}/>
          <div className="flex items-center justify-center mt-10">
            <button className="bg-black text-white
            rounded-full text-base px-4 py-2">Change Credentials</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
