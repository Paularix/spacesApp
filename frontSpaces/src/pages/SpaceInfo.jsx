import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SpaceInfo.css';

const SpaceInfo = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <h2>Nombre del Establecimiento</h2>
      <div className="row">
        <div className="col-md-6">
          <Slider {...settings}>
            <div className="slide">
              <img src="/public/vite1" alt="Foto 1" />
            </div>
            <div className="slide">
              <img src="/public/vite2" alt="Foto 2" />
            </div>
            <div className="slide">
              <img src="/public/vite" alt="Foto 3" />
            </div>
            <div className="slide">
              <img src="https://via.placeholder.com/800x400/FFFF00/000000" alt="Foto 4" />
            </div>
          </Slider>
        </div>
        <div className="descriptionSpace">
          <p>Descripción del establecimiento.</p>
          <h3>Precio: $100 por noche</h3>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <button className="btn btn-primary">Reservar</button>
        </div>
      </div>
    </div>
  );
};

export default SpaceInfo;