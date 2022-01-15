import React from 'react';
import useUserState from '../hooks/useUserState';

const Header: React.FC = () => {
  const [user] = useUserState();
  return (
    <div>
      <h1>Hello {user?.nickname}</h1>
    </div>
  );
};
export default Header;
