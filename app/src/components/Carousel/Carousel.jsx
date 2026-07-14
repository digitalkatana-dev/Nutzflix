import React from 'react';
import SliderModule from 'react-slick';
import ListItem from '../ListItem';
import SeriesCarouselItem from '../SeriesCarouselItem';
import './carousel.scss';

const Slider = SliderModule.default || SliderModule;

const Carousel = ({ list, series, autoplay }) => {
	const title = series ? 'Series' : list?.name;
	const videos = list?.movies || list;

	const settings = {
		infinite: true,
		speed: 500,
		variableWidth: true,
		slidesToScroll: 5, // mirrors old MAX_SLIDE-style paging
		arrows: true,
		swipeToSlide: true,
		autoplay: !!autoplay,
	};

	return (
		<div className='slider-wrapper'>
			<span className='carousel-title'>{title}</span>
			<Slider className='carousel' {...settings}>
				{videos?.slice(0, 10).map((item, i) => {
					if (series) {
						return <SeriesCarouselItem key={item + i} item={item} />;
					} else {
						return <ListItem key={item + i} item={item} />;
					}
				})}
			</Slider>
		</div>
	);
};

export default Carousel;
