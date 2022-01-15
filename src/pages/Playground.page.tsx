import { Layout } from 'antd';
import React, { ChangeEvent, useState } from 'react';
import Header from '../components/Header';
import useUserState from '../hooks/useUserState';

const { Content } = Layout;

function PlaygroundPage() {
  const [user, setUser] = useUserState();

  const [nickname, setNickname] = useState(user?.nickname || '');

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNickname(ev.target.value);
  };

  const handleSubmit = () => {
    setUser({
      nickname,
    });
  };

  return (
    <Layout>
      <Content>
        <Header />
        <input style={{ height: '36px' }} type="text" value={nickname} onChange={handleChange} />
        <button onClick={handleSubmit} type="button" style={{ width: '200px', height: '36px' }}>
          修改
        </button>
      </Content>
    </Layout>
  );
}

export default PlaygroundPage;
