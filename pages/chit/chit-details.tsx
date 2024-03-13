import React, { useEffect, useState } from 'react';
import { Table, Tooltip } from 'antd';
import { Select, Modal } from 'antd';
import Models from '../../imports/models.import';
import { useSetState } from '../../utils/function.utils';
import { useRouter } from 'next/router';

const ChitDetails = () => {
    //   const Router.push = useRouter.push();
    const Router: any = useRouter();
    const { Option } = Select;

    const [state, setState] = useSetState({
        selectedBranch: null,
        branch: [],
        payDueDataSource: [],
        dataSource: [],
        selectedRowData: null,
        selectedPayDueShowData: null,
        isModalVisible: false,
        payDueModalVisible: false,
        SelectedPayDueBranch: null,
        paydueSelectData: null,
    });

    useEffect(() => {
        closedDueBranch();
    }, []);

    useEffect(() => {
        const Token = localStorage.getItem('token');

        if (Token == null) {
            Router.push('/auth/login');
        }
    }, []);

    useEffect(() => {
        const Phone = localStorage.getItem('code');
        console.log('✌️LocalDatas --->', Phone);

        PayDue(Phone, 204);
    }, []);

    useEffect(() => {
        const Phone = localStorage.getItem('code');
        console.log('✌️LocalDatas --->', Phone);

        closedDue(Phone, 204);
    }, []);

    const closedDueBranch = async () => {
        try {
            const res = await Models.paydue.CdBranch({
                CUSMOBI: localStorage.getItem('code'),
            });
            if (res.results[0].Message == 'Authentication Session Failed') {
                Router.push('/auth/login');
                return false;
            }
            setState({ branch: res.results[0].Message });
        } catch (error) {}
    };

    //   branch change
    const handleBranchChange = (value: any) => {
        closedDue(null, value);
        setState({ selectedBranch: value });
    };

    const closedDue = async (cusmobi: any, brncode: any) => {
        try {
            const res = await Models.paydue.ClosedDue({
                CUSMOBI: localStorage.getItem('code'),
                BRNCODE: brncode,
            });

            if (res.results[0].Message == 'Authentication Session Failed') {
                Router.push('/auth/login');
                return false;
            }

            setState({ dataSource: res.results[0].Message });
        } catch (error) {}
    };

    const payDueChange = (value: any) => {
        setState({ SelectedPayDueBranch: value });
        PayDue(null, value);
    };

    const PayDue = async (cusmobi: any, brncode: any) => {
        try {
            const res = await Models.paydue.PayDue({
                CUSMOBI: localStorage.getItem('code'),
                BRNCODE: brncode,
            });
            const updatedDataSource = res.results[0].Message.map((object: any, index: any) => {
                // Add some data to the object here
                return {
                    ...object,
                    key: `${index + 1}`,
                    sNo: index + 1,
                };
            });

            setState({ payDueDataSource: updatedDataSource });
        } catch (error) {}
    };

    const rowSelection = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            setState({ paydueSelectData: selectedRows });
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: any) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const handleRowClick = (record: any) => {
        setState({ selectedRowData: record });
        setState({ isModalVisible: true });
    };

    const handleCloseModal = () => {
        setState({ isModalVisible: false });
    };

    const handlePayDueRowClick = (record: any) => {
        setState({ payDueModalVisible: true });
        setState({ selectedPayDueShowData: record });
    };

    const handleClosePayDueModal = () => {
        setState({ payDueModalVisible: false });
    };
    console.log('state?.branch?.[0]?.BRNCODE', state?.branch?.[0]?.BRNCODE);

    const PayDueHeadings = [
        {
            title: 'S. No',
            dataIndex: 'sNo',
            key: 'sNo',
        },
        {
            title: 'Group',
            dataIndex: 'CHTGRUP',
            key: 'CHTGRUP',
        },
        {
            title: 'Name',
            dataIndex: 'CHTNAME',
            key: 'CHTNAME',
        },
        {
            title: 'Current Due',
            dataIndex: 'DUENUMB',
            key: 'DUENUMB',
        },
        {
            title: 'Amount',
            dataIndex: 'DUEAMNT',
            key: 'DUEAMNT',
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            render: (text: any, record: any) => (
                <button className="view" onClick={() => handlePayDueRowClick(record)}>
                    view
                </button>
            ),
        },
    ];

    const ClosedDue = [
        {
            title: 'Group',
            dataIndex: 'CLSCHTGRUP',
            key: 'CLSCHTGRUP',
        },
        {
            title: 'Name',
            dataIndex: 'CHTNAME',
            key: 'CHTNAME',
        },

        {
            title: 'Amount',
            dataIndex: 'CLSDUEAMT',
            key: 'CLSDUEAMT',
        },
        {
            title: 'Details',
            dataIndex: 'details',
            key: 'details',
            render: (text: any, record: any) => (
                <button className="view" onClick={() => handleRowClick(record)}>
                    view
                </button>
            ),
        },
    ];

    const totalAmount = state?.paydueSelectData?.reduce((acc: any, obj: any) => acc + parseInt(obj.DUEAMNT), 0);
    console.log(totalAmount);

    const handlepayduePay = async () => {
        console.log(`successfully paid ${totalAmount}`);
        // try {
        //   const res = await Models.paydue.PayDue({
        //     CUSMOBI: localStorage.getItem("code"),
        //     BRNCODE: state?.SelectedPayDueBranch,
        //   });
        //   setState({ payDueDataSource: res.results[0].Message });
        // } catch (error) {}
    };

    return (
        <div>
            <div className="closedDue">
                <div className="closedDue-title-outer">
                    <h2 className="closed-due-title">Current Chit Details</h2>
                </div>

                <div className="select-option-outer">
                    <p style={{ paddingRight: '20px' }}>Select Branch and Chit to Pay</p>
                    <Select
                        showSearch
                        filterOption={(input:any, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        style={{ width: 200 }}
                        onChange={payDueChange}
                        placeholder="Select Branch"
                        value={state?.branch?.[0]?.BRNCODE}
                    >
                        {state?.branch?.map((val:any) => (
                            <Option key={val?.BRNCODE} value={val?.BRNCODE}>
                                {val?.NICADDR}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div style={{ paddingTop: '20px' }}>
                    <Table
                        dataSource={state.payDueDataSource}
                        columns={PayDueHeadings}
                        pagination={false}
                        scroll={{ x: '100%' }}
                        style={{ width: '100%' }}
                        rowSelection={{
                            type: state.selectedPayDueShowData,
                            ...rowSelection,
                        }}
                        // onRow={(record, rowIndex) => ({
                        //   onClick: () => handlePayDueRowClick(record),
                        // })}
                        components={{
                            body: {
                                row: ({ className, ...restProps }:any) => {
                                    return (
                                        <>
                                            <tr className={`${className} `} {...restProps} />
                                        </>
                                    );
                                },
                            },
                        }}
                    />
                </div>
                <div className="closedDue-pay-outer">
                    <button  className="closedDue-pay" onClick={handlepayduePay}>
                        PAY
                    </button>
                </div>
            </div>

            <div className="closedDue-containerfluid">
                <div className="closed-container">
                    <div className="completed-title-outer">
                        <h2 className="completed-due-title">Closed Chit Details</h2>
                    </div>
                    <div className="select-option-outer">
                        <p style={{ paddingRight: '20px' }}>Select branch and view Completed Chit</p>
                        <Select
                            showSearch
                            filterOption={(input:any, option:any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            style={{ width: 200 }}
                            onChange={handleBranchChange}
                            placeholder="Select Branch"
                            value={state?.branch?.[0]?.BRNCODE}
                        >
                            {state?.branch?.map((val:any) => (
                                <Option key={val?.BRNCODE} value={val?.BRNCODE}>
                                    {val?.NICADDR}
                                </Option>
                            ))}
                        </Select>
                    </div>

                    <div style={{ paddingTop: '20px' }}>
                        <Table
                            dataSource={state?.dataSource}
                            columns={ClosedDue}
                            pagination={false}
                            // scroll={{ x: "100%" }}
                            style={{ width: '100%' }}
                            // onRow={(record, rowIndex) => {
                            //   return {
                            //     onClick: () => handleRowClick(record),
                            //   };
                            // }}
                            components={{
                                body: {
                                    row: ({ className, ...restProps }:any) => {
                                        return (
                                            <>
                                                {/* <Tooltip title="Click Here" mouseEnterDelay={0.5}> */}
                                                <tr className={`${className}`} {...restProps} />
                                                {/* </Tooltip> */}
                                            </>
                                        );
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* currentChitDetails */}
            <Modal visible={state.payDueModalVisible} onCancel={handleClosePayDueModal} footer={null} style={{ width: '100%' }}>
                {/* Render detailed information from selectedRowData */}
                {state?.selectedPayDueShowData && (
                    <>
                        <div>
                            <div className="PayDueShowHeading">
                                <h6>Chit Name : {state?.selectedPayDueShowData?.CHTNAME}</h6>
                            </div>
                            <div
                                style={{
                                    backgroundColor: '#fff2d8',
                                    padding: '10px 20px',
                                    fontSize: '16px',
                                    color: '#ab6465',
                                }}
                            >
                                <div className="PayDueLineShow">
                                    <div style={{ paddingRight: '45px' }}>
                                        <p>
                                            Chit Group / <br />
                                            Chit SRNo:
                                        </p>
                                    </div>
                                    <div>
                                        <p className="getPayDueDetails">
                                            <br />
                                            {state?.selectedPayDueShowData?.CHTGRUP}
                                        </p>
                                    </div>
                                </div>

                                <div className="PayDueLineShow">
                                    <div style={{ paddingRight: '15px' }}>
                                        <p>Customer Name:</p>
                                    </div>
                                    <div>
                                        <p className="getPayDueDetails">{state.selectedPayDueShowData?.CUSNAME}</p>
                                    </div>
                                </div>

                                <div className="PayDueLineShow">
                                    <div style={{ paddingRight: '65px' }}>
                                        <p>Address1:</p>
                                    </div>
                                    <div>
                                        <p className="getPayDueDetails">{state.selectedPayDueShowData?.CUSADD1}</p>
                                    </div>
                                </div>

                                <div className="PayDueLineShow">
                                    <div style={{ paddingRight: '65px' }}>
                                        <p>Address2:</p>
                                    </div>
                                    <div>
                                        <p className="getPayDueDetails">{state.selectedPayDueShowData?.CUSADD2}</p>
                                    </div>
                                </div>

                                <div className="PayDueLineShow">
                                    <div style={{ paddingRight: '82px' }}>
                                        <p>Mobile:</p>
                                    </div>
                                    <div>
                                        <p className="getPayDueDetails">{state.selectedPayDueShowData?.CUSMOBI}</p>
                                    </div>
                                </div>

                                <div className="PayDueLineShow">
                                    <div style={{ paddingRight: '95px' }}>
                                        <p>Email:</p>
                                    </div>
                                    <div>
                                        <p className="getPayDueDetails">{state.selectedPayDueShowData?.CUSMAIL}</p>
                                    </div>
                                </div>

                                <div className="PayDueLineShow">
                                    <div style={{ paddingRight: '85px' }}>
                                        <p>Branch:</p>
                                    </div>
                                    <div>
                                        <p className="getPayDueDetails">{state.selectedPayDueShowData?.BRNNAME}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div className="PayDueLineShow">
                                        <div style={{ paddingRight: '5px' }}>
                                            <p>Chit Amount:</p>
                                        </div>
                                        <div>
                                            <p className="getPayDueDetails">{state.selectedPayDueShowData?.DUEAMNT}</p>
                                        </div>
                                    </div>

                                    <div className="PayDueLineShow">
                                        <div style={{ paddingRight: '5px' }}>
                                            <p>Current Due:</p>
                                        </div>
                                        <div>
                                            <p className="getPayDueDetails">{state.selectedPayDueShowData?.DUENUMB}</p>
                                        </div>
                                    </div>

                                    <div className="PayDueLineShow">
                                        <div style={{ paddingRight: '5px' }}>
                                            <p>No of Dues:</p>
                                        </div>
                                        <div>
                                            <p className="getPayDueDetails">{state.selectedPayDueShowData?.NOOFDUE}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Modal>

            {/* closed chit details */}
            <Modal visible={state.isModalVisible} onCancel={handleCloseModal} footer={null} style={{ width: '100%' }}>
                {/* Render detailed information from selectedRowData */}
                {state?.selectedRowData && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <div>
                                <p
                                    style={{
                                        backgroundColor: '#fff2d8',
                                        padding: '8px 50px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    From Date
                                </p>{' '}
                                <br />
                                <p
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '8px 50px',
                                    }}
                                >
                                    {' '}
                                    {state.selectedRowData.CLSFRMDATE}
                                </p>
                            </div>
                            <div>
                                <p
                                    style={{
                                        backgroundColor: '#fff2d8',
                                        padding: '8px 50px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    To Date{' '}
                                </p>
                                <br />
                                <p
                                    style={{
                                        backgroundColor: 'white',
                                        padding: '8px 50px',
                                    }}
                                >
                                    {' '}
                                    {state.selectedRowData.CLSTODATE}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default ChitDetails;
