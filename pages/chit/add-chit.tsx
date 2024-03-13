import React, { useEffect } from 'react';
import { Select, Table, Button, Checkbox, Form, Input, Modal, Space, message } from 'antd';
// import { useRouter } from "react-router-dom";
import { useRouter } from 'next/router';
import { columns } from '../../utils/constants.utils';
import { useSetState } from '../../utils/function.utils';
import Models from '../../imports/models.import';
import NewChitImage from "../../public/assets/images/stj/newChit.png"


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

    const onFinish = (values: any) => {
        const completeMobileNumber = `${state.localCode}`;

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
            amount: values.amount,
            referenceUser: values.referenceUser,
        };
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
            <div className="chit-container">
                <div className="details container-chit-details flex w-full items-center">
                    <div className="left chit-details-left w-1/2">
                        <div>
                            <h6 className="chit-details-subTitle">Personal Details</h6>
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
                                            required: false,
                                            message: 'Customer Name field is required.',
                                        },
                                    ]}
                                >
                                    <div className="chit_inputs name-input">
                                        <Input style={{ padding: '10px 5px !important' }} />
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label="Address"
                                    name="address"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Address field is required.',
                                        },
                                    ]}
                                >
                                    <div className="chit_inputs address-input">
                                        <Input />
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label="Land Mark"
                                    name="landMark"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'landmark field is required.',
                                        },
                                    ]}
                                >
                                    <div className="chit_inputs landmark-input">
                                        <Input />
                                    </div>
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
                                    <div className="chit_inputs email-input">
                                        <Input type="email" />
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label="Mobile Number"
                                    name="mobile_number"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Mobile Number field is required.',
                                        },
                                    ]}
                                >
                                    <div className="chit_inputs mobile-input">
                                        <Input prefix={state.localCode} disabled />
                                    </div>
                                </Form.Item>

                                <Form.Item label="Select City" name="city" className="add-chit-inputs">
                                    <div className="chit_inputs city-input">
                                        <Select showSearch filterOption={(input:any, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={handleCityChange}>
                                            {state?.city?.map((val:any) => (
                                                <Option key={val?.CITYCODE} value={val?.CITYCODE}>
                                                    {val?.CITYNAME}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </Form.Item>

                                <Form.Item
                                    label="Pincode"
                                    name="pin_code"
                                    className="add-chit-inputs"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Address field is required.',
                                        },
                                    ]}
                                >
                                    <div className="chit_inputs pincode-input">
                                        <Input type="number" />
                                    </div>
                                </Form.Item>

                                <h6 className="chit-details-subTitle">Chit</h6>
                                <Form.Item label="Select Branch" name="branch" className="add-chit-inputs">
                                    <div className="chit_inputs branch-input">
                                        <Select showSearch filterOption={(input:any, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} onChange={handleBranchChange}>
                                            {state?.branch[0]?.Message?.map((val:any) => (
                                                <Option key={val?.BRNCODE} value={val?.BRNCODE}>
                                                    {val?.NICADDR}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </Form.Item>

                                <Form.Item label="Chit Name" name="chit_name" className="add-chit-inputs">
                                    <div className="chit_inputs chit-input">
                                        <Select onChange={handleChitChange} showSearch filterOption={(input:any, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            {state?.chit?.map((val:any) => (
                                                <Option key={val?.CHTCODE} value={val?.CHTCODE}>
                                                    {val?.CHTNAME}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
                                </Form.Item>

                                <Form.Item label="Amount" name="amount" className="add-chit-inputs">
                                    <div className="chit_inputs amount-input">
                                        {state?.selectedChit == 6 ? (
                                            <>
                                                <Input type="number" />
                                                <p>Min amount is Rs 50,000/-</p>
                                            </>
                                        ) : (
                                            <>
                                                {' '}
                                                <Select onChange={handleAmountChange} showSearch filterOption={(input:any, option:any) => option.children.indexOf(input) >= 0}>
                                                    {state?.getChit?.map((val:any) => (
                                                        <Option key={val?.CHTAMNT} value={val?.CHTAMNT}>
                                                            {val?.CHTAMNT}
                                                        </Option>
                                                    ))}
                                                </Select>{' '}
                                            </>
                                        )}
                                    </div>
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
                                    labelCol={{ span: 14 }}
                                    wrapperCol={{ span: 18 }}
                                >
                                    <div className="chit_inputs refer-input">
                                        <Select showSearch filterOption={(input:any, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                                            {state?.ReferenseUser?.map((val:any) => (
                                                <Option key={val?.EMPCODE} value={val?.EMPCODE}>
                                                    {val?.EMPCODE} - {val?.EMPNAME}
                                                </Option>
                                            ))}
                                        </Select>
                                    </div>
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
                    <div className="right pl-[50px] chit-details-image-cover w-1/2">
                        <img src={NewChitImage.src} alt="new-chit-image" className="new-chit-image" />
                    </div>
                </div>
            </div>

            {/* terms and conditions */}
            <Modal
                visible={state.isModalVisible}
                // onOk={handleModalAccept}
                // okText="Accept"
                // onCancel={handleModalCancel}
                width={700}
                footer={false}
            >
                {state.selectedChit == 4 ? (
                    <>
                        <div style={{ marginTop: '30px' }}>
                            <img src="assets/img/terms_swarna-laksita.png" />
                        </div>
                    </>
                ) : (
                    <>
                        <div style={{ marginTop: '30px' }}>
                            <img src="assets/img/terms-goldvirksham.png" />
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
