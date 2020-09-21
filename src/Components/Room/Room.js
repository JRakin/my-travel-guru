import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/fakeData';
import HotelRoom from '../HotelRoom/HotelRoom';
import ShowMap from '../ShowMap/ShowMap';

const Rooms = () => {
  const { id } = useParams();
  const tour = fakeData.find((tour) => tour.id === id);
  return (
    <div style={{ display: 'flex' }}>
      <div>
        {tour.room.map((item) => (
          <HotelRoom id={id} room={item}></HotelRoom>
        ))}
      </div>
      <div style={{ margin: '40px' }}>
        <ShowMap id={id}></ShowMap>
      </div>
    </div>
  );
};

export default Rooms;
