"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./page.scss";
import {
    faCheckCircle,
    faChevronDown,
    faUpload,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

import uploadIcon from "../../../Assets/upload-icon.svg";
import { useRouter } from "next/navigation";

const JoinUs = () => {
    const router = useRouter();

    const [checked, setChecked] = useState(false);
    const [validationCheck, setValidationCheck] = useState(false);
    const [buisnessName, setBuisnessName] = useState("");
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [instaPageLink, setInstaPageLink] = useState("");
    const [validInstaPageLink, setValidInstaPageLink] = useState(false);
    const [descriptionArm, setDescriptionArm] = useState("");
    const [descriptionEng, setDescriptionEng] = useState("");
    const [instaPfp, setInstaPfp] = useState("");
    const [instaPfpPreview, setInstaPfpPreview] = useState("");
    const [validPfp, setValidPfp] = useState(false);
    const [selectedCategoryCount, setSelectedCategoryCount] = useState(2);

    const toggleCheck = () => {
        setChecked(!checked);
    };

    const handleBuisnessNameChange = (e: any) => {
        setBuisnessName(e.target.value);
    };

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
        if (e.target.value.length < 3) {
            setValidEmail(false);
            return;
        }
        const regex: any =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regex.test(e.target.value)) {
            setValidEmail(true);
        } else {
            setValidEmail(false);
        }
    };

    const handleInstaLinkChange = (e: any) => {
        setInstaPageLink(e.target.value);
        if (e.target.value.length < 3) {
            setValidInstaPageLink(false);
            return;
        }
        const regex =
            /^\s*(https\:\/\/)?www\.instagram\.com\/[a-z\A-Z\d\-_.\/]{1,255}\s*$/;
        if (regex.test(e.target.value)) {
            setValidInstaPageLink(true);
        } else {
            setValidInstaPageLink(false);
        }
    };

    const handleDescriptionArmChange = (e: any) => {
        if (e.target.value.length > 150) {
            return;
        }
        setDescriptionArm(e.target.value);
    };
    const handleDescriptionEngChange = (e: any) => {
        if (e.target.value.length > 150) {
            return;
        }
        setDescriptionEng(e.target.value);
    };

    const handlePfpChange = (e: any) => {
        setInstaPfp(e.target.value);
        setInstaPfpPreview(URL.createObjectURL(e.target.files[0]));
        if (e.target.files[0].size / 1024000 <= 2) {
            setValidPfp(true);
        } else {
            setValidPfp(false);
        }
    };

    const handleSubmitJoinUs = () => {
        setValidationCheck(true);
        if (
            buisnessName.length < 3 ||
            !validEmail ||
            !validInstaPageLink ||
            descriptionArm.length < 3 ||
            descriptionEng.length < 3 ||
            !validPfp ||
            selectedCategoryCount === 0 ||
            !checked
        ) {
            return;
        } else {
            router.push("/success");
        }
    };

    return (
        <div>
            <Header></Header>
            <section className="join-us-section">
                <div className="container">
                    <div className="join-us-modal-container">
                        <div className="join-us-modal">
                            <h3>Գրանցում</h3>
                            <p>
                                Բիզնես էջի անուն (ինչպես գրանցված եք
                                Instagram-ում)
                            </p>
                            <input
                                type="text"
                                placeholder="Բիզնեսի անուն"
                                value={buisnessName}
                                onChange={(e) => handleBuisnessNameChange(e)}
                            />
                            <p
                                className={
                                    (validationCheck && buisnessName.length < 4
                                        ? "error "
                                        : "") + "error-text"
                                }
                            >
                                Մուտքագրեք Ձեր բիզնեսի անունը
                            </p>

                            <p>Էլ. հասցե</p>
                            <input
                                type="text"
                                placeholder="Էլ. հասցե"
                                value={email}
                                onChange={(e) => handleEmailChange(e)}
                            />
                            {email.length === 0 ? (
                                <p
                                    className={
                                        (validationCheck && !validEmail
                                            ? "error "
                                            : "") + "error-text"
                                    }
                                >
                                    Մուտքագրեք Ձեր Էլ․ հասցեն
                                </p>
                            ) : (
                                <p
                                    className={
                                        (validationCheck && !validEmail
                                            ? "error "
                                            : "") + "error-text"
                                    }
                                >
                                    Էլ․ հասցեն անվավեր է
                                </p>
                            )}

                            <p>Instagram-յան էջի հղում</p>
                            <input
                                type="text"
                                placeholder="Instagram-յան էջի հղում"
                                value={instaPageLink}
                                onChange={(e) => handleInstaLinkChange(e)}
                            />
                            {instaPageLink.length === 0 ? (
                                <p
                                    className={
                                        (validationCheck && !validInstaPageLink
                                            ? "error "
                                            : "") + "error-text"
                                    }
                                >
                                    Մուտքագրեք Ձեր էջի հղումը
                                </p>
                            ) : (
                                <p
                                    className={
                                        (validationCheck && !validInstaPageLink
                                            ? "error "
                                            : "") + "error-text"
                                    }
                                >
                                    Հղումն անվավեր է
                                </p>
                            )}

                            <p>Նկարագրություն</p>
                            <div className="description-textarea">
                                <textarea
                                    maxLength={150}
                                    placeholder="Նկարագրությունը հայերեն"
                                    value={descriptionArm}
                                    onChange={(e) =>
                                        handleDescriptionArmChange(e)
                                    }
                                    className={
                                        validationCheck &&
                                        descriptionArm.length < 4
                                            ? "error-input"
                                            : ""
                                    }
                                ></textarea>
                                <span
                                    className={
                                        validationCheck &&
                                        descriptionArm.length < 4
                                            ? "error-textarea-span"
                                            : ""
                                    }
                                >
                                    {descriptionArm.length}/150
                                </span>
                            </div>

                            <div className="description-textarea">
                                <textarea
                                    maxLength={150}
                                    placeholder="Նկարագրությունը անգլերեն"
                                    value={descriptionEng}
                                    onChange={(e) =>
                                        handleDescriptionEngChange(e)
                                    }
                                    className={
                                        validationCheck &&
                                        descriptionEng.length < 4
                                            ? "error-input"
                                            : ""
                                    }
                                ></textarea>
                                <span
                                    className={
                                        validationCheck &&
                                        descriptionEng.length < 4
                                            ? "error-textarea-span"
                                            : ""
                                    }
                                >
                                    {descriptionEng.length}/150
                                </span>
                            </div>

                            <p>Նկար</p>
                            {instaPfp.length === 0 ? (
                                <div className="add-photo">
                                    <Image
                                        src={uploadIcon}
                                        alt="Upload Icon"
                                    ></Image>
                                    <p>Ավելացնել նկար (jpg,png)</p>
                                    <input
                                        type="file"
                                        name="logo"
                                        onChange={(e) => handlePfpChange(e)}
                                        className="brand-logo"
                                    />
                                </div>
                            ) : (
                                <div className="photo-loaded">
                                    <img src={instaPfpPreview} alt="Preview" />
                                    <input
                                        type="file"
                                        name="logo"
                                        onChange={(e) => handlePfpChange(e)}
                                        className="brand-logo"
                                    />
                                </div>
                            )}

                            {instaPfp.length === 0 ? (
                                <p
                                    className={
                                        (validationCheck && !validPfp
                                            ? "error "
                                            : "") + "error-text"
                                    }
                                >
                                    Վերբեռնեք ձեր էջի նկարը
                                </p>
                            ) : (
                                <p
                                    className={
                                        (validationCheck && !validPfp
                                            ? "error "
                                            : "") + "error-text"
                                    }
                                >
                                    Դուք կարող եք վերբեռնել առնվազն 2 mb
                                </p>
                            )}

                            <ul>
                                <li>
                                    Ձեր բիզնեսն ամենալավը բնութագրող կատեգորիան
                                </li>
                                <li>
                                    Խանութ{" "}
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </li>
                                <li>
                                    Ծառայություն{" "}
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </li>
                                <li>
                                    Ժամանց{" "}
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </li>
                                <li>
                                    Գեղեցկություն{" "}
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </li>
                                <li>
                                    Առողջություն/Խնամք{" "}
                                    <FontAwesomeIcon icon={faChevronDown} />
                                </li>
                            </ul>
                            <p
                                className={
                                    (validationCheck &&
                                    selectedCategoryCount === 0
                                        ? "error "
                                        : "") + "error-text"
                                }
                            >
                                Ընտրեք որևէ կատեգորիա, որ հաճախորդները կարողանան
                                Ձեզ ավելի հեշտ գտնել
                            </p>

                            <div className="agreed">
                                <div
                                    onClick={toggleCheck}
                                    className={
                                        (checked ? "checked " : "") +
                                        "checkbox-round"
                                    }
                                >
                                    {checked ? (
                                        <FontAwesomeIcon
                                            icon={faCheckCircle}
                                        ></FontAwesomeIcon>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <span>
                                    Համաձայն եմ &nbsp;
                                    <Link href={"/privacy"}>
                                        {" "}
                                        գաղտնիության քաղաքականությանը{" "}
                                    </Link>
                                    &nbsp; և &nbsp;
                                    <Link href={"/terms"}>
                                        {" "}
                                        օգտագործման պայմաններին
                                    </Link>
                                    :
                                </span>
                            </div>

                            <button
                                type="submit"
                                className={
                                    "button" + (checked ? "" : " disabled")
                                }
                                onClick={handleSubmitJoinUs}
                            >
                                Գրանցվել
                            </button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default JoinUs;
