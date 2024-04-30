import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "./tableRow.scss";

import editIcon from "../../../../Assets/edit-icon.svg";
import deleteIcon from "../../../../Assets/delete-icon.svg";
import sendIcon from "../../../../Assets/send-icon.svg";
import xIcon from "../../../../Assets/x.svg";

import { useLocale } from "next-intl";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TableRow = (props: any) => {
    const {
        newRequest,
        instaPfpPreview,
        buisnessName,
        email,
        instaPageLink,
        descriptionArm,
        descriptionEng,
        subCategories,
        date,
        id,
        approved,
        denied,
        page,
        updateShops,
        setUpdateShops,
        shopActive,
    } = props;

    const localActive = useLocale();
    const [active, setActive] = useState(shopActive);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleApprove = () => {
        const body = {
            id,
        };
        axios
            .post(`/${localActive}/api/shop/approved`, JSON.stringify(body))
            .then((res) => {
                setUpdateShops(!updateShops);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDeny = () => {
        const body = {
            id,
        };
        axios
            .post(`/${localActive}/api/shop/denied`, JSON.stringify(body))
            .then((res) => {
                setUpdateShops(!updateShops);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEditShop = () => {};

    const deleteShop = () => {
        setOpenDeleteModal(false);
        const body = {
            id,
        };
        axios
            .post(`/${localActive}/api/shop/delete`, JSON.stringify(body))
            .then((res) => {
                setUpdateShops(!updateShops);
                const data = res.data;
                toast(data.message, {
                    type: "success",
                });
            })
            .catch((error) => {
                toast(error, {
                    type: "error",
                });
            });
    };

    const toggleActivateShop = () => {
        const body = {
            id,
        };
        axios
            .post(`/${localActive}/api/shop/activate`, JSON.stringify(body))
            .then((res: any) => {
                const data = res.data;
                if (data.success) {
                    toast(data.message, {
                        type: "success",
                    });
                }
            })
            .catch((error) => {
                toast(error, {
                    type: "error",
                });
            });
    };

    return (
        <>
            <div className={(newRequest ? "new roboto-medium" : "") + " table-row-container"}>
                {openDeleteModal ? (
                    <div
                        className="delete-modal-wrapper"
                        onClick={() => setOpenDeleteModal(false)}
                    >
                        <div
                            className="delete-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="close-modal"
                                onClick={() => setOpenDeleteModal(false)}
                            >
                                <Image
                                    src={xIcon}
                                    alt="X Icon"
                                />
                            </div>
                            <h2>Ջնջել</h2>

                            <p>
                                Ցանկանում եք ջնջել <strong>{buisnessName}</strong> հաշիվը։
                            </p>

                            <button
                                className="button"
                                onClick={deleteShop}
                            >
                                Ջնջել
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div className="brand-logo-name">
                    <Image
                        priority
                        src={instaPfpPreview}
                        width={60}
                        height={60}
                        alt="Brand Logo"
                    ></Image>
                    <p>{buisnessName}</p>
                </div>
                <div className="email">
                    <p>{email}</p>
                </div>
                <div className="link">
                    <Link href={instaPageLink}>{instaPageLink}</Link>
                </div>
                <div className="desc-arm-eng">
                    <p>{descriptionArm}</p>
                    <p>{descriptionEng}</p>
                </div>
                <div className="categories">
                    {subCategories.length &&
                        subCategories.map((category: any, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="category"
                                >
                                    {localActive === "hy"
                                        ? category.subCategoryArm
                                        : localActive === "en"
                                        ? category.subCategoryEng
                                        : ""}
                                </div>
                            );
                        })}
                </div>
                <div className="date">
                    <p>{date}</p>
                </div>
                {page === "notifications" ? (
                    !(approved || denied) ? (
                        <div className="approve-reject-icons">
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                onClick={handleApprove}
                            ></FontAwesomeIcon>
                            <FontAwesomeIcon
                                icon={faXmarkCircle}
                                onClick={handleDeny}
                            ></FontAwesomeIcon>
                        </div>
                    ) : approved ? (
                        <div className="approved-denied approved">
                            <p>Approved</p>
                        </div>
                    ) : denied ? (
                        <div className="approved-denied denied">
                            <p>Denied</p>
                        </div>
                    ) : (
                        ""
                    )
                ) : page === "approved" ? (
                    <div className="edit-delete-activate-icons">
                        <div className="edit-and-delete">
                            <Image
                                src={editIcon}
                                alt="Edit Icon"
                            ></Image>
                        </div>
                        <div
                            className="edit-and-delete"
                            onClick={() => setOpenDeleteModal(true)}
                        >
                            <Image
                                src={deleteIcon}
                                alt="Delete Icon"
                            ></Image>
                        </div>
                        <div
                            onClick={() => {
                                setActive(!active);
                                toggleActivateShop();
                            }}
                            className={(active ? "active " : "") + "activate-btn"}
                        >
                            <div className="active-indicator"></div>
                        </div>
                    </div>
                ) : page === "denied" ? (
                    <div className="send-delete-icons">
                        <div>
                            <Image
                                src={sendIcon}
                                alt="Edit Icon"
                            ></Image>
                        </div>
                        <div onClick={() => setOpenDeleteModal(true)}>
                            <Image
                                src={deleteIcon}
                                alt="Edit Icon"
                            ></Image>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default TableRow;
