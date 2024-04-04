"use client"
// import { useEffect, useState } from "react"
import "./page.scss"
// import axios from "axios"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import logo from "../../../Assets/logo.svg";
import signOutIcon from "../../../Assets/sign-out-icon.svg";
import bellIcon from "../../../Assets/bell-icon.svg";
import userCheckIcon from "../../../Assets/user-check-icon.svg";
import userMinusIcon from "../../../Assets/user-minus-icon.svg";
import filterIcon from "../../../Assets/filter-icon.svg";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import editIcon from "../../../Assets/edit-icon.svg";
import deleteIcon from "../../../Assets/delete-icon.svg";
import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";

const CategoriesList = () => {
    // const [email, setEmail] = useState("")

    // useEffect(() => {
    //     axios.get('/api/admin/login/')
    //         .then((data: any) => {
    //             console.log(data.data.data[0].email)
    //             setEmail(data.data.data[0].email)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    // }, [])

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
    )
}

export default CategoriesList

const CategoryItem: any = (props: any) => {
    return (
        <div className="row">
            <div className="first-column">
                <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                <p>{props.name}</p>
            </div>
            <div className="edit-delete-icons">
                <div>
                    <Image src={editIcon} alt="Edit Icon"></Image>
                </div>
                <div>
                    <Image src={deleteIcon} alt="Edit Icon"></Image>
                </div>
            </div>
        </div>
    )
}