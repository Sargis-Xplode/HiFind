import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "./tableRow.scss";

import brandLogo from "../../../../Assets/brand-logo.svg";
import { useLocale } from "next-intl";
import axios from "axios";

const TableRow = (props: any) => {
    const localActive = useLocale();

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
    } = props;

    const handleApprove = () => {
        const body = {
            id,
        };
        axios
            .post(`/${localActive}/api/shop/approved`, JSON.stringify(body))
            .then((res) => {
                console.log(res.data);
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
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className={(newRequest ? "new" : "") + " table-row-container"}>
            <div className="brand-logo-name">
                <Image
                    priority
                    src={brandLogo}
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
            {approved || denied ? (
                " "
            ) : (
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
            )}
        </div>
    );
};

export default TableRow;
