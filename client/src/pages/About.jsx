import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      {/* intro */}
      <div className="bg-navy-900 text-white">
        <div className="py-20 px-4 max-w-6xl mx-auto">
          <p className="text-gold-500 uppercase tracking-widest text-xs font-semibold mb-3">
            About us
          </p>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">
            Making property search <span className="text-gold-500">simple and honest</span>
          </h1>
          <p className="text-gray-300 mt-5 max-w-2xl">
            Rayan Estate connects people looking for a place to live with the
            people who own it. We believe finding a home should be clear, fast
            and free of confusion.
          </p>
        </div>
      </div>

      {/* story */}
      <div className="py-14 px-4 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold text-navy-900 mb-3">Our story</h2>
          <p className="text-navy-700 mb-3">
            Rayan Estate started with a simple idea: searching for a property
            should not mean endless calls, unclear prices and outdated listings.
          </p>
          <p className="text-navy-700">
            So we built a platform where owners post their own properties with
            real photos and full details, and buyers or tenants can search,
            filter and reach out in a few clicks.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-navy-900 mb-3">What you can do</h2>
          <ul className="text-navy-700 flex flex-col gap-2 list-disc pl-5">
            <li>Search by location, type, price and amenities</li>
            <li>Browse homes for rent, for sale, and special offers</li>
            <li>See photos, bedrooms, bathrooms, parking and furnishing</li>
            <li>Contact the owner directly by email</li>
            <li>List your own property in minutes</li>
          </ul>
        </div>
      </div>

      {/* values */}
      <div className="bg-white py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-navy-900 mb-8 text-center">
            What we stand for
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              ["Transparency", "Clear prices and honest descriptions, with no surprises."],
              ["Simplicity", "A clean search and an easy listing process for everyone."],
              ["Trust", "Direct communication between owners and seekers."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-lg border-t-4 border-gold-500 shadow-md p-6">
                <h3 className="font-semibold text-navy-900 mb-1">{title}</h3>
                <p className="text-sm text-navy-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* call to action */}
      <div className="py-14 px-4 text-center">
        <h2 className="text-2xl font-semibold text-navy-900">Ready to find your place?</h2>
        <p className="text-navy-700 mt-2">Start browsing or list your property today.</p>
        <div className="flex justify-center gap-4 mt-5">
          <Link to="/search" className="bg-navy-900 hover:bg-navy-700 text-white px-6 py-3 rounded-lg uppercase text-sm">
            Browse listings
          </Link>
          <Link to="/create-listing" className="border border-gold-600 text-gold-600 px-6 py-3 rounded-lg uppercase text-sm hover:bg-gold-500 hover:text-navy-900">
            List a property
          </Link>
        </div>
      </div>
    </div>
  );
}