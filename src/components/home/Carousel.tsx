"use client"
import Image from "next/image";
import { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carousel.css"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";



interface Player {
    player_image: string,
    player_name: string,
    date: number,
    day: string,
    month: string,
    address: string,
    time: string

}

const Carousel = () => {



    const [carouselData, setcarouselData] = useState<Player[]>([])
    useEffect(() => {
        fetch("database.json")
            .then(res => res.json())
            .then(data => setcarouselData(data?.carouselData || []))
            .catch(err => console.error("Error fetching data", err))
    }, [])
    // custom prev arrow
    const CprevArrow = (props: any) => {
        const { onClick } = props
        return <div className="slick-arrow custom-prev" onClick={onClick}><MdOutlineKeyboardArrowLeft color="#2C9CF0" /></div>;
    };
    // custom next arrow
    const CnextArrow = (props: any) => {
        const { onClick } = props
        return <div className="custom-next" onClick={onClick}><MdOutlineKeyboardArrowRight color="#2C9CF0" /></div>;
    };

    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoPlay: true,
        prevArrow: <CprevArrow></CprevArrow>,
        nextArrow: <CnextArrow></CnextArrow>,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    };

    return (
        <section className="py-10">
            <div className="container mx-auto py-10 dark:bg-gradient-to-t from-[#221A2C] to-[#18282A]">
                <div className='py-10 text-center'>
                    <h1 className='font-bold text-2xl md:text-5xl mb-5'>Collection Spotlight</h1>
                    <p className='text-sm sm:max-w-[60%] text-center mx-auto'>Discover extraordinary moments with our Spotlight Collection metatickets—exclusive access to premium events for an unforgettable experience. Grab yours today!</p>
                </div>
                <div className="max-w-[1000px] mx-auto">

                    <Slider {...settings}>
                        {
                            carouselData?.map((item, idx) => (
                                <div key={idx} className="bg-white overflow-hidden dark:bg-[#3B3E47]">
                                    <div className="border-b border-dashed relative">
                                        <Image src={item?.player_image} alt={item?.player_name} width={300} height={400} className="w-full" />
                                        <div className="bg-[#F7F7F8] dark:bg-[#221A2C] size-7 rounded-full absolute -bottom-6 -translate-y-3 -right-3"></div>
                                        <div className="bg-[#F7F7F8] dark:bg-[#221A2C] size-7 rounded-full absolute -bottom-6 -translate-y-3 -left-3"></div>
                                    </div>
                                    <div className="p-4 md:px-7 md:py-4">
                                        <h3 className="font-bold text-[17px]">{item?.player_name}</h3>
                                        <div className="grid grid-cols-3 py-4 items-center w-9/12">
                                            <span className="text-sm border-r border-[#ccc]">{item?.month} {item?.date}</span>
                                            <span className="text-sm border-r border-[#ccc] text-center">{item?.day}</span>
                                            <span className="text-sm text-end">{item?.time}</span>
                                        </div>
                                        <address className="text-sm line-clamp-1">{item?.address}</address>
                                        <button className="text-white font-semibold bg-[#1D1D1F] w-full py-2 mt-3">Take Flight Collection</button>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
            </div>
        </section>
    )
}

export default Carousel