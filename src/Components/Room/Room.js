import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import HotelRoom from '../HotelRoom/HotelRoom';

const Rooms = () => {
  const { id } = useParams();
  const tour = fakeData.find((tour) => tour.id === id);
  return (
    <div>
      {tour.room.map((item) => (
        <HotelRoom room={item}></HotelRoom>
      ))}
    </div>
  );
};

export default Rooms;
