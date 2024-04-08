"use client";
import { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import editIcon from "../../../../Assets/edit-icon.svg";
import deleteIcon from "../../../../Assets/delete-icon.svg";
import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";
import { useRouter } from "next/navigation";

const CategoriesList = () => {
    const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");

    //     if (!token) {
    //         router.push("/");
    //     } else {
    //         checkAuth(token);
    //     }
    // }, []);

    return (
        <section>
            <AdminAsidePanel></AdminAsidePanel>
            <main>
                <h2>Ընտրացանկ</h2>

                <div className="list">
                    <CategoryItem name={"Խանութներ"}></CategoryItem>
                    <CategoryItem name={"Ծառայություն"}></CategoryItem>
                    <CategoryItem name={"Ժամանց"}></CategoryItem>
                    <CategoryItem name={"Գեղեցկություն"}></CategoryItem>
                    <CategoryItem name={"Առողջություն / Խնամք"}></CategoryItem>
                </div>
            </main>
        </section>
    );
};

export default CategoriesList;

const CategoryItem: any = (props: any) => {
    return (
        <div className="row">
            <div className="first-column">
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                <p>{props.name}</p>
            </div>
            <div className="edit-delete-icons">
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
            </div>
        </div>
    );
};
