import React, { useRef, useState, memo } from 'react';
import ArrowIcon from '../assets/icons/prev-next.svg';

import SmallArticle from '../components/small-article';

import VisibilitySensor from 'react-visibility-sensor';
import { useMediaQuery } from 'react-responsive';

import ScrollMenu from 'react-horizontal-scrolling-menu';

const Arrow = ({ title, className }) => (
    <div role="button" title={title} aria-label={title} className={'arrow ' + className}>
        <ArrowIcon />
    </div>
);

const Article = memo(({ containment, key, data }) => {
    return (
        <VisibilitySensor containment={containment} key={`listener_${key}`} partialVisibility={'right'}>
            {({ isVisible }) => <SmallArticle className={isVisible ? 'active' : ''} key={`article_${key}`} data={data} />}
        </VisibilitySensor>
    );
});

const HorizontalCategory = ({ title, slug, items }) => {
    const refMenu = useRef(0);
    const [scrolled, setScrolled] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 525 });
    const isBigEnough = useMediaQuery({ minWidth: 1081 });

    const ArrowLeft = Arrow({ title: `Scroll ${title} Category Left`, className: 'arrow-prev' });
    const ArrowRight = Arrow({ title: `Scroll ${title} Category Right`, className: 'arrow-next' });

    return (
        <div className="category">
            <div className="title">
                <h2>{title}</h2>
                <a href={`/${slug}`}>ΠΕΡΙΣΣΟΤΕΡΑ</a>
            </div>
            <ScrollMenu
                ref={refMenu}
                data={items.map((article, key) => (
                    <Article containment={refMenu.current.menuWrapper} key={key} data={article} />
                ))}
                arrowLeft={ArrowLeft}
                arrowRight={ArrowRight}
                onUpdate={() => setScrolled(refMenu.current.state.translate !== 0)}
                scrollBy={1}
                wheel={false}
                menuClass="articles"
                innerWrapperStyle={(isBigEnough && !scrolled) || typeof window === 'undefined' ? { marginLeft: 67 } : null}
                alignCenter={isMobile}
                scrollToSelected={true}
                inertiaScrolling={true}
                inertiaScrollingSlowdown={1.2}
            />
        </div>
    );
};

export default memo(HorizontalCategory);
