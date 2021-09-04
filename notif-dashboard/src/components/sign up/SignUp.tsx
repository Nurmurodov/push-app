import React from 'react';
import './../login/login.scss'
import {Button, Form, Input, message, Typography} from "antd";
import {FaUserAlt, GiConfirmed, RiLockPasswordFill, RiLoginCircleLine} from "react-icons/all";
import {Link} from "react-router-dom";
import Request from "../../request/Request";
import {useHistory} from "react-router-dom";

interface formType {
  confirm: string
  login: string
  name: string
  password: string
}


function SignUp() {
  const [form] = Form.useForm();
  const history = useHistory()

  const onFinish: (val: formType) => void = async (values) => {
    const push = await subscribe()
    const pushObj = JSON.parse(JSON.stringify(push))
    Request.post('/users/signup',{
      name: values.name,
      login: values.login,
      password: values.password,
      passwordConfirm: values.confirm,
      endpoint: pushObj.endpoint,
      keys: {
        p256dh: pushObj.keys.p256dh,
        auth: pushObj.keys.auth
      }
    })
      .then(() => {
        message.success("Tizimga kirdingiz!")
        history.push('/user')
      })
      .catch((err: any) => {
        console.log(err)
        message.error("Xatolik mavjud")
      })
  };

  const subscribe = async () => {
    let sw = await navigator.serviceWorker.ready
    return await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: 'BBNZelUhZi647nFqW17lCiV3O-wj6ZZbMP2OIoHxvWJyzuXQvo8mVyXcAtRP_UnXbKXed4mmMUnQoaXjtJI5kNI'
    })
  }

  return (
    <div className={'loginPage'}>
      <div className={'loginWrapper'}>
        <Typography className={'title'}>
          Push notification
        </Typography>
        <Form
          form={form}
          name="signUp"
          initialValues={{remember: true}}
          onFinish={onFinish}
        >
          <div className="input">
            <Form.Item
              name="name"
              rules={[{required: true, message: 'Please input your name!'}]}
            >
              <Input
                placeholder={'Ism Familiya'}
                prefix={<FaUserAlt/>}/>
            </Form.Item>
          </div>
          <div className="input">
            <Form.Item
              name="login"
              rules={[{required: true, message: 'Please input your username!'}]}
            >
              <Input
                placeholder={'Login'}
                prefix={<RiLoginCircleLine/>}/>
            </Form.Item>
          </div>
          <div className="input">
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<RiLockPasswordFill/>}/>
            </Form.Item>
          </div>
          <div className="input">
            <Form.Item
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<GiConfirmed/>}/>
            </Form.Item>
          </div>
          <div className="input">
            <Form.Item>
              <Button
                className={'submitButton'}
                type="primary"
                htmlType="submit">
                Ro'yxatdan o'tish
              </Button>
            </Form.Item>
          </div>
          <div className="link">
            <Link to="/">
              Tizimga kirish
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;