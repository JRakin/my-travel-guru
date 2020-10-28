import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import React, { useState } from 'react';
import 'swiper/swiper-bundle.css';
import './Tours.css';
import fakeData from '../../fakeData/fakeData';
import ViewDetails from '../ViewDetails/ViewDetails';

SwiperCore.use([Pagination, Autoplay]);

const Tours = () => {
  const data = fakeData;

  // homepage

  const [view, setView] = useState(data[0]);

  const handleView = (item) => {
    setView(item);
  };

  return (
    <div className="container p-4 text-light">
      <div className="row">
        {/* description */}
        <div className="col-md-5" style={{ margin: '0 auto' }}>
          <ViewDetails showOnDetails={true} data={view}></ViewDetails>
        </div>
        {/* image buttons on right side */}
        <div className="col-md-7">
          <Swiper
            key={4}
            spaceBetween={6}
            slidesPerView={2}
            loop={true}
            autoplay={true}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log()}
          >
            <SwiperSlide>
              <div
                onClick={() => handleView(data[1])}
                style={{ padding: '30px', cursor: 'pointer' }}
              >
                <img
                  src="https://i.ibb.co/JywV349/Sajek.png"
                  alt="item"
                  className="w-100"
                  style={{ margin: '0 auto' }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                onClick={() => handleView(data[2])}
                style={{ padding: '30px', cursor: 'pointer' }}
              >
                <img
                  src="https://i.ibb.co/Qp6NMHD/Sreemongol.png"
                  alt="item"
                  className="w-100"
                  style={{ margin: '0 auto' }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                onClick={() => handleView(data[3])}
                style={{ padding: '30px', cursor: 'pointer' }}
              >
                <img
                  src="https://i.ibb.co/z5v75MT/sundorbon.png"
                  alt="item"
                  className="w-100"
                  style={{ margin: '0 auto' }}
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                onClick={() => handleView(data[0])}
                style={{ padding: '30px', cursor: 'pointer' }}
              >
                <img
                  src="https://i.ibb.co/VTBFDCM/cox-s-bajar.png"
                  alt="item"
                  className="w-100"
                  style={{ margin: '0 auto', borderRadius: '14px' }}
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Tours;
