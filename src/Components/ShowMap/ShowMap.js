import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import fakeData from '../../fakeData/fakeData';

const ShowMap = (props) => {
  const id = props.id;

  const tour = fakeData.find((item) => item.id === id);

  const [viewPort, setViewPort] = useState({
    latitude: tour.lat,
    longitude: tour.lng,
    width: '500px',
    height: '500px',
    center: [tour.lat, tour.lng],
    zoom: 13,
  });

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken="pk.eyJ1IjoianVhaWQiLCJhIjoiY2tmY2F1OTFrMTZ1bTM2bzVuc3c5YXY4dSJ9.eKRwgyE4P9zylqiJa1Q_FA"
        onViewportChange={(viewPort) => {
          setViewPort(viewPort);
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      ></ReactMapGL>
    </div>
  );
};

export default ShowMap;
