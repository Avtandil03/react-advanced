import React, { useState, useEffect }  from 'react';
import { useSearchUsersQuery } from '../store/github/github.api';

const HomePage = () => {
  const [search, setSearch] = useState('')
  const {isLoading, isError, data} = useSearchUsersQuery('Avtandil')

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <div className='flex justify-center pt-10 mx-auto h-screen w-screen' >
      {isError && <p className='text-center text-red-600' >Something went wrong...</p>}
      
      <div className='relative w-[560px]'>
        <input
          type='text'
          className='border py-2 px-4 w-full h-[42px] mb-2'
          placeholder='Search for GitHub username...'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="absolute top-[42px] w-full left-0 rigth-0 max-h-[200px] shadow-md bg-white">
          Lorem ipsum dolor sit.
        </div>

      </div>
    </div>
  );
};

export default HomePage;