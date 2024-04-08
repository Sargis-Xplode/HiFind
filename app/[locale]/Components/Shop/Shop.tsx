import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import "./shop.scss";
import ShopInteface from "../../../../types/shopBox";
import Link from "next/link";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import brandLogo from "../../../../Assets/brand-logo.svg";
import categoryIcon from "../../../../Assets/brush-icon.svg";

const Shop = ({
    buisnessName,
    descriptionArm,
    descriptionEng,
    instaPageLink,
    instaPfpPreview = brandLogo,
    subCategories,
}: ShopInteface) => {
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
                        alt="Picture of the author"
                    />
                </div>
                <div className="box-image-container">
                    <Image
                        priority
                        src={brandLogo}
                        alt="Picture of the author"
                    />
                </div>
                <div className="box-text-container">
                    <p>{buisnessName}</p>
                    <p>{descriptionArm}</p>
                </div>
                <div className="box-tags-container">
                    <div>
                        {subCategories.map((tag, index: number) => {
                            return <p key={index}>{tag}</p>;
                        })}
                    </div>
                </div>
                <div className="hover-box">
                    <div>
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <p>{instaPageLink}</p>
                </div>
            </div>
        </Link>
    );
};

export default Shop;
