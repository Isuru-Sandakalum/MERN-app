import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css/effect-coverflow";
import ListingItem from "../components/ListingItem";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        //converting data to json
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        log(error);
      }
    };

    fetchOfferListing();
  }, []);

  return (
    <div>
      {/* Section 01 */}
      <div className=" flex flex-col gap-6 p-20 px-3 max-w-6xl mx-auto">
        <h1 className=" text-white font-bold text-3xl lg:text-6xl">
          Find your <span className=" text-primary">Dreamed</span>
          <br></br>
          place with ease
        </h1>
        <div className=" text-gray-400 text-xs sm:text-sm ">
          Welcome to BuildYou, where dreams take shape and spaces find
          purpose.At BuildYou,we believe in crafting environments that reflect
          the unique stories and aspirations of our clients.
        </div>
        <Link
          to={"/search"}
          className=" bg-[#A6FF96] shadow-lg rounded-xl text-black font-bold shadow-green-700 py-3 items-center text-xs sm:text-sm w-[120px] text-center"
        >
          Explore now
        </Link>
      </div>

      {/* Section 01 */}
      <Swiper
        navigation
        spaceBetween={50}
        slidesPerView={1}
        modules={[EffectCoverflow]}
        effect="coverflow "
        className=" p-3 rounded-2xl ml-10 mr-10"
      >
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing) => (
            <SwiperSlide>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      

      {/* Section 01 */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-primary'>Recent offers</h2>
              <Link className='text-sm text-white hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-primary'>Recent places for rent</h2>
              <Link className='text-sm text-white hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-primary'>Recent places for sale</h2>
              <Link className='text-sm text-white hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
