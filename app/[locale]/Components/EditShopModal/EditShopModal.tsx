"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./editShopModal.scss";
import { faCheckCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Image from "next/image";

import brandLogo from "../../../../Assets/brand-logo.svg";
import xIcon from "../../../../Assets/x.svg";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";

import dynamic from "next/dynamic";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

const EditShopModal = ({ setOpenEditModal, body }: any) => {
    const {
        buisnessNameProp,
        emailProp,
        instaPageLinkProp,
        descriptionArmProp,
        descriptionEngProp,
        instaPfpProp,
        categoryNameProp,
        subCategoriesProp,
        id,
    } = body;

    const t = useTranslations("joinUsModalPage");
    const t2 = useTranslations("errors");
    const t3 = useTranslations("homePage");

    const localActive = useLocale();

    const [validationCheck, setValidationCheck] = useState(false);
    const [buisnessName, setBuisnessName] = useState(buisnessNameProp);
    const [email, setEmail] = useState(emailProp);
    const [validEmail, setValidEmail] = useState(true);
    const [instaPageLink, setInstaPageLink] = useState(instaPageLinkProp);
    const [validInstaPageLink, setValidInstaPageLink] = useState(true);
    const [descriptionArm, setDescriptionArm] = useState(descriptionArmProp);
    const [descriptionEng, setDescriptionEng] = useState(descriptionEngProp);
    const [instaPfpPreview, setInstaPfpPreview] = useState<any>(instaPfpProp);
    const [validSizePfp, setValidSizePfp] = useState(true);
    const [validExtensionPfp, setValidExtensionPfp] = useState(true);
    const [atLeastOneClicked, setAtLeastOneClicked] = useState(false);
    const [pending, setPending] = useState(false);

    const [categories, setCategories] = useState<any>([]);

    const [categoryName, setCategoryName] = useState<any>(categoryNameProp);
    const [subCategories, setSubCategories] = useState<any>(subCategoriesProp);

    useEffect(() => {
        axios
            .get(`/${localActive}/api/categories/all`)
            .then((res) => {
                const categoriesDB = res.data.categories;
                setCategories(categoriesDB);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
        const regex = /^\s*(https\:\/\/)?www\.instagram\.com\/[a-zA-Z\d\-_.?=\/]{1,255}\s*$/;
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
        const fileName = e.target.value;
        const extension = fileName.split(".").pop();

        const fs = new FileReader();
        fs.readAsDataURL(e.target.files[0]);
        fs.onload = () => {
            setInstaPfpPreview(fs.result);
        };

        if (e.target.files[0].size / 1024000 <= 2) {
            setValidSizePfp(true);
        } else {
            setValidSizePfp(false);
        }

        if (extension === "jpg" || extension === "png" || extension === "svg" || extension === "jpeg") {
            setValidExtensionPfp(true);
        } else {
            setValidExtensionPfp(false);
        }
    };

    const handleOpenDropDown = (index: number, categoryName: string) => {
        clearFilters();
        const arr = categories.map((categ: any, ind: number) => {
            if (index === ind) {
                categ.clicked = !categ.clicked;
                if (categ.clicked) {
                    setCategoryName(categ.category);
                    setAtLeastOneClicked(true);
                } else {
                    setAtLeastOneClicked(false);
                }
            } else {
                categ.clicked = false;
            }
            return categ;
        });
        setCategories(arr);
    };

    const toggleCheckCategories = (categ: any, index: number) => {
        categ.variants.map((vari: any, ind: number) => {
            if (ind === index) {
                vari.selected = !vari.selected;
                let arr = subCategories;
                if (vari.selected) {
                    arr = [
                        ...subCategories,
                        {
                            subCategoryArm: vari.subCategoryArm,
                            subCategoryEng: vari.subCategoryEng,
                        },
                    ];
                } else {
                    arr.pop();
                }

                setSubCategories(arr);
            }
            return vari;
        });
        setCategories([...categories]);
    };

    const clearFilters = () => {
        const arr = categories.map((categ: any) => {
            categ?.variants?.map((vari: any) => {
                vari.selected = false;
                return vari;
            });
            return categ;
        });

        setCategories(arr);
        setSubCategories([]);
    };

    const handleSubmitJoinUs = async () => {
        setPending(true);
        setValidationCheck(true);
        if (
            buisnessName.length < 3 ||
            !validEmail ||
            !validInstaPageLink ||
            descriptionArm.length < 3 ||
            descriptionEng.length < 3 ||
            !validSizePfp ||
            !validExtensionPfp ||
            subCategories.length === 0
        ) {
            setPending(false);
            return;
        } else {
            setOpenEditModal(false);

            try {
                const body = {
                    buisnessName,
                    email,
                    instaPageLink,
                    descriptionArm,
                    descriptionEng,
                    instaPfpPreview,
                    categoryName,
                    subCategories,
                    id,
                };

                const res = await axios
                    .post(`/${localActive}/api/shop/update`, JSON.stringify(body))
                    .then((res) => {
                        console.log(res.data.message);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div
            className={`join-us-modal-wrapper`}
            onClick={() => {
                setOpenEditModal(false);
            }}
        >
            <div
                className="join-us-modal"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <p className="close-modal">
                    <Image
                        onClick={() => {
                            setOpenEditModal(false);
                        }}
                        src={xIcon}
                        alt="X Icon"
                    />
                </p>
                <h3>{t("registration")}</h3>
                <p>{t("buissnessNameLabel")}</p>
                <input
                    type="text"
                    placeholder={t("buissnessName")}
                    name="buissnessName"
                    value={buisnessName}
                    onChange={(e) => handleBuisnessNameChange(e)}
                />
                <p className={(validationCheck && buisnessName?.length < 4 ? "error " : "") + "error-text"}>
                    {t2("buisnessNameError")}
                </p>

                <p>{t("emailAddr")}</p>
                <input
                    type="text"
                    placeholder={t("emailAddr")}
                    name="emailAddr"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                />
                {email?.length === 0 ? (
                    <p className={(validationCheck && !validEmail ? "error " : "") + "error-text"}>
                        {t2("emailEmptyError")}
                    </p>
                ) : (
                    <p className={(validationCheck && !validEmail ? "error " : "") + "error-text"}>
                        {t2("emailInvalidError")}
                    </p>
                )}

                <p>{t("instaPageLink")}</p>
                <input
                    type="text"
                    placeholder={t("instaPageLink")}
                    name="instaPageLink"
                    value={instaPageLink}
                    onChange={(e) => handleInstaLinkChange(e)}
                />
                {instaPageLink?.length === 0 ? (
                    <p className={(validationCheck && !validInstaPageLink ? "error " : "") + "error-text"}>
                        {t2("instaPageLinkEmptyError")}
                    </p>
                ) : (
                    <p className={(validationCheck && !validInstaPageLink ? "error " : "") + "error-text"}>
                        {t2("instaPageLinkInvalidError")}
                    </p>
                )}

                <p>{t("description")}</p>
                <div className="description-textarea">
                    <textarea
                        maxLength={150}
                        placeholder={t("descriptionArm")}
                        name="descriptionArm"
                        value={descriptionArm}
                        onChange={(e) => handleDescriptionArmChange(e)}
                        className={validationCheck && descriptionArm?.length < 4 ? "error-input" : ""}
                    ></textarea>
                    <span className={validationCheck && descriptionArm?.length < 4 ? "error-textarea-span" : ""}>
                        {descriptionArm?.length}/150
                    </span>
                </div>

                <div className="description-textarea">
                    <textarea
                        maxLength={150}
                        placeholder={t("descriptionEng")}
                        name="descriptionEng"
                        value={descriptionEng}
                        onChange={(e) => handleDescriptionEngChange(e)}
                        className={validationCheck && descriptionEng?.length < 4 ? "error-input" : ""}
                    ></textarea>
                    <span className={validationCheck && descriptionEng?.length < 4 ? "error-textarea-span" : ""}>
                        {descriptionEng?.length}/150
                    </span>
                </div>

                <p>{t("image")}</p>

                <div className="photo-loaded">
                    {instaPfpPreview ? (
                        <img
                            src={instaPfpPreview}
                            alt="Preview"
                        />
                    ) : (
                        <img
                            src={brandLogo}
                            alt="Preview"
                        />
                    )}
                    <input
                        type="file"
                        name="logo"
                        onChange={(e) => handlePfpChange(e)}
                        className="brand-logo"
                    />
                </div>

                {instaPfpPreview?.length === 0 ? (
                    <p
                        className={
                            (validationCheck && (!validSizePfp || !validExtensionPfp) ? "error " : "") + "error-text"
                        }
                    >
                        {t2("imageEmptyError")}
                    </p>
                ) : !validExtensionPfp ? (
                    <p className={(validationCheck ? "error " : "") + "error-text"}>{t2("onlyJPGorPNG")}</p>
                ) : (
                    <p className={(validationCheck && !validSizePfp ? "error " : "") + "error-text"}>
                        {t2("imageExceedsLimitError")}
                    </p>
                )}

                <ul>
                    <li>{t("chooseCategory")}</li>
                    {categories?.length ? (
                        categories.map((category: any, index: any) => {
                            return (
                                <div
                                    className="categories"
                                    key={index}
                                >
                                    <div
                                        className={
                                            (!category.clicked && atLeastOneClicked ? "inactive " : "") +
                                            "categories-with-plus"
                                        }
                                        onClick={() => handleOpenDropDown(index, category.category)}
                                    >
                                        {t3(category.category)}
                                        {category.clicked ? (
                                            <FontAwesomeIcon icon={faChevronUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        )}
                                    </div>
                                    <div className={(category.clicked ? "clicked " : "") + "dropdown-slider"}>
                                        {category?.variants?.length
                                            ? category?.variants.map((variant: any, index: number) => {
                                                  return (
                                                      <div
                                                          className="variant"
                                                          key={index}
                                                          onClick={() => toggleCheckCategories(category, index)}
                                                      >
                                                          <div>
                                                              <div
                                                                  className={
                                                                      (variant.selected ? "checked " : "") +
                                                                      "checkbox-round"
                                                                  }
                                                              >
                                                                  {variant.selected ? (
                                                                      <FontAwesomeIcon
                                                                          icon={faCheckCircle}
                                                                      ></FontAwesomeIcon>
                                                                  ) : (
                                                                      ""
                                                                  )}
                                                              </div>
                                                          </div>

                                                          <div
                                                              className={
                                                                  (!category.clicked ? "inactive" : "") +
                                                                  " variant-text-container"
                                                              }
                                                          >
                                                              {localActive === "hy"
                                                                  ? variant.subCategoryArm
                                                                  : variant.subCategoryEng}
                                                          </div>
                                                      </div>
                                                  );
                                              })
                                            : ""}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <Skeleton
                            count={5}
                            height={40}
                            highlightColor="#e0e0e0"
                            className="margin-bottom-5"
                        />
                    )}
                </ul>
                <p className={(validationCheck && subCategories?.length === 0 ? "error " : "") + "error-text"}>
                    {t2("chooseCategoryError")}
                </p>

                <button
                    type="button"
                    disabled={pending}
                    className={"button" + (!pending ? "" : " disabled")}
                    onClick={handleSubmitJoinUs}
                >
                    {t("save")}
                </button>
            </div>
        </div>
    );
};

export default EditShopModal;
