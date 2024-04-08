"use client";
import { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import brandLogo from "../../../../Assets/brand-logo.svg";
import sortLogo from "../../../../Assets/sort-icon.svg";
import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";
import { useRouter } from "next/navigation";
import TableRow from "../../Components/TableRow/page";

const Notification = () => {
    const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (!token) {
    //         router.push("/");
    //     } else {
    //         console.log(checkAuth(token));
    //     }
    // }, []);

    return (
        <section>
            <AdminAsidePanel selected={"notifications"}></AdminAsidePanel>
            <main>
                <h2>Ծանուցումներ</h2>

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

export default Notification;
