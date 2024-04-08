import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import "./page.scss";

import brandLogo from "../../../../Assets/brand-logo.svg";

const TableRow = (props: any) => {
    const { newNotification, brandName, email, link, descriptionArm, descriptionEng, categories, date } = props;
    return (
        <div className={(newNotification ? "new" : "") + " table-row-container"}>
            <div className="brand-logo-name">
                <Image
                    priority
                    src={brandLogo}
                    alt="Brand Logo"
                ></Image>
                <p>{brandName}</p>
            </div>
            <div className="email">
                <p>{email}</p>
            </div>
            <div className="link">
                <Link href={link}>{link}</Link>
            </div>
            <div className="desc-arm-eng">
                <p>{descriptionArm}</p>
                <p>{descriptionEng}</p>
            </div>
            <div className="categories">
                {categories.length &&
                    categories.map((category: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="category"
                            >
                                {category}
                            </div>
                        );
                    })}
            </div>
            <div className="date">
                <p>{date}</p>
            </div>
            <div className="approve-reject-icons">
                <FontAwesomeIcon icon={faCheckCircle}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
            </div>
        </div>
    );
};

export default TableRow;
