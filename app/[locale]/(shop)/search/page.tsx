"use client";
import { useEffect, useState, useContext } from "react";
import Shop from "../../Components/Shop/Shop";
import "./page.scss";

import ReactPaginate from "react-paginate";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";
import { SearchContext } from "../../provider";
import { useRouter, useSearchParams } from "next/navigation";
const Skeleton = dynamic(() => import("react-loading-skeleton"));

const SearchShops = (props: any) => {
    const { push } = useRouter();
    const { filter, page } = props.searchParams;
    const { submittedSearchText, searchActive } = useContext(SearchContext);

    const t = useTranslations("shopsPage");

    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState<any>([]);
    const [currentItems, setCurrentItems] = useState(shops);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [itemOffSet, setItemOffSet] = useState(0);
    // const [itemOffSet, setItemOffSet] = useState((page - 1) * itemsPerPage);
    const [pageCount, setPageCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // autoChangePage(page - 1);

        axios
            .get("api/shop/all")
            .then((res) => {
                let shops = res.data.shops;
                setShops(shops);
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
            console.log(submittedSearchText);
            if (searchActive && submittedSearchText.length) {
                // User searched for something?
                renderingArray = shops.filter((shop: any) => {
                    if (
                        shop.buisnessName.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                        shop.descriptionArm.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                        shop.descriptionEng.toLowerCase().includes(submittedSearchText.toLowerCase())
                    ) {
                        return true;
                    }
                });
            }

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
        push(`?filter=${filter}&page=${e.selected + 1}`);
        setItemOffSet(newOffset);
    };

    return (
        <>
            <section className="shops-section">
                <div className="container">
                    <div className={"shops-container"}>
                        {currentItems && currentItems.length > 0 ? (
                            currentItems?.map((shop: any, index) => {
                                const {
                                    buisnessName,
                                    descriptionArm,
                                    descriptionEng,
                                    instaPageLink,
                                    instaPfpPreview,
                                    categoryName,
                                    subCategories,
                                    approved,
                                } = shop;

                                if (approved) {
                                    return (
                                        <Shop
                                            key={index}
                                            buisnessName={buisnessName}
                                            descriptionArm={descriptionArm}
                                            descriptionEng={descriptionEng}
                                            instaPageLink={instaPageLink}
                                            instaPfpPreview={instaPfpPreview}
                                            categoryName={categoryName}
                                            subCategories={subCategories}
                                        ></Shop>
                                    );
                                }
                            })
                        ) : loading ? (
                            <div style={{ width: "100%", display: "flex" }}>
                                <Skeleton
                                    highlightColor="#e0e0e0"
                                    containerClassName="shop-box-skeleton"
                                />
                                <Skeleton
                                    highlightColor="#e0e0e0"
                                    containerClassName="shop-box-skeleton"
                                />
                            </div>
                        ) : (
                            <div>
                                <h1>{t("noResults")}</h1>
                                <p>{t("trySearchingSmthElse")}</p>
                            </div>
                        )}
                    </div>
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
                        // forcePage={page - 1}
                    />
                )}
            </section>
        </>
    );
};

export default SearchShops;
