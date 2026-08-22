import React from 'react';
import SliderModule from 'react-slick';
import CarouselItem from '../CarouselItem';
import './carousel.scss';

const Slider = SliderModule.default || SliderModule;

const Carousel = ({ list, count = 10, series, favs, autoplay }) => {
  const title = series ? 'Series' : favs ? 'My List' : list?.name;
  const videos = list?.movies || list;

  const settings = {
    infinite: true,
    speed: 500,
    variableWidth: true,
    slidesToScroll: 1, // mirrors old MAX_SLIDE-style paging
    arrows: true,
    swipeToSlide: true,
    autoplay: !!autoplay,
  };

  return (
    <div className='slider-wrapper'>
      <span className='carousel-title responsive-h4'>{title}</span>
      <Slider className='carousel' {...settings}>
        {videos?.slice(0, count).map((item, i) => (
          <CarouselItem
            key={item + i}
            item={item}
            type={
              item.videoType.toLowerCase() === 'series' ? 'series' : 'movie'
            }
          />
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
