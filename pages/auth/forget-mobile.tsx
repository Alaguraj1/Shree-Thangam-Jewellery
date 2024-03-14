import React from 'react';
import {useRouter} from "next/router"
import { Form, Input, Button, message, Space } from 'antd';
import Models from '../../imports/models.import';
import ForgetPasswordImage from "../../public/assets/images/stj/bg-1.png"

const ForgetPassword = ({ setStep, setMobileNumber }:any) => {
    const Router = useRouter();

    const handleGoBack = () => {
        window.history.back();
    };

    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        try {
            const res = await Models.auth.ForgetOtp(values);
            if (res?.results[0]?.success === 1) {
                localStorage.setItem('mobileNumber', res?.results[0]?.mobileNumber);
                localStorage.setItem('otp', res?.results[0]?.Otp);
                setStep(2);
                form.resetFields();
            } else {
                // alert(res?.results[0]?.Otp);
                messageApi.open({
                    type: 'error',
                    content: res?.results[0]?.Otp,
                });
            }
        } catch (error) {}
    };

    const onFinishFailed = (errorInfo: any) => {};

    return (
        <>
            {contextHolder}
            <div className="container-login">
                <div className="forget-left">
                    <h1 className="forget-title">WELCOME</h1>
                    <p className="forget-subTitle">Forgot Password</p>
                    <div style={{ marginTop: '30px' }}>
                        <Form
                            name="forget-form"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            layout="vertical"
                            form={form}
                            className="login-form"
                        >
                            <Form.Item
                                name="mobileNumber"
                                label="Mobile Number"
                                style={{ fontSize: '18px !important' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your mobile number!',
                                    },
                                    {
                                        pattern: /^[0-9]{10}$/,
                                        message: 'Mobile number must be a 10-digit number!',
                                    },
                                ]}
                            >
                                <div className="forget-input-warrper">
                                    <Input type="tel" className="forget-input-style" maxLength={10} />
                                </div>
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'end' }}>
                                <Space>
                                    <Button size="large" type="primary" style={{ background: '#9a2526', fontWeight: '600' }} onClick={handleGoBack}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit" size="large" style={{ background: '#9a2526',fontWeight: '600' }}>
                                        Generate OTP
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div className="forget-outer">
                    <img src={ForgetPasswordImage.src} alt="background-image" className="login-side-img" />
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;
