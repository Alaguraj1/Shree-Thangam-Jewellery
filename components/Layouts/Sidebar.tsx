import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Logo from "../../public/assets/images/stj/logo.png"


import { Modal } from "antd";

const Sidebar = () => {
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
  const [menuStatus, setMenuStatus] = useState("");
  const [mobileMenuStatus, setMobileMenuStatus] = useState("");
 
const isActive = (path:any) => {
    return router.pathname === path;
  };


  function menuopenclose() {
    if (menu) {
      setMenu(false);
      setMenuStatus("");
      setMobileMenuStatus("");
    } else {
      setMenu(true);
      setMenuStatus("is-active");
      setMobileMenuStatus("opened");
    }
  }

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: "Logout",
      content: "Do you Want to Logout?",
      onOk() {
        localStorage.removeItem("token");
        router.push("/auth/login");
      },
      onCancel() {},
      okButtonProps: { style: { textTransform: "uppercase" } },
      cancelButtonProps: {
        style: { textTransform: "uppercase", fontWeight: "600" },
      },
    });
  };

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed top-0 bottom-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="h-full bg-white dark:bg-black">
                    <div className="flex items-center justify-between px-4 py-3">
                    <div className="logo-cover">
            <img
              src={Logo.src}
              alt="logo"
              className="logo-mobile"
            />
          </div>
              

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="m-auto h-5 w-5">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                   
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">

                            <li className="nav-item">
                                <ul>
                                <li className={`mb-[7px] ${isActive("/") ? "active" : ""}`}>
                    <Link href="/">Home</Link>
                  </li>
                  <li
                    className={`mb-[7px] ${
                      isActive("/chit/add-chit") ? "active" : ""
                    }`}
                  >
                    <Link href="/chit/add-chit">Add Chit</Link>
                  </li>
                  <li
                    className={`mb-[7px] ${
                      isActive("/chit/chit-details") ? "active" : ""
                    }`}
                  >
                    <Link href="/chit/chit-details">Chit Details</Link>
                  </li>
                  <li
                    className={`mb-[7px] ${
                      isActive("/chit/payment-history") ? "active" : ""
                    }`}
                  >
                    <Link href="/chit/payment-history">Payment History</Link>
                  </li>
                  {/* 
        <li className={`mb-[7px] ${isActive('/my-profile') ? 'active' : ''}`}>
          <Link to="/my-profile">My Profile</Link>
        </li>
      */}
                  <li className="mb-[7px]" onClick={showConfirm}>
                    <Link href="">Logout</Link>
                  </li>
                                </ul>
                            </li>

                        </ul>

                        
                        {/* <div>
                Copyright © {new Date().getFullYear()} Sree Thangam Jewellery.
                Concept by{" "}
                <Link href="https://irepute.in/" target="blank">
                  repute.
                </Link>
              </div> */}
                    </PerfectScrollbar>

                </div>
               
            </nav>
           
        </div>
    );
};

export default Sidebar;
