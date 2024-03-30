"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import add from "../../../public/assets/adds.png"
interface Player {
    player_image: string; // Define the type of player_image
    player_name: string;
    event_number: number;
    sports_type: string
}

const Home = () => {

    const [toggle, setToggle] = useState(false)
    const [player, setPlayer] = useState<Player[]>([])
    useEffect(() => {
        fetch("database.json")
            .then(res => res.json())
            .then(data => setPlayer(data?.player || []))
            .catch(err => console.error("Error fetching data", err))
    }, [])
    // console.log(player)
    const handleToggoleButton = () => {
        setToggle(!toggle)
    }
    return (
        <main className='min-h-screen bg-[#F7F7F8]'>
            <section className="py-10">
                <div className="container mx-auto">
                    <div>
                        <div className="heading flex justify-between">
                            <h2 className="border-b-2 border-[#738FFF] inline pb-1">Sports</h2>
                            <button className='border w-[40px] h-[20px] relative rounded-full' onClick={handleToggoleButton}>
                                <div className={`bg-slate-600 size-[18px] absolute duration-300 top-0 rounded-full ${toggle ? "left-0" : "left-[50%]"}`}></div>
                            </button>
                        </div>
                        {/* displaying data after fetching */}
                        <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-5'>
                            {
                                player?.map((item, idx) => (
                                    <div key={idx} className='p-3 bg-white shadow-lg'>
                                        <Image src={item?.player_image} alt={item?.player_image} width={100} className='w-full' height={300} />
                                        <h3 className='py-3 font-bold'>{item?.player_name}</h3>
                                        <div className='p-2 sm:p-3 bg-[#00000008]'>
                                            <div className='flex justify-between gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[12px]'>Total Events</p>
                                                    <h4 className='font-bold text-sm'>{item?.event_number} Evenets</h4>
                                                </div>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[12px]'>Sports</p>
                                                    <h4 className='font-bold text-sm'>{item?.sports_type}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='border p-3 bg-white'>
                                <Image src={add} alt="Adds" width={100} className='w-full' height={300} />
                                <h3 className='font-bold text-xl py-5'>Advertisement title</h3>
                                <p className='text-[12px] md:text-[14px] font-normal'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className='text-center mt-10'>
                            <button className='capitalize py-2 px-4 md:px-7 bg-[#2C9CF0] text-white'>See more</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}

export default Home