import React, { useRef, useState, useEffect, memo } from 'react';
import { Link } from 'gatsby';

import Arrow from '../assets/icons/prev-next.svg';

import Slider from 'react-slick';
import ThumbIcon from './ThumbIcon';

import { useMediaQuery } from 'react-responsive';
import { canUseWebP } from 'react-img-webp';

import '../styles/slick.scss';
import '../styles/slick-theme.scss';
import '../styles/home.scss';

const ControlArrow = memo(props => (
    <div {...props}>
        <Arrow />
    </div>
));

const MainCarousel = ({ carousel }) => {
    const carouselRef = useRef(0);
    const thumbRef = useRef(0);

    const isWebPAble = canUseWebP();

    const isDesktop = useMediaQuery({ minWidth: 760 });
    const isBigEnough = useMediaQuery({ minWidth: 525 });

    const titleCut = isBigEnough ? 62 : 62;
    const superTitleCut = isBigEnough ? 72 : 72;

    var settings = {
        dots: true,
        infinite: true,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        cssEase: 'ease-in-out',
        adaptiveHeight: false,
        dotsClass: 'slick-dots thumbnails',
        className: 'carousel',
        lazyLoad: true,
        nextArrow: <ControlArrow className="arrow next" />,
        prevArrow: <ControlArrow className="arrow prev" />,
        customPaging: index => (!isDesktop ? <button>{index + 1}</button> : <Thumbs index={index} />),
        afterChange: () => scrollThumb(),
    };

    const scrollThumb = () => {
        const active = document.querySelector('.thumbnails > li.slick-active');
        isDesktop &&
            thumbRef.current.getThumbState() &&
            active.parentElement.scrollTo({
                left: active.offsetLeft - 5,
                behavior: 'smooth',
            });
    };

    const Thumbs = memo(props => {
        const image = `${process.env.GATSBY_IMAGES_URL}/articles/master/${carousel.nodes[props.index].image}`;

        const imageWebP = `${process.env.GATSBY_IMAGES_URL}/articles/master/${
            carousel.nodes[props.index].image.split('.')[0] + '.webp'
        }`;

        return (
            <a aria-label="carousel pagination" {...props}>
                <picture height={130} width={175} className="placeholder">
                    <source src={imageWebP} alt={carousel.nodes[props.index].image_alt} type="image/webp" />
                    <source src={image} alt={carousel.nodes[props.index].image_alt} type="image/jpeg" />
                    <img
                        className="placeholder"
                        height={130}
                        width={175}
                        src={image}
                        lazy
                        alt={carousel.nodes[props.index].image_alt}
                    />
                </picture>
                <div style={{ backgroundImage: `url(${image})` }}></div>
            </a>
        );
    });

    const CarouselItem = memo(({ item }) => {
        const [image, setImage] = useState(item.image.split('.')[0] + '.webp');

        useEffect(() => {
            var webP = isWebPAble ? item.image.split('.')[0] + '.webp' : item.image;
            setImage(webP);
        }, []);

        return (
            <Link className="carousel-wrapper" to={`/${item.category.slug}/${item.postID}/${item.slug}`}>
                <div
                    className="img"
                    style={{
                        backgroundImage: `url(${process.env.GATSBY_IMAGES_URL}/articles/master/${image})`,
                    }}
                ></div>
                <Link className="carousel-caption" to={`/${item.category.slug}/${item.postID}/${item.slug}`}>
                    <div className="content-wrapper">
                        <div className="category">
                            {item.category.label
                                .toLocaleUpperCase()
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')}
                        </div>
                        <div className="supertitle">
                            {item?.supertitle?.length > titleCut
                                ? `${item.supertitle
                                      .replace(/[&]nbsp[;]/gi, '')
                                      .replace(/\s{2,}/g, ' ')
                                      .substring(0, superTitleCut)}...`
                                : item.supertitle}
                        </div>
                        <div className="title">
                            {item.title.length > superTitleCut
                                ? `${item.title
                                      .replace(/[&]nbsp[;]/gi, '')
                                      .replace(/\s{2,}/g, ' ')
                                      .substring(0, titleCut)}...`
                                : item.title}
                        </div>
                    </div>
                </Link>
            </Link>
        );
    });

    const carouselElements = carousel?.nodes?.map(item => (
        <CarouselItem item={item} key={`carousel-item-${item.postID}`} />
    ));

    return (
        <div style={{ width: '100%' }}>
            <Slider ref={carouselRef} {...settings}>
                {carouselElements}
            </Slider>
            {isDesktop && <ThumbIcon ref={thumbRef} />}
        </div>
    );
};

export default memo(MainCarousel);
