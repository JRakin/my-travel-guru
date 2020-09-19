import React from 'react';
import { Link } from 'react-router-dom';
import './ViewDetails.css';

const ViewDetails = (props) => {
  const data = props.data;
  const to = `/book/${data.id}`;
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <Link to={to}>
        <button className="bookBtn">Book now</button>
      </Link>
    </div>
  );
};

export default ViewDetails;
