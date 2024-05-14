import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "./tableRow.scss";
import { Tooltip as ReactTooltip } from "react-tooltip";

import editIcon from "../../../../public/edit-icon.svg";
import deleteIcon from "../../../../public/delete-icon.svg";
import sendIcon from "../../../../public/send-icon.svg";
import xIcon from "../../../../public/x.svg";

import { useLocale } from "next-intl";
import axios from "axios";
import { useState } from "react";

const TableRow = (props: any) => {
    const {
        newRequest,
        instaPfpPreview,
        buisnessName,
        email,
        instaPageLink,
        descriptionArm,
        descriptionEng,
        categoryName,
        subCategories,
        date,
        id,
        approved,
        denied,
        page,
        shopActive,
        setOpenEditModal,
        setBody,
        toast,
        currentItems,
        setCurrentItems,
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
                const arr = currentItems.map((item: any) => {
                    if (item._id === id) {
                        item.approved = true;
                        item.denied = false;
                        item.newRequest = false;
                    }
                    return item;
                });
                setCurrentItems(arr);
                toast(res.data.message, {
                    type: "success",
                });
            })
            .catch((error) => {
                toast(error, {
                    type: "error",
                });
            });
    };

    const handleDeny = () => {
        const body = {
            id,
        };
        axios
            .post(`/${localActive}/api/shop/denied`, JSON.stringify(body))
            .then((res) => {
                toast(res.data.message, {
                    type: "success",
                });

                const arr = currentItems.map((item: any) => {
                    if (item._id === id) {
                        item.approved = false;
                        item.denied = true;
                        item.newRequest = false;
                    }
                    return item;
                });
                setCurrentItems(arr);
            })
            .catch((error) => {
                toast(error, {
                    type: "error",
                });
                console.log(error);
            });
    };

    const handleEditShop = () => {
        const body = {
            buisnessNameProp: buisnessName,
            emailProp: email,
            instaPageLinkProp: instaPageLink,
            descriptionArmProp: descriptionArm,
            descriptionEngProp: descriptionEng,
            instaPfpProp: instaPfpPreview,
            categoryNameProp: categoryName,
            subCategoriesProp: subCategories,
            id,
        };

        setBody(body);
    };

    const deleteShop = () => {
        setOpenDeleteModal(false);
        const body = {
            id,
        };
        axios
            .post(`/${localActive}/api/shop/delete`, JSON.stringify(body))
            .then((res) => {
                const arr = currentItems.filter((item: any) => item._id !== id);
                setCurrentItems(arr);
                toast(res.data.message, {
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
                toast(res.data.message, {
                    type: "success",
                });
            })
            .catch((error) => {
                toast(error, {
                    type: "error",
                });
            });
    };

    const sendMail = () => {
        axios
            .post(`/${localActive}/api/mail/resend`, {
                to: email,
                subject: "Shop request resent",
                name: buisnessName,
            })
            .then((res) => {
                toast(res.data.message, {
                    type: "success",
                });
            })
            .catch((error) => {
                toast(error, {
                    type: "error",
                });
            });
    };

    return (
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
                            data-tooltip-id="approve"
                            icon={faCheckCircle}
                            onClick={handleApprove}
                        ></FontAwesomeIcon>
                        <FontAwesomeIcon
                            data-tooltip-id="deny"
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
                    <div
                        className="edit-and-delete"
                        onClick={() => {
                            setOpenEditModal(true);
                            handleEditShop();
                        }}
                        data-tooltip-id="edit"
                    >
                        <Image
                            src={editIcon}
                            alt="Edit Icon"
                        ></Image>
                    </div>
                    <div
                        className="edit-and-delete"
                        onClick={() => {
                            setOpenDeleteModal(true);
                        }}
                        data-tooltip-id="delete"
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
                        data-tooltip-id={"activate"}
                    >
                        <div className="active-indicator"></div>
                    </div>
                </div>
            ) : page === "denied" ? (
                <div className="send-delete-icons">
                    <div
                        data-tooltip-id="send"
                        onClick={sendMail}
                    >
                        <Image
                            src={sendIcon}
                            alt="Send Icon"
                        ></Image>
                    </div>
                    <div
                        onClick={() => setOpenDeleteModal(true)}
                        data-tooltip-id="delete"
                    >
                        <Image
                            src={deleteIcon}
                            alt="Delete Icon"
                        ></Image>
                    </div>
                </div>
            ) : (
                ""
            )}
            <ReactTooltip
                id="approve"
                content="Ընդունել"
                variant="light"
            />
            <ReactTooltip
                id="deny"
                variant="light"
                content="Մերժել"
            />
            <ReactTooltip
                id="edit"
                variant="light"
                content="Խմբագրել"
            />
            <ReactTooltip
                id="delete"
                variant="light"
                content="Ջնջել"
            />
            <ReactTooltip
                id="activate"
                variant="light"
                content={"Ակտիվացնել"}
            />
            <ReactTooltip
                id="send"
                variant="light"
                content="Ուղարկել հայտ"
            />
        </div>
    );
};

export default TableRow;
