import React, { ReactElement, useState } from 'react';
import { Button, Cascader, Form, message, Space, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlaylistsSlice } from '../store/PlaylistsSlice';

export default function TrackDeleter(): ReactElement {
  return (
    <Space style={{ width: '100%' }} direction='vertical'>
      <Typography.Title level={2}>Delete Tracks</Typography.Title>
      <TrackRemoverForm />
    </Space>
  );
}

interface TrackRemoverFormData {
  readonly track: string[];
}

function TrackRemoverForm(): ReactElement {
  const playlists = useSelector(PlaylistsSlice.selectAll);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = async ({ track }: TrackRemoverFormData) => {
    setLoading(true);
    const playlistName = track[0]!;
    const trackName = track[1]!;
    dispatch(PlaylistsSlice.removeTrack({ playlistName, trackName }));
    message.success(`${trackName} deleted from ${playlistName}.`, 5);
    setLoading(false);
  };
  const options = playlists.map((playlist) => {
    return {
      value: playlist.name,
      label: playlist.name,
      children: playlist.tracks.map(({ name }) => ({ value: name, label: name })),
    };
  });
  return (
    <Form name='trackRemover' onFinish={onFinish} layout='inline'>
      <Form.Item
        name='track'
        label='Track to delete'
        rules={[{ required: true, message: 'Enter the track to delete.' }]}
      >
        <Cascader options={options} />
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type='primary' htmlType='submit'>
          Delete
        </Button>
      </Form.Item>
    </Form>
  );
}
