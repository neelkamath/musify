import React, { ReactElement } from 'react';
import { Button, Form, Input, List, message, Space, Tooltip, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlaylistsSlice } from '../store/PlaylistsSlice';
import { DeleteOutlined } from '@ant-design/icons';

export default function PlaylistEditor(): ReactElement {
  const playlists = useSelector(PlaylistsSlice.selectAll);
  return (
    <Space direction='vertical'>
      <Typography.Title level={2}>Edit Your Playlists</Typography.Title>
      <PlaylistEditorForm />
      <List dataSource={playlists} renderItem={({ name }) => <Playlist name={name} />} />
    </Space>
  );
}

interface PlaylistEditorFormData {
  readonly name: string;
}

function PlaylistEditorForm(): ReactElement {
  const playlistNames = useSelector(PlaylistsSlice.selectIds);
  const dispatch = useDispatch();
  const onFinish = async ({ name }: PlaylistEditorFormData) => {
    const playlistName = name.trim();
    if (playlistName === '') message.error("The playlist's name must contain characters other than spaces.", 5);
    else if (playlistNames.includes(playlistName)) message.error('Playlist exists.', 3);
    else {
      dispatch(PlaylistsSlice.create(playlistName));
      message.success('Playlist created.', 3);
    }
  };
  return (
    <Form onFinish={onFinish} name='create-playlist' layout='inline'>
      <Form.Item name='name' label='Name' rules={[{ required: true, message: "Enter the playlist's name." }]}>
        <Input maxLength={30} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}

interface PlaylistProps {
  readonly name: string;
}

function Playlist({ name }: PlaylistProps): ReactElement {
  const dispatch = useDispatch();
  return (
    <List.Item key={name}>
      <Space>
        <Tooltip title='Remove track from playlist'>
          <Button danger onClick={() => dispatch(PlaylistsSlice.removeOne(name))} icon={<DeleteOutlined />} />
        </Tooltip>
        {name}
      </Space>
    </List.Item>
  );
}
