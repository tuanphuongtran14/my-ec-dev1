import React, { useEffect } from 'react'
import Link from 'next/link';
import '../../pages/_app'
import '../../pages/_document'
import Flickity from 'react-flickity-component'

export default function Header() {
    let flkty;

    const flickityOptions = {
        // initialIndex: 2,
        freeScroll: true,
        wrapAround: true,
        imagesLoaded: true,
        autoPlay: 5000
    }

    useEffect(() => {
        flkty.playPlayer();
    }, [])

    return (
        <div class="container px-0 banner">
            <div class="carousel row mx-0">
                <div class="col-12 col-lg-8 px-0">
                    {/* <div class="gallery js-flickity " data-flickity-options='{ "freeScroll": true, "wrapAround": true, "imagesLoaded": true }'>
                        <img class="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt="" />
                        <img class="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt="" />
                        <img class="gallery-cell" src="./img/banner/mg-6690x300.webp" alt="" />
                        <img class="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt="" />
                    </div> */}
                    <Flickity
                        flickityRef={c => flkty = c}
                        className={'carousel'} // default ''
                        elementType={'div'} // default 'div'
                        options={flickityOptions} // takes flickity options {}
                        disableImagesLoaded={false} // default false
                        reloadOnUpdate // default false
                        static // default false
                    >
                        <img class="gallery-cell" src="./img/banner/ROG_Phone_Sliding_desk.webp" alt="" />
                        <img class="gallery-cell" src="./img/banner/690x300_Buds_.webp" alt="" />
                        <img class="gallery-cell" src="./img/banner/mg-6690x300.webp" alt="" />
                        <img class="gallery-cell" src="./img/banner/IMG_20210515_220924_947.webp" alt="" />
                    </Flickity>
                </div>
                <div class="sub-banner col-12 col-lg-4 px-0">
                    <div class="col-12 mb-2 pr-0">
                        <img src="./img/banner/iPhone_12_690x300_copy_3_.webp" alt="" />
                    </div>
                    <div class="col-12 pr-0">
                        <img src="./img/banner/Right_banner.jpg" alt="" />
                    </div>
                </div>
                <div class="col-12 bottom-banner px-0 mt-2">
                    <img src="./img/banner/bottom-banner.png" alt="" />
                </div>
            </div>
        </div>
    )
}
