"use client";
import { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import brandLogo from "../../../../Assets/brand-logo.svg";
import sortLogo from "../../../../Assets/sort-icon.svg";
import sendIcon from "../../../../Assets/send-icon.svg";
import deleteIcon from "../../../../Assets/delete-icon.svg";
import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";
import { useRouter } from "next/navigation";
import { checkAuth } from "../../utils/auth";

const Denied = () => {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/");
        } else {
            checkAuth(token);
        }
    }, []);

    return (
        <section>
            <AdminAsidePanel></AdminAsidePanel>
            <main>
                <h2>Մերժված հայտեր</h2>
                <div className="search">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder="Որոնել"
                        />
                    </div>
                    <div className="search-icon-container">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div className="table">
                    <div className="table-titles">
                        <p>Անուն</p>
                        <p>Էլ. հասցե</p>
                        <p>Ինստագրամ</p>
                        <p>Նկարագրություն</p>
                        <p>Ընտրացանկ</p>
                        <p>
                            Օրը{" "}
                            <Image
                                src={sortLogo}
                                alt="Sort"
                            ></Image>
                        </p>
                    </div>
                    <TableRow
                        newNotification={true}
                        brandLogo={brandLogo}
                        brandName={"Brand Name"}
                        email={"rodenishop@gmail.com"}
                        link={"https://www.instagram.com/reserve_eat/"}
                        descriptionArm={"Եղիր այն մեկը , ումով կհիանան ✨"}
                        descriptionEng={"Be the one they admire ✨"}
                        categories={["Կոշիկ", "Պայուսակ", "Աքսեսուարներ"]}
                        date={"05.07.2023"}
                    ></TableRow>
                    <TableRow
                        newNotification={true}
                        brandLogo={brandLogo}
                        brandName={"Brand Name"}
                        email={"rodenishop@gmail.com"}
                        link={"https://www.instagram.com/reserve_eat/"}
                        descriptionArm={"Եղիր այն մեկը , ումով կհիանան ✨"}
                        descriptionEng={"Be the one they admire ✨"}
                        categories={["Կոշիկ", "Պայուսակ", "Աքսեսուարներ"]}
                        date={"05.07.2023"}
                    ></TableRow>
                    <TableRow
                        newNotification={false}
                        brandLogo={brandLogo}
                        brandName={"Brand Name"}
                        email={"rodenishop@gmail.com"}
                        link={"https://www.instagram.com/reserve_eat/"}
                        descriptionArm={"Եղիր այն մեկը , ումով կհիանան ✨"}
                        descriptionEng={"Be the one they admire ✨"}
                        categories={["Կոշիկ", "Պայուսակ", "Աքսեսուարներ"]}
                        date={"05.07.2023"}
                    ></TableRow>
                    <TableRow
                        newNotification={false}
                        brandLogo={brandLogo}
                        brandName={"Brand Name"}
                        email={"rodenishop@gmail.com"}
                        link={"https://www.instagram.com/reserve_eat/"}
                        descriptionArm={"Եղիր այն մեկը , ումով կհիանան ✨"}
                        descriptionEng={"Be the one they admire ✨"}
                        categories={["Կոշիկ", "Պայուսակ", "Աքսեսուարներ"]}
                        date={"05.07.2023"}
                    ></TableRow>
                    <TableRow
                        newNotification={false}
                        brandLogo={brandLogo}
                        brandName={"Brand Name"}
                        email={"rodenishop@gmail.com"}
                        link={"https://www.instagram.com/reserve_eat/"}
                        descriptionArm={"Եղիր այն մեկը , ումով կհիանան ✨"}
                        descriptionEng={"Be the one they admire ✨"}
                        categories={["Կոշիկ", "Պայուսակ", "Աքսեսուարներ"]}
                        date={"05.07.2023"}
                    ></TableRow>
                </div>
            </main>
        </section>
    );
};

export default Denied;

const TableRow = (props: any) => {
    const { newNotification, brandName, email, link, descriptionArm, descriptionEng, categories, date } = props;
    return (
        <div className={newNotification ? "new" : ""}>
            <div className="brand-logo-name">
                <Image
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
        </div>
    );
};
