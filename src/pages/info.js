import React from 'react';
import {Link} from 'react-router-dom';
import TopBar from '../components/topbar';
import HomeIcon from '../icons/home.svg';

function Info() {
  return (
    <div className="min-h-screen bg-black">
      <TopBar title="INFO" />
      <p className="text-white text-sm p-4">
        This simple app is meant to help you book your gym slots automatically.
        Once logged in ensure you have added your credentials in the settings page.
        Every day at 12:05am the app will check for available slots and book according to your preferences.
        <br />
        <br />
        To modify your preferences, go to the bookings page and modify them accordingly. Once you are satisfied,
        click the tick button at the bottom to save preferences.
        <br />
        <br />
        The app is HIGHLY experimental and may not work as expected. Report any issues to the developer.
      </p>
      <div className='flex justify-around min-h-min mt-20'>
        <Link to='/'><img src={HomeIcon} width={70}/></Link>
      </div>
    </div>
  );
}

export default Info;
