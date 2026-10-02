import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const { currentUser} = useSelector( state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

  return (
    <header className='bg-navy-900 shadow-md border-b-2 border-gold-500 sticky top-0 z-50'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-gold-500'>Rayan</span>
                <span className='text-white'>Estate</span>
            </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input 
                   type='text'
                   placeholder = 'Search....'
                   className='bg-transparent focus:outline-none w-24 sm:w-64'
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch className='text-navy-700' />
                </button>
                
            </form>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li className='hidden sm:inline text-white hover:text-gold-500'>Home</li>
                </Link>
                <Link to='/about'>
                <li className='hidden sm:inline text-white hover:text-gold-500'>About</li>
                </Link>
                <Link to='/profile'>
                    { currentUser ? (
                         <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile' />
                    ) : (<li className=' text-white hover:text-gold-500'>Sign in</li>

                    )}
                </Link>
            </ul>
        </div>
    </header>
  )
}
