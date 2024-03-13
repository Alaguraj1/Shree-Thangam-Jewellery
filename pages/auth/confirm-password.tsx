import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, message } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, UnlockOutlined } from '@ant-design/icons';
import Models from '../../imports/models.import';
import ForgetPasswordImage from '../../public/assets/images/stj/bg-1.png';


const ForgetOtp = ({ setStep, mobileNumber }:any) => {

    const Router = useRouter();
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const [passwordVisible2, setPasswordVisible2] = useState(false);

    const togglePasswordVisibility2 = () => {
        setPasswordVisible2(!passwordVisible2);
    };

    const onFinish = async (values:any) => {
        const MobileNumber = localStorage.getItem('mobileNumber');

        const body = {
            mobileNumber: MobileNumber,
            newPassWord: values.newPassWord,
            confirmpassWord: values.confirmpassWord,
        };

        try {
            const res = await Models.auth.ForgetPassword(body);
            form.resetFields();

            message.success({
                content: 'Password Updated Successfully',
                onClose: () => {
                    setTimeout(() => {
                        Router.push('/auth/login');
                    }, 100);
                },
            });
        } catch (error) {}
    };

    const onFinishFailed = (errorInfo:any) => {};

    return (
        <>
            {contextHolder}
            <div className="container-forget">
                <div className="forget-left">
                    <h1 className="forget-title">WELCOME</h1>
                    <p className="forget-subTitle">Confirm Password</p>
                    <div style={{ marginTop: '30px' }}>
                        <Form
                            name="forget-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            form={form} // Pass the form instance
                            // style={{ width: "400px" }}
                            className="login-form"
                        >
                            <Form.Item
                                name="newPassWord"
                                label="New Password"
                                style={{ fontSize: '18px !important' }}
                                rules={[
                                    {
                                        message: 'Please enter your password!',
                                    },
                                ]}
                            >
                                <div className="forget-input-warrper password-sec">
                                    <UnlockOutlined className="login-input-icon" />
                                    <Input className="forget-input-style" type={passwordVisible ? 'text' : 'password'} />
                                    {passwordVisible ? (
                                        <EyeOutlined onClick={togglePasswordVisibility} className="eyeIcon" />
                                    ) : (
                                        <EyeInvisibleOutlined onClick={togglePasswordVisibility} className="eyeIcon" />
                                    )}
                                </div>
                            </Form.Item>

                            <Form.Item
                                name="confirmpassWord"
                                label="Confirm Password"
                                style={{ fontSize: '18px !important' }}
                                dependencies={['newPassWord']}
                                rules={[
                                    {
                                        message: 'Please enter your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassWord') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <div className="forget-input-warrper password-sec">
                                    <UnlockOutlined className="login-input-icon" />
                                    <Input className="forget-input-style" type={passwordVisible2 ? 'text' : 'password'} />
                                    {passwordVisible2 ? (
                                        <EyeOutlined onClick={togglePasswordVisibility2} className="eyeIcon" />
                                    ) : (
                                        <EyeInvisibleOutlined onClick={togglePasswordVisibility2} className="eyeIcon" />
                                    )}
                                </div>
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'end' }}>
                                <Button type="primary" htmlType="submit" size="large" style={{ background: '#9a2526' }}>
                                    Update Password
                                </Button>
                            </Form.Item>
                        </Form>
                        {/* <p>New User? <Link to="/signup" style={{textDecoration:'underline'}}>Sign Up</Link></p> */}
                    </div>
                </div>

                <div className="forget-outer">
                    <img src={ForgetPasswordImage.src} alt="background-image" className="forget-side-img" />
                </div>
            </div>
        </>
    );
};

export default ForgetOtp;
