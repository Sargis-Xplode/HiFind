import Image from "next/image";
import { useState } from "react";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import logo from "../../../Assets/logo.svg";
import { useRouter, usePathname } from "next/navigation";

export default function Header(props: any) {
    const router = useRouter();
    const path = usePathname();

    const { allShops, setFilteredShops } = props;
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

    const [searchText, setSearchText] = useState("");

    const changeSearchText = (e: any) => {
        setSearchText(e.target.value);
    };

    const searchShops = () => {
        if (path !== "/shops") {
            router.push("/shops");
            return;
        }
        const filteredShops = allShops.filter((shop: any, index: number) => {
            if (
                shop.shopName.includes(searchText) ||
                shop.shopDescription.includes(searchText)
            ) {
                return shop;
            }
        });
        setFilteredShops(filteredShops);
    };

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
                        <input
                            type="text"
                            placeholder="Որոնել"
                            value={searchText}
                            onChange={(e) => changeSearchText(e)}
                        />
                    </div>
                    <div
                        className="search-icon-container"
                        onClick={searchShops}
                    >
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
