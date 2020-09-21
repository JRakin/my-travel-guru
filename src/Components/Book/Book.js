import React from 'react';
import './Book.css';
import fakeData from '../../fakeData/fakeData';
import ViewDetails from '../ViewDetails/ViewDetails';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from '@material-ui/core';

const Book = () => {
  const { id } = useParams();

  // booking info section

  const tourDetails = fakeData.find((tour) => tour.id === id);

  let history = useHistory();
  const handleSubmit = (id) => {
    history.push('/room/' + id);
  };

  return (
    <div>
      <Container>
        <div style={{ display: 'flex', color: '#fff' }}>
          <div style={{ width: '500px', margin: '100px 50px' }}>
            <ViewDetails showOnDetails={false} data={tourDetails}></ViewDetails>
          </div>
          <div className="placeForm">
            <form onSubmit={() => handleSubmit(id)}>
              <label htmlFor="">Origin</label> <br />
              <input type="text" placeholder="From*" required /> <br />
              <label htmlFor="">Destination</label> <br />
              <input
                type="text"
                name=""
                id=""
                placeholder="Destination*"
                required
              />
              <br />
              <label htmlFor="">Pick a date</label> <br />
              <input style={{ marginRight: '20px' }} type="date" required />
              <input type="date" name="" id="" required /> <br />
              <input type="submit" value="Proceed Order" />
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Book;
