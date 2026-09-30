import { useState } from "react";
import { ID, storage, bucketId } from "../appwrite";


export default function CreateListing() {
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

    console.log(formData);
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

return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl front-semibold text-center my-7'> Create Listing</h1>

        <form className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1">
                <input type="text" placeholder="Name" className='border p-3 rounded-lg' id="name"  maxLength="62" minLength="10" required />
                <textarea type="text" placeholder="Description" className='border p-3 rounded-lg' id="description" required />
                <input type="text" placeholder="Address" className='border p-3 rounded-lg' id="address" required />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5'/>
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5'/>
                        <span>Parking spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5'/>
                        <span>Furnished</span>
                    </div><div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>


                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bedrooms' min='1' max='10' required className='p-3 border border-gray-300' rounded-lg />
                        <p>Beds</p>       
                    </div>
                      <div className='flex items-center gap-2'>
                        <input type="number" id='bathrooms' min='1' max='10' required className='p-3 border border-gray-300' rounded-lg />
                        <p>Baths</p>       
                    </div>
                      <div className='flex items-center gap-2'>
                        <input type="number" id='regularPrice' min='1' max='10' required className='p-3 border border-gray-300' rounded-lg />
                        <div className='flex flex-col items-center'>
                        <p>Regular Price</p> 
                        <span className='text-xs'>($ /month)</span>
                        </div>
                    </div>
                      <div className='flex items-center gap-2'>
                        <input type="number" id='discountPrice' min='1' max='10' required className='p-3 border border-gray-300' rounded-lg />
                        <div className='flex flex-col items-center'>
                            <p>Discounted price</p>  
                            <span className='text-xs'>($ / month)</span>
                        </div>     
                    </div>
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
                <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}
