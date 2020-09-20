import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import './Tours.css';
import fakeData from '../../fakeData/fakeData';
import ViewDetails from '../ViewDetails/ViewDetails';

const Tours = () => {
  const data = fakeData;

  const [view, setView] = useState(data[0]);

  const handleView = (item) => {
    setView(item);
  };

  return (
    <div className="tourSection">
      <Container>
        <div className="views">
          <div style={{ margin: '0 auto' }}>
            <ViewDetails showOnDetails={true} data={view}></ViewDetails>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '20px 10px' }}>
              <button className="imageBtn" onClick={() => handleView(data[0])}>
                <img
                  src="https://i.ibb.co/JywV349/Sajek.png"
                  alt="item"
                  width="235"
                  height="305"
                  style={{ margin: '0 auto' }}
                />
              </button>
            </div>
            <div style={{ padding: '20px 10px' }}>
              <button className="imageBtn" onClick={() => handleView(data[1])}>
                <img
                  src="https://i.ibb.co/Qp6NMHD/Sreemongol.png"
                  alt="item"
                  width="235"
                  height="305"
                  style={{ margin: '0 auto' }}
                />
              </button>
            </div>
            <div style={{ padding: '20px 10px' }}>
              <button className="imageBtn" onClick={() => handleView(data[2])}>
                <img
                  src="https://i.ibb.co/z5v75MT/sundorbon.png"
                  alt="item"
                  width="235"
                  height="305"
                  style={{ margin: '0 auto' }}
                />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Tours;
