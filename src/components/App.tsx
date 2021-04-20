import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Col, Divider, Layout, Row, Space, Spin, Typography } from 'antd';
import { HeartOutlined, SoundOutlined } from '@ant-design/icons';
import { Provider } from 'react-redux';
import PlaylistEditor from './PlaylistEditor';
import TrackAdder from './TrackAdder';
import AudioPlayer from './AudioPlayer';
import { getStore } from '../store/store';
import TrackDeleter from './TrackDeleter';
import { readLoggedInUsername, setLoggedInUsername } from '../storage';
import AccountPage from './AccountPage';

export default function App(): ReactElement {
  const [app, setApp] = useState(<LoadingPage />);
  useEffect(() => {
    if (readLoggedInUsername() === undefined) setApp(<AccountPage />);
    else
      getStore().then((store) => {
        setApp(
          <Provider store={store}>
            <AppLayout />
          </Provider>,
        );
      });
  }, []);
  return app;
}

function LoadingPage(): ReactElement {
  return (
    <Row style={{ position: 'absolute', top: '50%', left: '50%' }}>
      <Spin size='large' />
    </Row>
  );
}

function AppLayout(): ReactElement {
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Content style={{ padding: 16, margin: '0 auto' }}>
        <Content />
      </Layout.Content>
      <Layout.Footer>
        Made with <HeartOutlined /> by Neel Kamath (PES2201800467), Vamsi Krishna (PES2201800147), and Arjun Shekar
        (PES2201800072).
      </Layout.Footer>
    </Layout>
  );
}

function Header(): ReactElement {
  const onClick = () => {
    setLoggedInUsername(undefined);
    location.reload();
  };
  return (
    <Typography.Text style={{ color: 'white' }}>
      <Row gutter={16} justify='space-between'>
        <Col>
          <SoundOutlined /> Musify - Edit and listen to your music playlists
        </Col>
        <Col>Welcome {readLoggedInUsername()}</Col>
        <Col>
          <Button type='primary' onClick={onClick}>
            Log out
          </Button>
        </Col>
      </Row>
    </Typography.Text>
  );
}

function Content(): ReactElement {
  return (
    <Space direction='vertical'>
      <AudioPlayer />
      <Divider />
      <PlaylistEditor />
      <Divider />
      <TrackAdder />
      <Divider />
      <TrackDeleter />
    </Space>
  );
}
