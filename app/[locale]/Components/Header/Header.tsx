import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import logo from "../../../../Assets/logo.svg";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function Header(props: any) {
    const { push } = useRouter();
    const path = usePathname();

    const { allShops, setFilteredShops, setSearchActive } = props;
    const [selectedLanguage, setSelectedLanguage] = useState("Հայ");
    const [languages, setLanguages] = useState([
        {
            text: "Հայ",
            value: "hy",
            selected: true,
        },
        {
            text: "Eng",
            value: "en",
            selected: false,
        },
    ]);

    const t = useTranslations("header");

    const [isPending, startTransition] = useTransition();
    const localActive = useLocale();

    const [searchText, setSearchText] = useState("");

    const changeSearchText = (e: any) => {
        setSearchText(e.target.value);
        if (!e.target.value.length) setSearchActive(false);
    };

    const searchShops = () => {
        if (path !== `/${localActive}/shops`) {
            push(`/${localActive}/shops`);
            return;
        }
        const filteredShops = allShops.filter((shop: any, index: number) => {
            if (shop.buisnessName.includes(searchText) || shop.descriptionArm.includes(searchText)) {
                return shop;
            }
        });
        setFilteredShops(filteredShops);
        setSearchActive(true);
    };

    const changeLanguage = (ind: number) => {
        let nextLocale: string;
        const arr = languages.map((lang, index) => {
            if (ind === index) {
                lang.selected = true;
                setSelectedLanguage(lang.text);
                nextLocale = lang.value;
                const newPath = path.replace(`/${localActive}`, `/${nextLocale}`);

                startTransition(() => {
                    push(newPath);
                });
            } else {
                lang.selected = false;
            }
            return lang;
        });

        setLanguages(arr);
    };

    useEffect(() => {
        const arr = languages.map((lang) => {
            if (localActive === lang.value) {
                lang.selected = true;
                setSelectedLanguage(lang.text);
            } else {
                lang.selected = false;
            }
            return lang;
        });
        setLanguages(arr);
    }, []);

    return (
        <header className="header">
            <div className="container">
                <div className="logo-container">
                    <Link href={"/"}>
                        <Image
                            src={logo}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <div className="search">
                    <div className="search-input-container">
                        <input
                            type="text"
                            placeholder={t("search_placeholder")}
                            value={searchText}
                            name="search"
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
                                            className={lang.selected ? "selected" : ""}
                                            onClick={() => changeLanguage(index)}
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
