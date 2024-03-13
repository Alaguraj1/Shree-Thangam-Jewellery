import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Select } from 'antd';
import { useSetState } from '../../utils/function.utils';
import Models from '../../imports/models.import';
import { useRouter } from 'next/router';
import BlankLayout from '@/components/Layouts/BlankLayout';

const PaymentHistory = () => {
    // const Router.push = useRouter.push();
    const Router: any = useRouter();

    const [state, setState] = useSetState({
        dataSource: [],
    });

    useEffect(() => {
        getTransactions();
    }, []);

    const getTransactions = async () => {
        try {
            const res = await Models.paymentHistory.Transactions({
                CUSMOBI: localStorage.getItem('code'),
            });

            if (res?.results[0].Success === 1) {
                setState({ dataSource: res.results[0]?.Message });
            } else {
                Router.push('/login');
            }

            if (res.results[0].Message == 'Authentication Session Failed') {
                Router.push('/auth/login');
                return false;
            }
        } catch (error) {}
    };

    const columns = [
        {
            title: 'Group',
            dataIndex: 'CHTGRUP',
            key: 'CHTGRUP',
        },
        {
            title: 'No Of Due',
            dataIndex: 'DUENUMB',
            key: 'DUENUMB',
        },
        {
            title: 'Amount',
            dataIndex: 'DUEAMNT',
            key: 'DUEAMNT',
        },
        {
            title: 'Status',
            dataIndex: 'MSTATUS',
            key: 'MSTATUS',
        },
    ];

    return (
        <div className="closedDue">
            <div className="closedDue-title-outer">
                <h2 className="closed-due-title">Your Transactions</h2>
            </div>

            <div style={{ padding: '20px 0px' }}>
                <Table dataSource={state.dataSource} columns={columns} pagination={false} style={{ width: '100%' }} />
            </div>
        </div>
    );
};

export default PaymentHistory;
