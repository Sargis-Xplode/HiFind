import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import "./shop.scss";
import ShopInteface from "../../../../types/shopBox";
import Link from "next/link";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Shop = ({ categoryIcon, brandLogo, shopName, shopInstaName, shopDescription }: ShopInteface) => {
    const link = "https://www.instagram.com/rodeni_shop/";
    return (
        <Link
            href={link}
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
                        src={brandLogo}
                        alt="Picture of the author"
                    />
                </div>
                <div className="box-text-container">
                    <p>{shopName}</p>
                    <p>{shopDescription}</p>
                </div>
                <div className="hover-box">
                    <div>
                        <FontAwesomeIcon icon={faInstagram} />
                    </div>
                    <p>{shopInstaName}</p>
                </div>
            </div>
        </Link>
    );
};

export default Shop;
