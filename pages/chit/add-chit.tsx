import React, { useEffect } from 'react';
import { Select, Table, Button, Checkbox, Form, Input, Modal, Space, message } from 'antd';
// import { useRouter } from "react-router-dom";
import { useRouter } from 'next/router';
import { columns } from '../../utils/constants.utils';
import { useSetState } from '../../utils/function.utils';
import Models from '../../imports/models.import';
import NewChitImage from '../../public/assets/images/stj/newChit.png';
import SwarnaLakshitha from '../../public/assets/images/stj/terms_swarna-laksita.png';
import GoldVikasham from '../../public/assets/images/stj/terms-goldvirksham.png';
import CCAvenue from '../../utils/ccavenue.utils';

const { Option } = Select;

const ChitDetails = () => {
    //   const Router = useRouter();
    const Router: any = useRouter();
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();

    const [state, setState] = useSetState({
        localCode: '',
        city: [],
        selectedBranch: null,
        branch: [],
        chit: [],
        selectedChit: null,
        getChit: [],
        ReferenseUser: [],
        chitTable: [],
        selectedAmount: '',
        isModalVisible: false,
        isCheckboxChecked: false,
    });

    useEffect(() => {
        GetCity();
        getBranch();
    }, []);

    useEffect(() => {
        const LocalDatas = localStorage.getItem('code');
        setState({ localCode: LocalDatas });
    }, []);

    const GetCity = async () => {
        try {
            const res = await Models.chit.City();
            console.log('✌️res --->', res);
            if (res.results[0].Message == 'Authentication Not Valid') {
                Router.push('/auth/login');
                return false;
            }
            setState({
                city:
                    res.results[0].Success === 1
                        ? res?.results[0]?.Message
                        : //  alert(res?.results[0].Message),
                          messageApi.open({
                              type: 'error',
                              content: res?.results[0].Message,
                          }),
            });
        } catch (error) {}
    };

    // city change
    const handleCityChange = async (value: any) => {};

    const getBranch = async () => {
        try {
            const res = await Models.chit.Branch();
            if (res.results[0].Message == 'Authentication Session Failed') {
                Router.push('/auth/login');
                return false;
            }
            setState({
                branch:
                    res.results[0].Success === 1
                        ? res?.results
                        : //  alert(res?.results[0].Message),
                          messageApi.open({
                              type: 'error',
                              content: res?.results[0].Message,
                          }),
            });
        } catch (error) {}
    };

    // branch onchange function
    const handleBranchChange = async (value: any) => {
        setState({ selectedBranch: value, selectedChit: null });
        Chit(value);
        getChitDetails(null, value);
        ReferenseEmployee(value);
    };

    // Chit api call
    const Chit = async (selectBranch: any) => {
        try {
            const res = await Models.chit.Chit({ BRNCODE: selectBranch });
            if (res.results?.length > 0) {
                if (res.results[0].Message == 'Authentication Session Failed') {
                    Router.push('/auth/login');
                    return false;
                }
            }

            if (res.results?.length > 0) {
                setState({ chit: res.results[0].Message });
            } else {
                setState({ chit: [] });
            }
        } catch (error) {}
    };

    // chit onchange function
    const handleChitChange = async (value: any) => {
        setState({ selectedChit: value });
        getChitDetails(value, state.selectedBranch);
    };

    // function to get chit details
    const getChitDetails = async (chitValue1: any, chitValue2: any) => {
        try {
            const res = await Models.chit.GetChit({
                CHTCODE: chitValue1,
                BRNCODE: chitValue2,
            });
            if (res.results[0].Message == 'Authentication Session Failed') {
                Router.push('/auth/login');
                return false;
            }
            const data = res.results[0].Message;
            let filterData = [];
            if (state.selectedAmount) {
                filterData = data.filter((item: any) => item.CHTAMNT === state.selectedAmount);
            } else {
                filterData = data;
            }

            setState({ getChit: data, chitTable: filterData });
        } catch (error) {}
    };

    // reference user
    const ReferenseEmployee = async (Reference: any) => {
        try {
            const res = await Models.chit.EmployeeName({
                brncode: Reference,
            });
            if (res.results[0].Message == 'Authentication Session Failed') {
                Router.push('/auth/login');
                return false;
            }
            setState({ ReferenseUser: res.results[0].Message });
        } catch (error) {}
    };

    // amount change

    const handleAmountChange = (value: any) => {
        const tableData = state.getChit;
        const filter = tableData?.filter((item: any) => item.CHTAMNT === value);
        setState({ chitTable: filter });

        setState({ selectedAmount: value });
    };

    const host = 'https://schemes.sreethangamjewellery.com';

    const onFinish = (values: any) => {
        const completeMobileNumber = `${state.localCode}`;

        const Amount = state.selectedAmount;

        const body = {
            customer_name: values.customer_name,
            address: values.address,
            landMark: values.landMark,
            email: values.email,
            mobile_number: completeMobileNumber,
            city: values.city,
            pin_code: values.pin_code,
            branch: values.branch,
            chit_name: values.chit_name,
            amount: Amount,
            referenceUser: values.referenceUser,
        };

        console.log('body', body);

        //    payment integeration
        let paymentData = {
            merchant_id: '315511', // Merchant ID (Required)
            order_id: 'ORD123', // Order ID - It can be generated from our project
            amount: Amount, // Payment Amount (Required)
            currency: 'INR', // Payment Currency Type (Required)
            billing_email: values.email, // Billing Email (Optional)
            billing_name: values.customer_name, // Billing Name (Optional)
            billing_address: `${values.landMark}, ${values.address}`,
            billing_city: values.city, // Billing City (Optional)
            billing_state: 'Tamilnadu', // Billing State (Optional)
            billing_zip: values.pin_code, // Billing Zip (Optional)
            billing_country: 'India', // Billing COuntry (Optional)
            redirect_url: `http://shopat.sreethangamjewellery.com/ccavResponseHandler.php`, // Success URL (Required)
            cancel_url: `https://schemes.sreethangamjewellery.com/`, // Failed/Cancel Payment URL (Required)
            // merchant_param1: "Extra Information", // Extra Information (Optional)
            // merchant_param2: "Extra Information", // Extra Information (Optional)
            // merchant_param3: "Extra Information", // Extra Information (Optional)
            // merchant_param4: "Extra Information", // Extra Information (Optional)
            // language: 'EN', // Language (Optional)
            billing_tel: completeMobileNumber, // Billing Mobile Number (Optional)
        };

        let encReq = CCAvenue.getEncryptedOrder(paymentData);
        let accessCode = 'AVEV05LC59AW38VEWA';
        let URL = `https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${paymentData.merchant_id}6&encRequest=${encReq}&access_code=${accessCode}`;

        if (Amount == undefined || Amount == null || Amount == '' || Amount == 0) {
            messageApi.open({
                type: 'error',
                content: 'Select Chit Amount',
            });
        } else {
            Router.push(URL);
        }
    };

    const onFinishFailed = (errorInfo: any) => {};

    // terms and conditions Modal
    const handleCheckboxChange = () => {
        setState({ isModalVisible: true });
    };

    const handleModalAccept = () => {
        setState({ isModalVisible: false });
        setState({ isCheckboxChecked: true });
    };

    const handleModalCancel = () => {
        setState({ isCheckboxChecked: false });
        setState({ isModalVisible: false });
    };

    console.log('state?.selectedChit', state?.selectedChit);

    return (
        <>
            {contextHolder}
            <div className="add-chit-container">
                <div className="add-chit-main">
                    <div>
                        <div>
                            <h6 className="chit-details-subTitle" style={{ color: '#a84647', fontWeight: '700' }}>
                                Personal Details
                            </h6>
                            <Form
                                name="basic"
                                form={form}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="Customer Name"
                                    name="customer_name"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Customer Name field is required.',
                                        },
                                    ]}
                                >
                                    <Input className="chit-input-style" />
                                </Form.Item>

                                <Form.Item
                                    label="Address"
                                    name="address"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Address field is required.',
                                        },
                                    ]}
                                >
                                    <Input className="chit-input-style" />
                                </Form.Item>

                                <Form.Item
                                    label="Land Mark"
                                    name="landMark"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'landmark field is required.',
                                        },
                                    ]}
                                >
                                    <Input className="chit-input-style" />
                                </Form.Item>

                                <Form.Item
                                    label="Email"
                                    name="email"
                                    className="add-chit-inputs"
                                    required={true}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'This Field is required.',
                                        },
                                    ]}
                                >
                                    <Input type="email" className="chit-input-style" />
                                </Form.Item>

                                <Form.Item
                                    label="Mobile Number"
                                    name="mobile_number"
                                    className="add-chit-inputs"
                                   
                                >
                                    <Input prefix={state.localCode} disabled className="chit-input-style" />
                                </Form.Item>

                                <Form.Item label="Select City" name="city" className="add-chit-inputs"
                                 rules={[
                                    {
                                        required: true,
                                        message: 'City field is required.',
                                    },
                                ]}>
                                    <Select showSearch filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={handleCityChange}>
                                        {state?.city?.map((val: any) => (
                                            <Option key={val?.CITYCODE} value={val?.CITYCODE}>
                                                {val?.CITYNAME}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Pincode"
                                    name="pin_code"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'pincode field is required.',
                                        },
                                    ]}
                                >
                                    <Input type="number" className="chit-input-style" />
                                </Form.Item>

                                <h6 className="chit-details-subTitle" style={{ marginTop: ' 50px', color: '#a84647', fontWeight: '700' }}>
                                    Chit
                                </h6>
                                <Form.Item label="Select Branch" name="branch" className="add-chit-inputs"
                                 rules={[
                                    {
                                        required: true,
                                        message: 'branch field is required.',
                                    },
                                ]}
                                >
                                    <Select showSearch filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={handleBranchChange}>
                                        {state?.branch[0]?.Message?.map((val: any) => (
                                            <Option key={val?.BRNCODE} value={val?.BRNCODE}>
                                                {val?.NICADDR}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Chit Name" name="chit_name" className="add-chit-inputs"
                                 rules={[
                                    {
                                        required: true,
                                        message: 'Chit Name field is required.',
                                    },
                                ]}>
                                    <Select
                                        onChange={handleChitChange}
                                        className="add-chit-inputs"
                                        showSearch
                                        filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {state?.chit?.map((val: any) => (
                                            <Option key={val?.CHTCODE} value={val?.CHTCODE}>
                                                {val?.CHTNAME}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
    label="Amount"
    name="amount"
    className="add-chit-inputs"
    required={true}
    rules={[
        {
            required:true,
            message: state?.selectedChit === 6 ? 'Minimum amount is Rs 50,000' : 'Value is required',
        },
        {
            validator: (rule, value) => {
                if (state?.selectedChit === 6 && (value < 50000 || isNaN(value))) {
                    return Promise.reject('Minimum amount is Rs 50,000');
                }
                return Promise.resolve();
            }
        }
    ]}
>
    {state?.selectedChit === 6 ? (
        <>
            <Input type="number" className="chit-input-style"/>
    </>
    ) : (
        <>
            <Select onChange={handleAmountChange} className="add-chit-inputs"  showSearch filterOption={(input: any, option: any) => option.children.indexOf(input) >= 0}>
                {state?.getChit?.map((val: any) => (
                    <Option key={val?.CHTAMNT} value={val?.CHTAMNT}>
                        {val?.CHTAMNT}
                    </Option>
                ))}
            </Select>
        </>
    )}
</Form.Item>


                                {/* <p style={{ fontSize: "14px" }}>
                      *NOTE you can purchase from the selected branch
                      {state.chitTable?.length > 0 &&
                        state.selectedAmount !== "" && (
                          <>
                            <div style={{ margin: "20px 0px" }}>
                              <Table
                                dataSource={state.chitTable}
                                columns={columns}
                                pagination={false}
                                style={{ width: "100%" }}
                                scroll={{ x: "100%" }}
                                className="responsive-table"
                              />
                            </div>
                          </>
                        )}
                    </p> */}

                                <Form.Item
                                    label="Reference User (Optional)"
                                    name="referenceUser"
                                    // style={{ width: "400px" }}
                                    labelCol={{ span: 12 }}
                                    wrapperCol={{ span: 20 }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Reference User field is required.',
                                        },
                                    ]}
                                >
                                    <Select showSearch filterOption={(input: any, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                        {state?.ReferenseUser?.map((val: any) => (
                                            <Option key={val?.EMPCODE} value={val?.EMPCODE}>
                                                {val?.EMPCODE} - {val?.EMPNAME}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item>
                                    <Checkbox onChange={handleCheckboxChange} checked={state.isCheckboxChecked}>
                                        Terms and conditions
                                    </Checkbox>
                                </Form.Item>

                                <Form.Item>
                                    <Button
                                        type="primary"
                                        size="large"
                                        style={{
                                            backgroundColor: '#9a2526',
                                            marginTop: '10px',
                                        }}
                                        htmlType="submit"
                                    >
                                        Add Chit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                    <div className="right chit-details-image-cover w-1/2 pl-[50px]">
                        <img src={NewChitImage.src} alt="new-chit-image" className="new-chit-image" />
                    </div>
                </div>
            </div>

            {/* terms and conditions */}
            <Modal visible={state.isModalVisible} onOk={handleModalAccept} okText="Accept" onCancel={handleModalCancel} width={700} footer={false}>
                {state.selectedChit == 4 ? (
                    <>
                        <div style={{ marginTop: '30px' }}>
                            <img src={SwarnaLakshitha.src} />
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ marginTop: '30px' }}>
                            <img src={GoldVikasham.src} />
                        </div>
                    </>
                )}
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                    <Space style={{ marginTop: '30px' }}>
                        <button className="terms_accept" onClick={handleModalCancel}>
                            Cancel
                        </button>
                        <button className="terms_cancel" onClick={handleModalAccept}>
                            Accept
                        </button>
                    </Space>
                </div>
            </Modal>
        </>
    );
};

export default ChitDetails;
