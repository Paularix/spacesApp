import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SpaceInfo.css';
import moment from 'moment';
import Calendar from '../../components/Calendar/Calendar';


const SpaceInfo = () => {

  const [dateRange, setDateRange] = useState({
    startDate: moment(),
    endDate: moment(),
    focusedInput: null,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 450,
    slidesToShow: 2,
    slidesToScroll: 1
  };


  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center mb-4">Encantador Loft para Reuniones</h2>
          <h6 className="text-center mb-4">Milán, Lombardia, Italia</h6>
          <div className="carousel-wrapper">
            <Slider className="carousel-slider" {...settings}>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/0da70267-d9da-4efb-9123-2714b651c9fd.jpeg?im_w=960" alt="Foto 1" />
              </div>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/80e077fa-8985-483e-9946-8c088fbd8e78.jpeg?im_w=720" alt="Foto 2" />
              </div>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/80e077fa-8985-483e-9946-8c088fbd8e78.jpeg?im_w=720" alt="Foto 3" />
              </div>
              <div className="carousel-item">
                <img src="https://a0.muscache.com/im/pictures/miso/Hosting-51809333/original/45b4ce4b-6bc9-4f19-af4b-811e6d2d8ef1.jpeg?im_w=720" alt="Foto 4" />
              </div>
            </Slider>
          </div>
        </div>
        <div className="col-md-6 col-lg-7">
          <div className="description-wrapper">
            <h2>Espacio apto para músicos. Anfitrión: Valentina</h2>
            <h2>Conoce a tu anfitrión</h2>
            <div>
              <img className='spaceInfo-image' src="https://www.caritas.org.mx/wp-content/uploads/2019/02/cualidades-persona-humanitaria.jpg" alt="" />
              <div>Nombre: Valentina</div>
              <div>Descripción: Soy escritora, escritora y tengo un doctorado en cine y teología de King 's College London. Fui director de una escuela de cine durante 13 años y ahora tengo un negocio de consultoría en la industria del cine. Me encanta comer la comida increíble de mi marido David, sobre todo en compañía. Me encanta viajar y soy aventurero </div>
            </div>
            <h3 className="mb-3"><a className='d'>D</a>escripción del establecimiento.</h3>
            <p>hola soy la descripción del space</p>
            <div className="price-wrapper">
              <h3 className="mb-3"><a className='p'>P</a>recio: 100€</h3>
              <div className="datepickers-wrapper">
                <div className="form-group">
                  {/* <DateRangePicker
                    startDate={dateRange.startDate}
                    startDateId="start-date"
                    endDate={dateRange.endDate}
                    endDateId="end-date"
                    onDatesChange={({ startDate, endDate }) => setDateRange({ startDate, endDate })}
                    focusedInput={dateRange.focusedInput}
                    onFocusChange={(focusedInput) => setDateRange({ ...dateRange, focusedInput })}
                    showClearDates={true}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                  /> */}
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
