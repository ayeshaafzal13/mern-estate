import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="bg-navy-900 text-white">
        <div className="flex flex-col gap-3 pt-8 pb-16 px-3 max-w-6xl mx-auto">
          <p className="text-gold-500 uppercase tracking-widest text-xs font-semibold">
            Rayan Estate
          </p>
          <h1 className="font-bold text-2xl lg:text-4xl leading-tight">
            Find a home that <span className="text-gold-500">feels like yours</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl">
            Browse homes, apartments and rentals in the areas you love. Compare
            prices and contact owners directly.
          </p>
          <div className="flex flex-wrap gap-3 mt-1">
            <Link
              to="/search"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-5 py-2.5 rounded-lg uppercase text-xs"
            >
              Start searching
            </Link>
            <Link
              to="/about"
              className="border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900 font-bold px-5 py-2.5 rounded-lg uppercase text-xs"
            >
              Why Rayan Estate
            </Link>
          </div>
        </div>
      </div>

      {/* quick highlights */}
      <div className="max-w-6xl mx-auto px-3 -mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          ['Direct contact', 'Message property owners without agents in between.'],
          ['Rent or buy', 'One place for both, with clear monthly and sale prices.'],
          ['Real details', 'Photos, beds, baths, parking and furnishing at a glance.'],
        ].map(([title, text]) => (
          <div
            key={title}
            className="bg-white rounded-lg shadow-md p-4 border-t-4 border-gold-500"
          >
            <h3 className="font-semibold text-navy-900">{title}</h3>
            <p className="text-sm text-navy-700 mt-1">{text}</p>
          </div>
        ))}
      </div>

      {/* swiper */}
      {offerListings && offerListings.length > 0 && (
        <div className="max-w-6xl mx-auto px-3 mt-10">
          <Swiper modules={[Navigation]} navigation className="rounded-xl shadow-lg">
            {offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <Link to={`/listing/${listing._id}`}>
                  <div
                    className="h-[300px] sm:h-[420px] relative"
                    style={{
                      background: `url(${listing.imageUrls[0]}) center no-repeat`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <div
                      className="absolute bottom-0 w-full p-5 text-white"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(11,31,58,0.9), transparent)',
                      }}
                    >
                      <p className="font-semibold text-lg">{listing.name}</p>
                      <p className="text-sm text-gold-500">{listing.address}</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* listing results for offer, rent and sale */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-navy-700">Hot deals this week</h2>
              <Link
                className="text-sm text-navy-500 hover:underline"
                to={'/search?offer=true'}
              >
                Show more offers
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-navy-700">Fresh rentals</h2>
              <Link
                className="text-sm text-navy-500 hover:underline"
                to={'/search?type=rent'}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-navy-700">Homes for sale</h2>
              <Link
                className="text-sm text-navy-500 hover:underline"
                to={'/search?type=sale'}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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