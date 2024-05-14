import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import "./shop.scss";
import ShopInteface from "../../../../types/shopBox";
import Link from "next/link";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import brandLogo from "../../../../public/brand-logo.svg";
import shopCategoryIcon from "../../../../public/shopping-bag.svg";
import servicesCategoryIcon from "../../../../public/gears.svg";
import entertainmentCategoryIcon from "../../../../public/dishes.svg";
import beautyCategoryIcon from "../../../../public/brush.svg";
import healthCareCategoryIcon from "../../../../public/heart-plus.svg";
import { useLocale, useTranslations } from "next-intl";

const Shop = ({
    buisnessName,
    descriptionArm,
    descriptionEng,
    instaPageLink,
    instaPfpPreview,
    subCategories,
    categoryName,
}: ShopInteface) => {
    const localActive = useLocale();
    const t = useTranslations("homePage");
    let categoryIcon = "";

    if (t(categoryName) === t("shops")) {
        categoryIcon = shopCategoryIcon;
    } else if (t(categoryName) === t("services")) {
        categoryIcon = servicesCategoryIcon;
    } else if (t(categoryName) === t("entertainment")) {
        categoryIcon = entertainmentCategoryIcon;
    } else if (t(categoryName) === t("beauty")) {
        categoryIcon = beautyCategoryIcon;
    } else if (t(categoryName) === t("healthCare")) {
        categoryIcon = healthCareCategoryIcon;
    }

    return (
        <Link
            href={instaPageLink}
            className="shop-link"
            target="_blank"
        >
            <div className="suggested-pages-box">
                <div className="box-little-icon">
                    <Image
                        src={categoryIcon}
                        alt={categoryName}
                    />
                </div>
                <div className="box-image-container">
                    <div className="image-container">
                        {instaPfpPreview ? (
                            <Image
                                priority
                                src={instaPfpPreview}
                                alt="Brang Logo"
                                fill
                            />
                        ) : (
                            <Image
                                priority
                                src={brandLogo}
                                alt="Brand Logo"
                            />
                        )}
                    </div>
                </div>
                <div className="box-text-container">
                    <p>{buisnessName}</p>
                    <p>{localActive === "hy" ? descriptionArm : descriptionEng}</p>
                </div>
                <div className="box-tags-container">
                    <div>
                        {subCategories.map((variant: any, index: number) => {
                            return (
                                <p key={index}>
                                    {localActive === "hy" ? variant.subCategoryArm : variant.subCategoryEng}
                                </p>
                            );
                        })}
                    </div>
                </div>
                <div className="hover-box">
                    <div>
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <div className="insta-link">{instaPageLink}</div>
                    {/* {instaPageLink} */}
                </div>
            </div>
        </Link>
    );
};

export default Shop;
