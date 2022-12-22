import React from 'react';
import PropTypes from 'prop-types';

function SingleBooking({dayIndex, time, updateValue}) {
  const timetable = [
    '12:00',
    '12:15',
    '12:30',
    '12:45',
    '13:00',
    '13:15',
    '13:30',
    '13:45',
    '14:00',
    '14:15',
    '14:30',
    '14:45',
    '15:00',
    '15:15',
    '15:30',
    '15:45',
    '16:00',
    '16:15',
    '16:30',
    '16:45',
    '17:00',
    '17:15',
    '17:30',
    '17:45',
    '18:00',
    '18:15',
    '18:30',
    '18:45',
    '19:00',
    '19:15',
    '19:30',
    '19:45',
    '20:00',
    '20:15',
    '20:30',
    '20:45',
    '21:00',
    '21:15',
  ];

  const day = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][dayIndex];

  return (
    <div className='bg-white mx-4 p-1 rounded-lg my-5'>
      <div className='grid grid-cols-5 gap-4 p-4'>
        <div className='col-start-1 col-end-2 flex flex-col justify-center'>
          <h1>{day}</h1>
        </div>
        <div className='col-start-4 col-end-6 flex justify-end'>
          <select className='bg-white rounded m-0 p-2 border-2 border-black'
            onChange={(e) => updateValue(dayIndex, e.target.value)} value={time}>
            <option key='8'>X</option>
            {timetable.map((singleTime, index) => <option key={index}>{singleTime}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}

SingleBooking.propTypes = {
  dayIndex: PropTypes.number,
  time: PropTypes.string,
  updateValue: PropTypes.func,
};

export default SingleBooking;
