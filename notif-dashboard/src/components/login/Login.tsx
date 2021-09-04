import React from 'react';
import './login.scss'
import {Button, Form, Input, message, Typography} from "antd";
import {FaUserAlt, RiLockPasswordFill} from "react-icons/all";
import Request from "../../request/Request";
import {useHistory} from "react-router-dom";
import { Link } from 'react-router-dom';

interface formTypes {
  login: string
  password: string
}

function Login() {
  const history = useHistory()

  const onFinish = (values: formTypes) => {
    Request.post('/users/login', values)
      .then((res:any) => {
        if(res.data.data.user.role === 'admin') {
          history.push('/admin')
        } else {
          history.push('/user')
        }
        localStorage.setItem('user', JSON.stringify(res.data))
        message.success("Tizimga kirdingiz!")
      })
      .catch((err: any) => {
        console.log(err)
        message.error("Login yoki parol xato")
      })
  };

  return (
    <div className={'loginPage'}>
      <div className={'loginWrapper'}>
        <Typography className={'title'}>
          Push notification
        </Typography>
        <Form
          name="basic"
          initialValues={{remember: true}}
          onFinish={onFinish}
        >
          <div className="input">
            <Form.Item
              name="login"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input
                prefix={<FaUserAlt/>}/>
            </Form.Item>
          </div>
          <div className="input">
            <Form.Item
              name="password"
              rules={[{required: true, message: 'Please input your password!'}]}
            >
              <Input.Password prefix={<RiLockPasswordFill/>}/>
            </Form.Item>
          </div>
          <div className="input">
            <Form.Item>
              <Button
                className={'submitButton'}
                type="primary"
                htmlType="submit">
                Kirish
              </Button>
            </Form.Item>
          </div>
          <div className="link">
            <Link to="/signup">
              Ro'yxatdan o'tish
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;