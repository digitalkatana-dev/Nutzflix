import React from 'react';
import SliderModule from 'react-slick';
import ListItem from '../ListItem';
import './carousel.scss';

const Slider = SliderModule.default || SliderModule;

const Carousel = ({ list, autoplay }) => {
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
			<span className='carousel-title'>{list?.name || 'Series'}</span>
			<Slider className='carousel' {...settings}>
				{videos?.slice(0, 10).map((item, i) => (
					<ListItem key={item + i} item={item} />
				))}
			</Slider>
		</div>
	);
};

export default Carousel;
