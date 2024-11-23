import React, { useEffect } from 'react';
import "./login.scss";
import logos from "../../assets/images/stack.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { FacebookOutlined, GoogleOutlined, TwitterOutlined } from '@ant-design/icons';
import { useGetInputValuen } from '../../hooks/useGetInputValue';

const initialState = {
  username: "",
  password: ""
};

const Login = () => {
  const [form] = Form.useForm(); // Form instansiyasini olish
  const { formData, handlechange, setFormData } = useGetInputValuen(initialState);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = () => {
    if (formData.username === "john32" && formData.password === "12345678") {
      toast.success("Welcome to Admin");
      localStorage.setItem("token", "token");
      navigate("/admin");
    } else {
      toast.error("Username or password is incorrect");
      setFormData(initialState); // Inputni tozalash
      form.resetFields(); // Formni tozalash
    }
  };

  return (
    <div id="login">
      <div className="container login">
        <Form
          form={form} // Form instansiyasini biriktirish
          className="login__form"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={handleLogin}
          autoComplete="off"
        >
          <Typography.Title className="login__title">
            <img src={logos} />
          </Typography.Title>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input value={formData.username} onChange={handlechange} name="username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password value={formData.password} onChange={handlechange} name="password" />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
            <Divider style={{ borderColor: "black" }}>or Login with</Divider>
            <div className="login__icons">
              <GoogleOutlined />
              <FacebookOutlined />
              <TwitterOutlined />
            </div>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
