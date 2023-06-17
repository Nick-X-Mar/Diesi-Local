import React, {Fragment, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

import Thumbnails from '../assets/icons/thumbnails-icon.svg';

const ThumbIcon = forwardRef((props, ref) =>{
    const [ thumbs, setThumbs ] = useState(false);

    useEffect(()=>{
        if(typeof window !== "undefined"){
            var element = document.querySelector('.slick-dots.thumbnails');
            if(thumbs && !element.classList.contains('active')){
                element.classList.add('active');
            }
            else if(!thumbs){
                element.classList.remove('active');
            }
        }
    },[thumbs])
    
    useImperativeHandle(ref, () => ({
        getThumbState(){
            return thumbs;
        }
    }));

    const setActive = () =>{
        var thumb = document.querySelector('.thumbnails');
        (typeof window!=='undefined' && navigator.appVersion.indexOf("Win")!==-1 && !thumb.classList.contains('windows')) ? thumb.classList.add('windows') : null;
        setThumbs(!thumbs);
    }

    return (
        <Fragment>
            <div ref={ref} className="thumbs-icon" onClick={() => setActive()}><Thumbnails/></div>
        </Fragment>
    )
});

export default ThumbIcon;