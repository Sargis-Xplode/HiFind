"use client";
import { CSSProperties, useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import sortLogo from "../../../../Assets/sort-icon.svg";
import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";
import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/MoonLoader";
import TableRow from "../../Components/TableRow/TableRow";
import { useLocale } from "next-intl";

const override: CSSProperties = {
    display: "flex",
    margin: "0 auto",
    borderColor: "red",
};

const Approved = () => {
    const localActive = useLocale();
    const [loading, setLoading] = useState(true);

    const [shops, setShops] = useState<any>([]);
    const [filteredShops, setFilteredShops] = useState([]);

    const [currentItems, setCurrentItems] = useState(shops);
    const [itemOffSet, setItemOffSet] = useState(0);
    const [endOffSet, setEndOffSet] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        axios
            .get(`/${localActive}/api/shop/all`)
            .then((res) => {
                const shops = res.data.shops;
                setShops(shops.reverse());
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (shops.length) {
            setLoading(false);

            setEndOffSet(itemOffSet + itemsPerPage);
            const arr =
                filteredShops.length > 0
                    ? filteredShops.slice(itemOffSet, itemOffSet + itemsPerPage)
                    : !searchActive
                    ? shops.slice(itemOffSet, itemOffSet + itemsPerPage)
                    : [];

            setCurrentItems(arr);

            const count =
                filteredShops.length > 0
                    ? Math.ceil(filteredShops.length / itemsPerPage)
                    : !searchActive
                    ? Math.ceil(shops.length / itemsPerPage)
                    : 0;
            setPageCount(count);
        }
    }, [shops, itemOffSet, filteredShops, searchActive]);

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % shops.length;
        setItemOffSet(newOffset);
    };

    return (
        <section>
            <AdminAsidePanel
                selected={"approved"}
                notificationCounter={0}
            ></AdminAsidePanel>
            <main>
                <h2>Հաստատված հաշիվներ</h2>
                <div className="search">
                    <div className="search-input-container">
                        <input
                            name="searchApproved"
                            type="text"
                            placeholder="Որոնել"
                        />
                    </div>
                    <div className="search-icon-container">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
                <div className="table">
                    <div className="table-titles">
                        <p>Անուն</p>
                        <p>Էլ. հասցե</p>
                        <p>Ինստագրամ</p>
                        <p>Նկարագրություն</p>
                        <p>Ընտրացանկ</p>
                        <p>
                            Օրը{" "}
                            <Image
                                src={sortLogo}
                                alt="Sort"
                            ></Image>
                        </p>
                    </div>
                    {currentItems.length ? (
                        currentItems.map((shop: any, index: number) => {
                            if (shop.approved) {
                                return (
                                    <TableRow
                                        key={index}
                                        newRequest={shop.newRequest}
                                        instaPfpPreview={shop.instaPfpPreview}
                                        buisnessName={shop.buisnessName}
                                        email={shop.email}
                                        instaPageLink={shop.instaPageLink}
                                        descriptionArm={shop.descriptionArm}
                                        descriptionEng={shop.descriptionArm}
                                        subCategories={shop.subCategories}
                                        date={"05.07.2023"}
                                        id={shop._id}
                                    ></TableRow>
                                );
                            }
                        })
                    ) : loading ? (
                        <div className="sweet-loading">
                            <ClipLoader
                                color={"#ec008b"}
                                loading={loading}
                                cssOverride={override}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                speedMultiplier={1}
                            />
                        </div>
                    ) : (
                        <p>Nothing here yet</p>
                    )}
                </div>
                {pageCount >= 2 && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(e) => handlePageClick(e)}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        activeClassName={"selected-page"}
                    />
                )}
            </main>
        </section>
    );
};

export default Approved;

// const TableRow = (props: any) => {
//     const { newNotification, brandName, email, link, descriptionArm, descriptionEng, categories, date, active } = props;
//     return (
//         <div className={newNotification ? "new" : ""}>
//             <div className="brand-logo-name">
//                 <Image
//                     priority
//                     src={brandLogo}
//                     alt="Brand Logo"
//                 ></Image>
//                 <p>{brandName}</p>
//             </div>
//             <div className="email">
//                 <p>{email}</p>
//             </div>
//             <div className="link">
//                 <Link href={link}>{link}</Link>
//             </div>
//             <div className="desc-arm-eng">
//                 <p>{descriptionArm}</p>
//                 <p>{descriptionEng}</p>
//             </div>
//             <div className="categories">
//                 {categories.length &&
//                     categories.map((category: any, index: number) => {
//                         return (
//                             <div
//                                 key={index}
//                                 className="category"
//                             >
//                                 {category}
//                             </div>
//                         );
//                     })}
//             </div>
//             <div className="date">
//                 <p>{date}</p>
//             </div>
//             <div className="approve-reject-icons">
//                 <div>
//                     <Image
//                         src={editIcon}
//                         alt="Edit Icon"
//                     ></Image>
//                 </div>
//                 <div>
//                     <Image
//                         src={deleteIcon}
//                         alt="Edit Icon"
//                     ></Image>
//                 </div>
//                 {active ? (
//                     <div className="activate-btn">
//                         <div className="active-indicator"></div>
//                     </div>
//                 ) : (
//                     <div className="activate-btn inactive">
//                         <div className="active-indicator"></div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
