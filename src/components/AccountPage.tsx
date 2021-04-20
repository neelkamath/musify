import React, { ReactElement, useState } from 'react';
import { Button, Col, Form, Image, Input, Layout, message, Row, Space, Typography } from 'antd';
import completingImage from '../images/completing.svg';
import signInImage from '../images/sign-in.svg';
import { createAccount, isExistingUsername, isValidLogin, setLoggedInUsername } from '../storage';
import { SoundOutlined } from '@ant-design/icons';

export default function AccountPage(): ReactElement {
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Layout.Header style={{ color: 'white' }}>
        <Space>
          <SoundOutlined /> Musify - Edit and listen to your music playlists
        </Space>
      </Layout.Header>
      <Layout.Content style={{ padding: 16 }}>
        <SignUpSection />
        <SignInSection />
      </Layout.Content>
    </Layout>
  );
}

function SignUpSection(): ReactElement {
  return (
    <Row gutter={16} justify='space-around' align='middle'>
      <Col span={11}>
        <Typography.Title level={2}>Sign Up</Typography.Title>
        <SignUpForm />
      </Col>
      <Col span={7}>
        <Image preview={false} alt='Completing' src={completingImage} />
      </Col>
    </Row>
  );
}

interface SignUpFormData {
  readonly username: string;
  readonly password: string;
}

function SignUpForm(): ReactElement {
  const [isLoading, setLoading] = useState(false);
  const onFinish = async (data: SignUpFormData) => {
    setLoading(true);
    if (isExistingUsername(data.username)) message.error('Username already taken.', 3);
    else {
      createAccount(data);
      message.success('Account created.', 3);
    }
    setLoading(false);
  };
  return (
    <Form onFinish={onFinish} name='signUp' layout='vertical'>
      <Form.Item name='username' label='Username' rules={[{ required: true, message: 'Enter a username.' }]}>
        <Input maxLength={30} />
      </Form.Item>
      <Form.Item name='password' label='Password' rules={[{ required: true, message: 'Enter a password.' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

function SignInSection(): ReactElement {
  return (
    <Row gutter={16} justify='space-around' align='middle'>
      <Col span={7} push={1}>
        <Image preview={false} alt='Sign In' src={signInImage} />
      </Col>
      <Col span={12}>
        <Typography.Title level={2}>Sign In</Typography.Title>
        <SignInForm />
      </Col>
    </Row>
  );
}

interface SignInFormData {
  readonly username: string;
  readonly password: string;
}

function SignInForm(): ReactElement {
  const [isLoading, setLoading] = useState(false);
  const onFinish = async (data: SignInFormData) => {
    setLoading(true);
    if (isValidLogin(data)) {
      setLoggedInUsername(data.username);
      location.reload();
    } else message.error('Invalid login.', 3);
    setLoading(false);
  };
  return (
    <Form onFinish={onFinish} name='signIn' layout='vertical'>
      <Form.Item name='username' label='Username' rules={[{ required: true, message: 'Enter your username.' }]}>
        <Input maxLength={30} />
      </Form.Item>
      <Form.Item name='password' label='Password' rules={[{ required: true, message: 'Enter your password.' }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
