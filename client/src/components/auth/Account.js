import React from 'react'
import { useUserContext } from '../../redux/UserContext';
import { useMeQuery } from '../../redux/auth';

const Account = () => {
    const { user } = useUserContext(); 
    const { data: userData, isLoading, isError, isFetching } = useMeQuery();
    if (isLoading) return <h1 className="text-center text-5xl">Loading....</h1>;
  if (isFetching) return <h1 className="text-center text-5xl">Fetching....</h1>;
  
  return (
      <div>
          {isError && <p className='text-rose-600'>{isError}</p>}
      <h1 className="text-center text-3xl">{userData?.user?.name}</h1>
      <h1 className="text-center text-3xl">{userData?.user?.email}</h1>
      <h1 className="text-center text-3xl">{userData?.user?._id}</h1>
    </div>
  );
}

export default Account