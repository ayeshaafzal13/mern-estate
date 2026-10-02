import { useEffect, useState } from "react";
import { ID, storage, bucketId } from "../appwrite";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


export default function UpdateListing() {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const params = useParams();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
          const listingId = params.listingId;
          const res = await fetch(`/api/listing/get/${listingId}`);
          const data = await res.json();
          if(data.success === false) {
            console.log(data.message);
            return;
          }
          setFormData(data);
        };
        fetchListing();
    }, []);
const handleImageSubmit = async () => {
    if (files.length === 0) {
        setImageUploadError('Please select at least one image');
        return;
    }
    if (files.length + formData.imageUrls.length > 6) {
        setImageUploadError('You can only upload 6 images per listing');
        return;
    }
    setUploading(true);
    setImageUploadError(false);
    try {
        const promises = []; 
        for (let i = 0; i < files.length; i++) {
            promises.push(storeImage(files[i]));
        }
        const urls = await Promise.all(promises);
        setFormData((prev) => ({
            ...prev,
            imageUrls: [...prev.imageUrls, ...urls],
        }));
        setFiles([]);
        setUploading(false);
    } catch (error) {
        console.log("Image upload error:", error);
        setImageUploadError('Image upload failed (2 mb max per image)');
        setUploading(false);
    }
}; 
  const storeImage = async (file) => {
    try {
        const uploadedFile = await storage.createFile(
            bucketId,
            ID.unique(),
            file
        );
        const downloadURL = storage
            .getFileView(bucketId, uploadedFile.$id)
            .toString();

        return downloadURL;
    } catch (error) {
        console.log("Image upload error:", error);
        throw error;
    }
};
const handleRemoveImage = (index) => {
    setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
};

const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
        setFormData({
            ...formData,
            type: e.target.id
        });
    }

    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
        setFormData({
            ...formData,
            [e.target.id]: e.target.checked
        });
    }

    if (e.target.type === 'number' || e.target.type === 'text' || e.target.tagName === 'TEXTAREA') {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        if(formData.imageUrls.length < 1) return setError('You must upload at least one image');
        if(+ formData.regularPrice < +formData.discountPrice) return setError('Discount price must be lower than regular price');
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/update/${params.listingId}`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                 ...formData,
                 userRef: currentUser._id
            }),
        });
        const data = await res.json();
        setLoading(false);
        if(data.success === false) {
            setError(data.message);
        }
        navigate(`/listing/${data._id}`)
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
}

return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl front-semibold text-center my-7'> Update Listing</h1>

        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input 
                type="text" 
                placeholder="Name" 
                className='border p-3 rounded-lg' id="name"  
                maxLength="62" 
                minLength="10" 
                required 
                onChange={handleChange}
                value={formData.name}
                />
                <textarea 
                type="text" 
                placeholder="Description" className='border p-3 rounded-lg' id="description" 
                required 
                onChange={handleChange}
                value={formData.description}
                />
                <input 
                type="address" 
                placeholder="Address" 
                className='border p-3 rounded-lg' id="address" 
                required 
                onChange={handleChange}
                value={formData.address}
                />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        id='sale' 
                        className='w-5'
                        onChange={handleChange}
                        checked={formData.type === 'sale'}
                        />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        id='rent' 
                        className='w-5'
                        onChange={handleChange}
                        checked={formData.type === 'rent'}
                        />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input 
                        type="checkbox" 
                        id='parking' 
                        className='w-5'
                        onChange={handleChange}
                        checked={formData.parking}/>
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5'
                        onChange={handleChange}
                        checked={formData.furnished}/>
                        <span>Furnished</span>

                    </div><div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5'
                        onChange={handleChange}
                        checked={formData.offer}/>
                        <span>Offer</span>
                    </div>
                </div>


                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300' rounded-lg 
                        onChange={handleChange}
                        value={formData.bedrooms}/>
                        <p>Beds</p>       
                    </div>
                      <div className='flex items-center gap-2'>
                        <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300' rounded-lg
                        onChange={handleChange}
                        value={formData.bathrooms} 
                        />
                        <p>Baths</p>       
                    </div>
                      <div className='flex items-center gap-2'>
                        <input type="number" id='regularPrice' min='50' max='10000000' required className='p-3 border border-gray-300 rounded-lg'
                        onChange={handleChange}
                        value={formData.regularPrice}
                        />
                        <div className='flex flex-col items-center'>
                        <p>Regular Price</p> 
                        <span className='text-xs'>($ /month)</span>
                        {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )}
                        </div>
                    </div>
                    {formData.offer && (
                           <div className='flex items-center gap-2'>
                        <input type="number" id='discountPrice' min='0' max='10000000' required className='p-3 border border-gray-300' rounded-lg 
                        onChange={handleChange}
                        value={formData.discountPrice}/>
                        <div className='flex flex-col items-center'>
                            <p>Discounted price</p>  
                            <span className='text-xs'>($ / month)</span>
                            {formData.type === 'rent' && (
                    <span className='text-xs'>($ / month)</span>
                  )}
                        </div>     
                    </div>
                    )}
                    
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4 items-center">
  <label
    htmlFor="images"
    className="p-3 border border-gray-300 rounded font-semibold cursor-pointer bg-gray-50 hover:bg-gray-100"
  >
    Choose Files
  </label>

  <input
    onChange={(e) => setFiles(e.target.files)}
    className="hidden"
    type="file"
    id="images"
    accept="image/*"
    multiple
  />

  <span className="text-gray-600">
    {files.length > 0
      ? `${files.length} file${files.length > 1 ? "s" : ""} selected`
      : "No files selected"}
  </span>

  <button
    type="button"
    disabled={uploading}
    onClick={handleImageSubmit}
    className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
  >
    {uploading ? 'Uploading...' : 'Upload'}
  </button>
</div>
        <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
        {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
                <div key={url} className="flex justify-between p-3 border items-center">

                    <img src={url} 
                    alt="listing image" 
                    className="w-20 h-20 object-contain rounded-lg" />

                    <button type="button" onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75">Delete</button>
            </div>
            ))
        }
                <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Updating...' : 'Update Listing'}
                </button>
                {error && <p className="text-red-700 text-sm">{error}</p>}
            </div>
        </form>
    </main>
  )
}
