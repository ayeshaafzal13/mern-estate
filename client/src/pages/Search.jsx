
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebardata, setSidebardata] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "createdAt",
        order: "desc",
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const searchTermFromUrl = urlParams.get("searchTerm");
        const typeFromUrl = urlParams.get("type");
        const parkingFromUrl = urlParams.get("parking");
        const furnishedFromUrl = urlParams.get("furnished");
        const offerFromUrl = urlParams.get("offer");
        const sortFromUrl = urlParams.get("sort");
        const orderFromUrl = urlParams.get("order");

        setSidebardata({
            searchTerm: searchTermFromUrl || "",
            type: typeFromUrl || "all",
            parking: parkingFromUrl === "true",
            furnished: furnishedFromUrl === "true",
            offer: offerFromUrl === "true",
            sort: sortFromUrl || "createdAt",
            order: orderFromUrl || "desc",
        });

        const fetchListings = async () => {
            try {
                setLoading(true);
                setShowMore(false);

                const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
                const data = await res.json();

                if (data.success === false) {
                    setListings([]);
                    setLoading(false);
                    return;
                }

                if (data.length > 8) {
                    setShowMore(true);
                }

                setListings(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setListings([]);
                setLoading(false);
            }
        };

        fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === "all" ||
            e.target.id === "rent" ||
            e.target.id === "sale"
        ) {
            setSidebardata({
                ...sidebardata,
                type: e.target.id,
            });
        }

        if (e.target.id === "searchTerm") {
            setSidebardata({
                ...sidebardata,
                searchTerm: e.target.value,
            });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]: e.target.checked,
            });
        }

        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "createdAt";
            const order = e.target.value.split("_")[1] || "desc";

            setSidebardata({
                ...sidebardata,
                sort,
                order,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();

        urlParams.set("searchTerm", sidebardata.searchTerm);
        urlParams.set("type", sidebardata.type);
        urlParams.set("parking", sidebardata.parking);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set("offer", sidebardata.offer);
        urlParams.set("sort", sidebardata.sort);
        urlParams.set("order", sidebardata.order);

        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        try {
            const numberOfListings = listings.length;
            const startIndex = numberOfListings;

            const urlParams = new URLSearchParams(location.search);
            urlParams.set("startIndex", startIndex);

            const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
            const data = await res.json();

            if (data.length < 9) {
                setShowMore(false);
            }

            setListings([...listings, ...data]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row">

            {/* SEARCH SIDEBAR */}
            <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-8"
                >

                    <div className="flex items-center gap-2">
                        <label className="whitespace-nowrap font-semibold">
                            SearchTerm:
                        </label>

                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search..."
                            className="border rounded-lg p-3 w-full"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Type:</label>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="all"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === "all"}
                            />
                            <span>Rent & Sale</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === "rent"}
                            />
                            <span>Rent</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="sale"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.type === "sale"}
                            />
                            <span>Sale</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap items-center">
                        <label className="font-semibold">Amenities:</label>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.parking}
                            />
                            <span>Parking</span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                                onChange={handleChange}
                                checked={sidebardata.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <label className="font-semibold">Sort:</label>

                        <select
                            onChange={handleChange}
                            defaultValue="createdAt_desc"
                            id="sort_order"
                            className="border rounded-lg p-2"
                        >
                            <option value="regularPrice_desc">
                                Price high to low
                            </option>

                            <option value="regularPrice_asc">
                                Price low to high
                            </option>

                            <option value="createdAt_desc">
                                Latest
                            </option>

                            <option value="createdAt_asc">
                                Oldest
                            </option>
                        </select>
                    </div>

                    <button className="bg-navy-900 hover:bg-navy-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
                        Search
                    </button>
                </form>
            </div>

            {/* RESULTS */}
            <div className="flex-1">
                <h1 className="text-3xl font-semibold border-b p-3 text-navy-900 mt-5">
                    Listing results:
                </h1>

                <div className="p-7 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                    {!loading && listings.length === 0 && (
                        <p className="text-xl text-navy-900">
                            No listing found!
                        </p>
                    )}

                    {loading && (
                        <p className="text-xl text-navy-900 text-center w-full">
                            Loading...
                        </p>
                    )}

                    {!loading &&
                        listings.map((listing) => (
                            <ListingItem
                                key={listing._id}
                                listing={listing}
                            />
                        ))}

                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className="text-gold-600 hover:underline p-7 text-center w-full"
                        >
                            Show More
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

