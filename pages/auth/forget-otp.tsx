import React from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Modal, message } from 'antd';
import ForgetPasswordImage from '../../public/assets/images/stj/bg-1.png';

const ForgetOtp = ({ setStep, mobileNumber }: any) => {
    // const Router.push = useRouter.push();
    const Router = useRouter();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values: any) => {
        const storedOTP = localStorage.getItem('otp');

        if (values.otp === storedOTP) {
            setStep(3);
            form.resetFields(); // Reset the form fields
        } else {
            // alert("Enter Correct OTP");
            messageApi.open({
                type: 'error',
                content: 'Enter Correct OTP',
            });
        }
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
                            form={form} // Pass the form instance
                            // style={{ width: "400px" }}
                            className="login-form"
                        >
                            <Form.Item
                                name="otp"
                                label="OTP"
                                style={{ fontSize: '18px !important' }}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your OTP!',
                                    },
                                ]}
                            >
                                <div className="forget-input-warrper">
                                    <Input type="tel" className="forget-input-style" maxLength={4} />
                                </div>
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'end' }}>
                                <Button type="primary" htmlType="submit" size="large" style={{ background: '#9a2526' }}>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        {/* <p>New User? <Link to="/signup" style={{textDecoration:'underline'}}>Sign Up</Link></p> */}
                    </div>
                </div>

                <div className="forget-outer">
                    <img src={ForgetPasswordImage.src} alt="side-modal" className="login-side-img" />
                </div>
            </div>
        </>
    );
};

export default ForgetOtp;
