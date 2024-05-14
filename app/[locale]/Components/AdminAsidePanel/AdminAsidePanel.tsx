"use client";
import Image from "next/image";
import "./adminAsidePanel.scss";

import logo from "../../../../public/logo.svg";
import signOutIcon from "../../../../public/sign-out-icon.svg";
import bellIcon from "../../../../public/bell-icon.svg";
import userCheckIcon from "../../../../public/user-check-icon.svg";
import userMinusIcon from "../../../../public/user-minus-icon.svg";
import filterIcon from "../../../../public/filter-icon.svg";
import xIcon from "../../../../public/x.svg";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminAsidePanel = (props: any) => {
    const { selected, notificationCounter } = props;
    const localActive = useLocale();
    const router = useRouter();

    const [logOutModalOpen, setLogOutModalOpen] = useState(false);
    const [notifCounter, setNotifCounter] = useState("");

    useEffect(() => {
        if (!notificationCounter) {
            const counter: any = localStorage.getItem("notification_counter");
            setNotifCounter(counter);
        }
    }, [notifCounter]);

    const logOut = () => {
        localStorage.removeItem("token");
        closeLogOutModal();
        router.push(`/${localActive}/admin`);
    };

    const openLogOutModal = () => {
        setLogOutModalOpen(true);
    };

    const closeLogOutModal = () => {
        setLogOutModalOpen(false);
    };

    return (
        <>
            {logOutModalOpen ? (
                <div
                    className="log-out-modal-wrapper"
                    onClick={closeLogOutModal}
                >
                    <div
                        className="log-out-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="close-modal"
                            onClick={closeLogOutModal}
                        >
                            <Image
                                quality={100}
                                src={xIcon}
                                alt="Bell Icon"
                            ></Image>
                        </div>
                        <h2>Դուրս գալ</h2>

                        <p>Ցանկանում եք դուրս գալ համակարգից։</p>

                        <button
                            className="button"
                            onClick={logOut}
                        >
                            Դուրս գալ
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
            <aside>
                <div className="top-part">
                    <Link href={"/"}>
                        <Image
                            quality={100}
                            src={logo}
                            alt="logo"
                        ></Image>
                    </Link>
                    <nav>
                        <div className={selected === "notifications" ? "selected" : ""}>
                            <Link href={`/${localActive}/dashboard/notifications`}>
                                <Image
                                    quality={100}
                                    src={bellIcon}
                                    alt="Bell Icon"
                                ></Image>
                                <div>Ծանուցումներ</div>
                                {notificationCounter !== 0 ? (
                                    <span>{notificationCounter}</span>
                                ) : notifCounter !== "0" && notifCounter ? (
                                    <span>{notifCounter}</span>
                                ) : (
                                    ""
                                )}
                            </Link>
                        </div>
                        <div className={selected === "approved" ? "selected" : ""}>
                            <Link href={`/${localActive}/dashboard/approved`}>
                                <Image
                                    quality={100}
                                    src={userCheckIcon}
                                    alt="Bell Icon"
                                ></Image>
                                <div>Հաստատված հաշիվներ</div>
                            </Link>
                        </div>
                        <div className={selected === "denied" ? "selected" : ""}>
                            <Link href={`/${localActive}/dashboard/denied`}>
                                <Image
                                    quality={100}
                                    src={userMinusIcon}
                                    alt="Bell Icon"
                                ></Image>
                                <div>Մերժված հայտեր</div>
                            </Link>
                        </div>
                        <div className={selected === "categories-list" ? "selected" : ""}>
                            <Link href={`/${localActive}/dashboard/categories-list`}>
                                <Image
                                    quality={100}
                                    src={filterIcon}
                                    alt="Bell Icon"
                                ></Image>
                                <div>Ընտրացանկ</div>
                            </Link>
                        </div>
                    </nav>
                </div>
                <div onClick={openLogOutModal}>
                    <Image
                        quality={100}
                        src={signOutIcon}
                        alt="Sign Out Icon"
                    ></Image>
                    <p>Դուրս գալ</p>
                </div>
            </aside>
        </>
    );
};

export default AdminAsidePanel;
