import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Logo from '../../public/assets/images/stj/logo.png';
import FacebookImage from '../../public/assets/images/stj/facebook.svg';
import InstagramImage from '../../public/assets/images/stj/instagram.svg';
import TwitterImage from '../../public/assets/images/stj/twitter.svg';

import { Modal } from 'antd';

const SidebarTwo = () => {
    const router = useRouter();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [router.pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [menu, setMenu] = useState(false);
    const [menuStatus, setMenuStatus] = useState('');
    const [mobileMenuStatus, setMobileMenuStatus] = useState('');

    const isActive = (path: any) => {
        return router.pathname === path;
    };

    function menuopenclose() {
        if (menu) {
            setMenu(false);
            setMenuStatus('');
            setMobileMenuStatus('');
        } else {
            setMenu(true);
            setMenuStatus('is-active');
            setMobileMenuStatus('opened');
        }
    }

    const { confirm } = Modal;

    const showConfirm = () => {
        confirm({
            title: 'Logout',
            content: 'Do you Want to Logout?',
            onOk() {
                localStorage.removeItem('token');
                router.push('/auth/login');
            },
            onCancel() {},
            okButtonProps: { style: { textTransform: 'uppercase' } },
            cancelButtonProps: {
                style: { textTransform: 'uppercase', fontWeight: '600' },
            },
        });
    };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full dark:bg-black" style={{ backgroundColor: 'white' }}>
                    <div className="flex items-center justify-center px-4 py-3">
                        <div className="logo-cover">
                            <img src={Logo.src} alt="logo" />
                        </div>
                    </div>

                    <PerfectScrollbar className="relative " style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        
                    </PerfectScrollbar>
                    <div className="socialmedia-outer">
                        <div className="social float-left mb-[5px] w-full">
                            <ul style={{ display: 'flex', justifyContent: 'center' }}>
                                <li className="social-icons">
                                    <a className="text-[#333]" target="_blank" href="https://www.facebook.com/sreethangamjewellry">
                                        <img className="svg" src={FacebookImage.src} alt="image" style={{ width: '20px' }} />
                                    </a>
                                </li>

                                <li className="social-icons">
                                    <a className="text-[#333]" target="_blank" href="https://www.instagram.com/sree_thangam_jewellery/">
                                        <img className="svg" src={TwitterImage.src} alt="image" style={{ width: '20px' }} />
                                    </a>
                                </li>
                                <li className="social-icons">
                                    <a className="text-[#333]" target="_blank" href="https://www.instagram.com/sree_thangam_jewellery/">
                                        <img className="svg" src={InstagramImage.src} alt="image" style={{ width: '20px' }} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="copyright float-left w-full">
                            Copyright © {new Date().getFullYear()} Sree <br />
                            Thangam Jewellery.
                            <br /> Concept by
                            <Link href="https://irepute.in/" target="blank" style={{ paddingLeft: '5px' }}>
                                repute.
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default SidebarTwo;
