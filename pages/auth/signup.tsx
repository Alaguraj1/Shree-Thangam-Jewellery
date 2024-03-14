import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import Link from 'next/link';
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined, UnlockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
// import { useRouter } from "react-router-dom";
import { useRouter } from 'next/router';
import axios from 'axios';
import Models from '../../imports/models.import';
import SignupImage from "../../public/assets/images/stj/bg-1.png"

function Signup() {
    const Router:any = useRouter();
    const [form] = Form.useForm();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const [messageApi, contextHolder] = message.useMessage();
    const [otp, setOtp] = useState(null);
    const [mail, setMail] = useState('');

    const initialValues = {
        IMEINUM: 1,
        APPCODE: 1,
        APPVERSION: 1,
        FCMID: 1,
    };

    const onFinish = (values: any) => {
        if (values.otp !== String(otp)) {
            messageApi.open({
                type: 'error',
                content: 'Invalid OTP',
            });
            return;
        } else {
            messageApi.open({
                type: 'success',
                content: 'OTP verified',
            });

            axios
                .post('https://chatbot.thechennaisilks.com:5575/API/LOGIN/USERREGISTRATION', values, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    params: initialValues, // Check if this should be included in the URL or as data
                })
                .then((res) => {
                    if (res?.data?.results[0]?.Success === 1) {
                        messageApi.open({
                            type: 'success',
                            content: 'Successfully registered',
                        });
                        Router('/');
                    } else {
                        // Handle unsuccessful response
                        // error();

                        messageApi.open({
                            type: 'error',
                            content: res?.data?.results[0]?.Msg,
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);

                    if (axios.isAxiosError(error)) {
                        // Handle specific cases for Axios errors
                        if (error.response) {
                            console.error('Server responded with status:', error.response.status);
                            // Handle specific status codes if needed
                        } else if (error.request) {
                            console.error('No response received from the server');
                        } else {
                            console.error('Error setting up the request:', error.message);
                        }
                    } else if (error.code === 'ECONNABORTED') {
                        console.error('Request timed out');
                    } else {
                        console.error('An error occurred:', error.message);
                    }
                });
        }
    };

    const onFinishFailed = (errorInfo: any) => {};

    const mailChange = (e: any) => {
        const value = e.target.value;
        setMail(value);
    };

    //   generate otp
    const ForgetOtp = async (value: any) => {
        try {
            const res = await Models.auth.GetOtp({ USERNAME: value, mail: mail });

            if (res?.results[0]?.Msg === 'ALREDY REGISTERED') {
                messageApi.open({
                    type: 'error',
                    content: res?.results[0]?.Msg,
                });
            } else {
                setOtp(res?.results[0]?.Code);
            }
        } catch (error) {}
    };

    return (
        <>
           

            <div className="container-signup">
            {contextHolder}
                <div className="signup-left">
                    <h1 className="signup-title">WELCOME</h1>
                    <p className="login-subTitle">User Signup</p>
                    <div style={{ marginTop: '20px' }}>
                        <Form form={form} name="signup-form" initialValues={initialValues} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical" className="login-form">
                            <Form.Item
                                name="NAME"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'Please enter your name!',
                                    },
                                ]}
                            >
                                <div className="login-input-warrper">
                                    <UserOutlined className="login-input-icon" />
                                    <Input className="login-input-style" />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="MAILID"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        type: 'email',
                                        message: 'The input is not a valid email!',
                                    },
                                    {
                                        message: 'Please enter your email!',
                                    },
                                ]}
                            >
                                <div className="login-input-warrper">
                                    <MailOutlined className="login-input-icon" />
                                    <Input className="login-input-style" onChange={mailChange} />
                                </div>
                            </Form.Item>
                            <Form.Item
                                name="USERNAME"
                                label="Mobile Number"
                                style={{ fontSize: '18px !important' }}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'Please enter your mobile number!',
                                    },
                                    {
                                        pattern: /^[0-9]{10}$/,
                                        message: 'Mobile number must be a 10-digit number!',
                                    },
                                ]}
                            >
                                <div className="login-input-warrper">
                                    <PhoneOutlined className="login-input-icon" />
                                    <Input
                                        type="tel"
                                        className="login-input-style"
                                        maxLength={10}
                                        onChange={(e) => {
                                            if (e.target.value.length === 10) {
                                                ForgetOtp(e.target.value);
                                            }
                                        }}
                                    />
                                </div>
                            </Form.Item>
                            {otp === null || otp === 'ALREDY REGISTERED' ? null : (
                                <Form.Item
                                    name="otp"
                                    label="OTP"
                                    rules={[
                                        {
                                            required: true,
                                            whitespace: true,
                                            message: 'Please enter your OTP!',
                                        },
                                    ]}
                                >
                                    <div className="login-input-wrapper">
                                        <Input className="login-input-style" maxLength={4} />
                                    </div>
                                </Form.Item>
                            )}
                            <Form.Item
                                name="PASSWORD"
                                label="Password"
                                style={{ fontSize: '18px !important' }}
                                rules={[
                                    {
                                        required: true,
                                        whitespace: true,
                                        message: 'Please enter your password!',
                                    },
                                ]}
                            >
                                <div className="login-input-warrper password-sec">
                                    <UnlockOutlined className="login-input-icon" />
                                    <Input type={passwordVisible ? 'text' : 'password'} className="login-input-style" />
                                    {passwordVisible ? (
                                        <EyeOutlined onClick={togglePasswordVisibility} className="eyeIcon" />
                                    ) : (
                                        <EyeInvisibleOutlined onClick={togglePasswordVisibility} className="eyeIcon" />
                                    )}
                                </div>
                            </Form.Item>
                            <Form.Item name="IMEINUM" initialValue={initialValues.IMEINUM} hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="APPCODE" initialValue={initialValues.APPCODE} hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="APPVERSION" initialValue={initialValues.APPVERSION} hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="FCMID" initialValue={initialValues.FCMID} hidden>
                                <Input />
                            </Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Form.Item name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                            </div>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ background: '#9a2526' }} size="large">
                                    Sign Up
                                </Button>
                            </Form.Item>
                        </Form>
                        <p>
                            Already user ?{' '}
                            <Link href="/auth/login" style={{ textDecoration: 'underline' }}>
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="signup-outer">
                <img src={SignupImage.src} alt="side-modal" className="login-side-img" />
                </div>
            </div>
        </>
    );
}

export default Signup;
