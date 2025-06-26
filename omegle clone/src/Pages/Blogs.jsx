import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActiveUsers } from '../App/Redux_Toolkit/Slices/AllActiveusers';

function Blogs() {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state) => state.allusers);

  useEffect(() => {
    dispatch(getAllActiveUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className='mt-20'>
      <h1 className='text-4xl font-roboto '>Active Users</h1>
      <ul>
        {users?.data?.map((user) => (
          <li className='bg-yellow-800 p-2 font-poppins m-4 text-center text-white ' key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Blogs;
