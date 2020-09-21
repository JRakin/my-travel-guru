import React from 'react';
import './HotelRoom.css';

const HotelRoom = (props) => {
  const room = props.room;
  return (
    <div>
      <div className="roomInfo">
        <div>
          <img style={{ width: '240px' }} src={room.image} alt="room_photo" />
        </div>
        <div style={{ marginLeft: '15px' }}>
          <h2 style={{ margin: '5px 0', fontSize: '22px', fontWeight: '400' }}>
            {room.roomName}
          </h2>
          <div>
            <div className="aptInfo" style={{ display: 'flex' }}>
              <h4>{room.numberOfGuests} Guests</h4>
              <h4>{room.numberOfBedroom} Bedrooms</h4>
              <h4>{room.numberOfBed} Bed</h4>
              <h4>{room.numberOfBath} Baths</h4>
            </div>
            <div>
              <p
                style={{
                  margin: '5px 0',
                  fontSize: '15px',
                  fontWeight: '300',
                }}
              >
                {room.roomDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelRoom;
