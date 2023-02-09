import React, { useState, useEffect }  from 'react';
import { useSearchUsersQuery, useLazyGetUserReposQuery } from '../store/github/github.api'
import { useDebounce } from '../hooks/debounce'

const HomePage = () => {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search)
  const {isLoading, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [fetchRepos, { isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 1)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    fetchRepos(username)
  }

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
      {dropdown &&
       <ul 
        className="list-none absolute top-[42px] w-full left-0 rigth-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
        {isLoading && <p className='text-center'>Loading...</p>}
        {data?.map(user => (
          <li
            key={user.id}
            className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer'
            onClick={() => clickHandler(user.login)}
          >
            {user.login}
          </li>
        ))}
       </ul>
      }
       <div className="container">
        {areReposLoading && <p className='text'>Repos are Loading ...</p>}
        {repos?.map(repo => <p>{repo.url}</p>)}
       </div>

    </div>
  </div>
  )
}

export default HomePage;