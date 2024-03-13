import React, { useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { CalendarFilled, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { Calendar } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { Link, useRouter } from "react-router-dom";
import { useSetState } from '../utils/function.utils';
import Models from '../imports/models.import';
import BlankLayout from '@/components/Layouts/BlankLayout';

function Index() {
    const Router: any = useRouter();

    const [state, setState] = useSetState({
        productRate: [],
        goldMaxMin: [],
        date: dayjs().format('MM-YYYY'),
        isModalOpen: false,
        calendarOpen: false,
    });

    useEffect(() => {
        const Token = localStorage.getItem('token');

        if (Token == null) {
            Router.push('/auth/login');
        }
    }, []);

    useEffect(() => {
        getGoldRate();

        const intervalId = setInterval(() => {
            getGoldRate();
        }, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const getGoldRate = async () => {
        try {
            const res = await Models.goldrate.GoldRate();
            console.log('✌️res --->', res);
            if (res?.results[0].Success === 1) {
                setState({ productRate: res?.results });
            } else {
                Router.push('/auth/login');
            }
        } catch (error) {}
    };
    console.log('goldrate', state?.productRate);
    // const dateSubmit = async () => {
    //   try {
    //     const res = await Models.goldrate.GoldMaxMinRate({
    //       MonthYear: state?.date,
    //     });
    //     setState({ isModalOpen: true });
    //     setState({ calendarOpen: false });
    //     if (res?.results[0].Success === 1) {
    //       setState({ goldMaxMin: res?.results });
    //     } else {
    //       Router("/login");
    //     }
    //   } catch (error) {
    //   }
    // };

    // modal
    const showModal = () => {
        setState({ calendarOpen: true });
    };

    const handleOk = () => {
        setState({ calendarOpen: false });
    };

    const handleCancel = () => {
        setState({ calendarOpen: false });
    };

    const handleOk2 = () => {
        setState({ isModalOpen: false });
    };

    const handleCancel2 = () => {
        setState({ isModalOpen: false });
    };

    const handlePay = (record: any) => {};

    function onPanelChange(value: any, mode: any) {
        const formattedDate = dayjs(value).format('MM-YYYY');
        setState({ date: formattedDate });
    }

    return (
        <div className="imagePosition">
            <div>
                <h3 className="chit-details-title">Hi Welcome To Sree Thangam Jewellery</h3>

                <div className="home-container">
                    <div className="home-left">
                        <div className="priceDetails">
                            {/* <CalendarFilled className="calendor" onClick={showModal} /> */}

                            {state?.productRate[0]?.Message?.map((value: any) => {
                                console.log('✌️value --->', value);
                                return (
                                    <>
                                        <marquee className="product-price">
                                            Gold Rate : ₹ {value?.RATE1} per GRAM | Silver Rate : ₹ {value?.RATE2} per GRAM | Platinum Rate : ₹ {value.RATE4} per GRAM{' '}
                                        </marquee>
                                    </>
                                );
                            })}
                        </div>

                        {/* <div className="home-payDue">
                <div className="home-table-outer">
                  <h4 className="home-subTitle">Pay Due</h4>
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    style={{ width: "100%" }}
                    className="custom-table"
                  />
                </div>
              </div> */}

                        <div className="discount-outer">
                            <h4 className="home-subTitle">Our Scheme</h4>
                            <Link href="/add-chit">
                                <img src="assets/images/stj/scheme.jpg" alt="Discound" style={{ width: '100% !important' }} />
                            </Link>
                        </div>
                    </div>

                    <div className="home-right">
                        <img src="assets/images/stj/bg-1.png" alt="side-modal" className="home-side-img" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
