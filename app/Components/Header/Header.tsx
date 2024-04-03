import Image from "next/image";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import logo from "../../../Assets/logo.svg";
import { useState } from "react";

export default function Header() {
    const [selectedLanguage, setSelectedLanguage] = useState("Հայ");
    const [languages, setLanguages] = useState([
        {
            text: "Հայ",
            selected: true,
        },
        {
            text: "Eng",
            selected: false,
        },
    ]);

    const changeLanguage = (ind: number) => {
        const arr = languages.map((lang, index) => {
            if (ind === index) {
                lang.selected = true;
                setSelectedLanguage(lang.text);
            } else {
                lang.selected = false;
            }
            return lang;
        });

        setLanguages(arr);
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo-container">
                    <Link href={"/"}>
                        <Image src={logo} alt="Picture of the author" />
                    </Link>
                </div>
                <div className="search">
                    <div className="search-input-container">
                        <input type="text" placeholder="Որոնել" />
                    </div>
                    <div className="search-icon-container">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div className="language-container">
                    <div>
                        <p>
                            {selectedLanguage}
                            <FontAwesomeIcon icon={faChevronDown} />
                        </p>
                        <ul>
                            {languages &&
                                languages.map((lang, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className={
                                                lang.selected ? "selected" : ""
                                            }
                                            onClick={() =>
                                                changeLanguage(index)
                                            }
                                        >
                                            {lang.text}
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
