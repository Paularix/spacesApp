import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SpaceInfo.css';
import moment from 'moment';
import Calendar from '../components/Calendar';


const SpaceInfo = () => {

  const [dateRange, setDateRange] = useState({
    startDate: moment(),
    endDate: moment(),
    focusedInput: null,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center mb-4">Nombre del Establecimiento</h2>
          <div className="carousel-wrapper">
            <Slider {...settings}>
              <div className="carousel-item">
                <img src="/public/vite1" alt="Foto 1" />
              </div>
              <div className="carousel-item">
                <img src="/public/vite2" alt="Foto 2" />
              </div>
              <div className="carousel-item">
                <img src="/public/vite" alt="Foto 3" />
              </div>
              <div className="carousel-item">
                <img src="https://via.placeholder.com/300x100" alt="Foto 4" />
              </div>
            </Slider>
          </div>
        </div>
        <div className="col-md-6 col-lg-7">
          <div className="description-wrapper">
            <h3 className="mb-3"><a className='d'>D</a>escripción del establecimiento.</h3>
            <p>hola soy la descripción del space</p>
            <div className="price-wrapper">
              <h3 className="mb-3"><a className='p'>P</a>recio: 100€</h3>
              <div className="datepickers-wrapper">
                <div className="form-group">
                  <Calendar />
                </div>
              </div>
              <button className="btn btn-primary mt-3">Reservar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceInfo;
