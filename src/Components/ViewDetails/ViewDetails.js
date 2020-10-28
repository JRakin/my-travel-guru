import React from 'react';
import { Link } from 'react-router-dom';
import './ViewDetails.css';

const ViewDetails = (props) => {
  const data = props.data;

  return (
    <div>
      <h1 style={{ fontSize: '50px', margin: '20px 0' }}>{data.name}</h1>
      <p style={{ fontSize: '18px', textAlign: 'justify' }}>
        {data.description}
      </p>

      {props.showOnDetails && (
        <Link to={'/book/' + data.id}>
          <button className="btn bookBtn">Book now</button>
        </Link>
      )}
    </div>
  );
};

export default ViewDetails;
