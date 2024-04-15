import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "./tableRow.scss";

import brandLogo from "../../../../Assets/brand-logo.svg";
import editIcon from "../../../../Assets/edit-icon.svg";
import deleteIcon from "../../../../Assets/delete-icon.svg";
import sendIcon from "../../../../Assets/send-icon.svg";

import { useLocale } from "next-intl";
import axios from "axios";
import { useState } from "react";

const TableRow = (props: any) => {
    const localActive = useLocale();
    const [active, setActive] = useState(true);

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
    } = props;

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

    return (
        <div className={(newRequest ? "new roboto-medium" : "") + " table-row-container"}>
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
                                {localActive === "hy" ? category.subCategoryArm : category.subcategoryEng}
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
                <div className="approve-reject-icons">
                    <div>
                        <Image
                            src={editIcon}
                            alt="Edit Icon"
                        ></Image>
                    </div>
                    <div>
                        <Image
                            src={deleteIcon}
                            alt="Edit Icon"
                        ></Image>
                    </div>
                    {active ? (
                        <div className="activate-btn">
                            <div className="active-indicator"></div>
                        </div>
                    ) : (
                        <div className="activate-btn inactive">
                            <div className="active-indicator"></div>
                        </div>
                    )}
                </div>
            ) : page === "denied" ? (
                <div className="approve-reject-icons">
                    <div>
                        <Image
                            src={sendIcon}
                            alt="Edit Icon"
                        ></Image>
                    </div>
                    <div>
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
    );
};

export default TableRow;
