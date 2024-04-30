"use client";
import { useEffect, useState } from "react";
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

const Approved = () => {
    const localActive = useLocale();
    const [loading, setLoading] = useState(true);

    const [shops, setShops] = useState<any>([]);
    const [filteredShops, setFilteredShops] = useState<any>([]);
    const [submittedSearchText, setSubmittedSearchText] = useState("");
    const [currentItems, setCurrentItems] = useState(shops);
    const [itemOffSet, setItemOffSet] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [searchActive, setSearchActive] = useState(false);
    const [updateShops, setUpdateShops] = useState(false);

    useEffect(() => {
        axios
            .get(`/${localActive}/api/shop/all/approved`)
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
            let renderingArray = shops;

            // -------------------------------------------------
            // Filters the shops which contain the searched text
            // -------------------------------------------------

            if (searchActive && submittedSearchText.length) {
                // User searched for something?
                renderingArray = shops.filter((shop: any) => {
                    if (
                        (shop.buisnessName.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                            shop.descriptionArm.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                            shop.descriptionEng.toLowerCase().includes(submittedSearchText.toLowerCase())) &&
                        shop.approved
                    ) {
                        return true;
                    }
                });
            }

            setFilteredShops(renderingArray);

            renderCurrentItems(renderingArray);
        }
    }, [itemOffSet, shops, submittedSearchText]);

    const renderCurrentItems = (currentArray: any) => {
        // Render current page shops ( max 12 )
        const arr = currentArray.length > 0 ? currentArray.slice(itemOffSet, itemOffSet + itemsPerPage) : [];
        setCurrentItems(arr);

        // Decide the pagination page count
        const count = currentArray.length > 0 ? Math.ceil(currentArray.length / itemsPerPage) : 0;
        setPageCount(count);
        setLoading(false);
    };

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % filteredShops.length;
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
                            onChange={(e) => {
                                setSearchActive(true);
                                setSubmittedSearchText(e.target.value);
                            }}
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
                                        descriptionEng={shop.descriptionEng}
                                        subCategories={shop.subCategories}
                                        date={shop.date}
                                        id={shop._id}
                                        page={"approved"}
                                        shopActive={shop.active}
                                        updateShops={updateShops}
                                        setUpdateShops={setUpdateShops}
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

export default Approved;
