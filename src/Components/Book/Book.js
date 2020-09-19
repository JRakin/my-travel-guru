import { Container } from '@material-ui/core';
import React from 'react';

const Book = () => {
  return (
    <div>
      <Container>
        <div>
          <div>
            <h1>Hello</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              nam, non natus ipsam autem quia! Quisquam facere tempore nemo,
              iste laboriosam debitis, eligendi necessitatibus dolores quis
              quaerat aliquam vel porro!
            </p>
          </div>
          <div>
            <form action="">
              <label htmlFor="">Origin</label> <br />
              <input type="text" placeholder="From" /> <br />
              <label htmlFor="">Destination</label> <br />
              <input type="text" name="" id="" /> <br />
              <input type="date" />
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Book;
