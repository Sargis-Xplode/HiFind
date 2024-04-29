import Image from "next/image";
import { useEffect, useState, useTransition } from "react";
import "./header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import logo from "../../../../Assets/logo.svg";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function Header(props: any) {
    const { searchText, setSearchText, setSearchActive, setSubmittedSearchText } = props;

    const searchParams = useSearchParams();

    const filter = searchParams.get("filter");

    const { push } = useRouter();
    const path = usePathname();

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

    const changeSearchText = (e: any) => {
        setSearchText(e.target.value);
        if (!e.target.value.length) {
            setSearchActive(false);
            setSubmittedSearchText("");
        }
    };

    const searchShops = () => {
        if (!searchText.length) return;
        if (path !== `/${localActive}/search`) {
            push(`/${localActive}/search`);
        }
        setSearchActive(true);
        setSubmittedSearchText(searchText);
    };

    const changeLanguage = (ind: number) => {
        let nextLocale: string;
        const arr = languages.map((lang, index) => {
            if (ind === index) {
                lang.selected = true;
                setSelectedLanguage(lang.text);
                nextLocale = lang.value;
                const query = `?filter=${filter}`;
                const newPath = path.replace(`/${localActive}`, `/${nextLocale}`);

                startTransition(() => {
                    if (newPath === "/en/shops" || newPath === "/hy/shops") {
                        push(newPath + query);
                    } else {
                        push(newPath);
                    }
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
                            priority
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
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    searchShops();
                                }
                            }}
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
