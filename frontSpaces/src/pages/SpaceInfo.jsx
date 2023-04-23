import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SpaceInfo = () => {
  const [startDate, setStartDate] = useState(new Date());

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slick-arrow slick-prev" onClick={onClick}>
        <i className="fa fa-chevron-left"></i>
      </button>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="slick-arrow slick-next" onClick={onClick}>
        <i className="fa fa-chevron-right"></i>
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <div>
      <h2>Nombre del Establecimiento</h2>
      <div className="row">
        <div className="col-md-6">
          <Slider {...settings}>
            <div className="slide">
              <img src="https://via.placeholder.com/800x400" alt="Foto 1" />
            </div>
            <div className="slide">
              <img src="https://via.placeholder.com/800x400" alt="Foto 2" />
            </div>
            <div className="slide">
              <img src="https://via.placeholder.com/800x400" alt="Foto 3" />
            </div>
          </Slider>
        </div>
        <div className="col-md-6">
          <p>Descripción del establecimiento.</p>
          <h3>Precio: $100 por noche</h3>
          <div>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
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
