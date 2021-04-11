import React, { ReactElement, useState } from 'react';
import { Button, Form, message, Select, Space, Typography, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlaylistsSlice } from '../store/PlaylistsSlice';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/lib/upload/interface';

export default function TrackAdder(): ReactElement {
  return (
    <Space style={{ width: '100%' }} direction='vertical'>
      <Typography.Title level={2}>Add Tracks</Typography.Title>
      <TrackAdderForm />
    </Space>
  );
}

interface TrackAdderFormData {
  readonly playlistNames: string[];
}

function TrackAdderForm(): ReactElement {
  const names = useSelector(PlaylistsSlice.selectIds);
  const [isLoading, setLoading] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  const dispatch = useDispatch();
  const onFinish = async ({ playlistNames }: TrackAdderFormData) => {
    setLoading(true);
    const { name, originFileObj } = files[0]!;
    const blob = new Blob([await originFileObj.arrayBuffer()]);
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.addEventListener('load', () => {
      const track = { name, base64Data: reader.result as string };
      dispatch(PlaylistsSlice.addTrack({ playlistNames, track }));
      message.success(`${name} added to ${playlistNames.join(', ')}.`, 5);
      setLoading(false);
    });
  };
  return (
    <Form onFinish={onFinish} name='track-uploader'>
      <Form.Item
        name='playlistNames'
        label='Playlists to add the track to'
        rules={[{ required: true, message: 'Enter the playlists to add the track to.' }]}
      >
        <Select style={{ width: '100%' }} mode='multiple' allowClear>
          {names.map((name) => (
            <Select.Option key={name} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name='file' label='File' rules={[{ required: true, message: 'Upload the track.' }]}>
        <Upload
          onChange={({ fileList }) => setFiles(fileList)}
          fileList={files}
          maxCount={1}
          beforeUpload={() => false}
          accept='audio/*'
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button loading={isLoading} type='primary' htmlType='submit'>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}
