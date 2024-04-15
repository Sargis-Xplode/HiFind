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
import TableRow from "../../Components/TableRow/TableRow";
import { useLocale } from "next-intl";

import dynamic from "next/dynamic";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

const Denied = () => {
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
                selected={"denied"}
                notificationCounter={0}
            ></AdminAsidePanel>
            <main>
                <h2>Մերժված հայտեր</h2>
                <div className="search">
                    <div className="search-input-container">
                        <input
                            type="text"
                            name="searchDenied"
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
                        <p className="date-tile">
                            Օրը{" "}
                            <Image
                                src={sortLogo}
                                alt="Sort"
                            ></Image>
                        </p>
                    </div>
                    {currentItems.length ? (
                        currentItems.map((shop: any, index: number) => {
                            if (shop.denied) {
                                return (
                                    <TableRow
                                        key={index}
                                        newRequest={shop.newRequest}
                                        instaPfpPreview={shop.instaPfpPreview}
                                        buisnessName={shop.buisnessName}
                                        email={shop.email}
                                        instaPageLink={shop.instaPageLink}
                                        descriptionArm={shop.descriptionArm}
                                        descriptionEng={shop.descriptionEng}
                                        subCategories={shop.subCategories}
                                        date={"05.07.2023"}
                                        id={shop._id}
                                        page={"denied"}
                                    ></TableRow>
                                );
                            }
                        })
                    ) : loading ? (
                        <Skeleton
                            height={100}
                            count={5}
                            highlightColor="#e0e0e0"
                            className="margin-bottom-10"
                        />
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

export default Denied;
