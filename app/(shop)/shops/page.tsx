"use client";
import { useState } from "react";
import {
    faCheckCircle,
    faFilter,
    faMinus,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Shop from "../../Components/Shop/Shop";
import "./page.scss";

import { allShops } from "../../../Assets/js/assets";
import ReactPaginate from "react-paginate";

const Shops = () => {
    const [shops, setShops] = useState(allShops);

    const [itemOffset, setItemOffset] = useState(0);

    // ---------------------------------------------------
    const itemsPerPage = 12;
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = shops.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(shops.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % shops.length;
        console.log(
            `User requested page number ${e.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    // ---------------------------------------------------

    const [categories, setCategories] = useState([
        {
            category: "Խանութներ",
            clicked: false,
        },
        {
            category: "Ծառայություններ",
            clicked: false,
        },
        {
            category: "Ժամանց",
            clicked: false,
        },
        {
            category: "Գեղեցկություն",
            clicked: false,
        },
        {
            category: "Առողջություն/Խնամք",
            clicked: false,
        },
    ]);

    const [variants, setVariants] = useState([
        {
            variant: "Տարբերակ",
            selected: false,
        },
        {
            variant: "Տարբերակ",
            selected: false,
        },
        {
            variant: "Տարբերակ",
            selected: false,
        },
        {
            variant: "Տարբերակ",
            selected: false,
        },
        {
            variant: "Տարբերակ",
            selected: false,
        },
        {
            variant: "Տարբերակ",
            selected: false,
        },
        {
            variant: "Տարբերակ",
            selected: false,
        },
    ]);

    const toggleCheck = (index: number) => {
        const arr = variants.map((vari, ind) => {
            if (ind === index) {
                vari.selected = !vari.selected;
            }
            return vari;
        });

        setVariants(arr);
    };

    const handleOpenDropDown = (index: number) => {
        const arr = categories.map((categ, ind) => {
            if (index === ind) {
                categ.clicked = !categ.clicked;
            }
            return categ;
        });
        setCategories(arr);
    };

    const clearFilters = () => {
        const arr = variants.map((vari, ind) => {
            vari.selected = false;
            return vari;
        });

        setVariants(arr);
    };

    return (
        <div>
            <Header></Header>
            <section className="shops-section">
                <h2>Խանութներ</h2>
                <div className="container">
                    <div className="filters-container">
                        <div className="filter-heading-container">
                            <h3>Ֆիլտրեր</h3>
                            <FontAwesomeIcon icon={faFilter} />
                        </div>

                        {categories.length
                            ? categories.map((category, index) => {
                                  return (
                                      <div className="categories" key={index}>
                                          <div
                                              className="categories-with-plus "
                                              onClick={() =>
                                                  handleOpenDropDown(index)
                                              }
                                          >
                                              {category.category}
                                              {category.clicked ? (
                                                  <FontAwesomeIcon
                                                      icon={faMinus}
                                                  />
                                              ) : (
                                                  <FontAwesomeIcon
                                                      icon={faPlus}
                                                  />
                                              )}
                                          </div>
                                          <div
                                              className={
                                                  (category.clicked
                                                      ? "clicked "
                                                      : "") + "dropdown-slider"
                                              }
                                          >
                                              {variants.length
                                                  ? variants.map(
                                                        (variant, index) => {
                                                            return (
                                                                <div
                                                                    className="variant"
                                                                    key={index}
                                                                >
                                                                    <div
                                                                        onClick={() =>
                                                                            toggleCheck(
                                                                                index
                                                                            )
                                                                        }
                                                                        className="checkbox-round"
                                                                    >
                                                                        {variant.selected ? (
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faCheckCircle
                                                                                }
                                                                            ></FontAwesomeIcon>
                                                                        ) : (
                                                                            ""
                                                                        )}
                                                                    </div>
                                                                    {
                                                                        variant.variant
                                                                    }{" "}
                                                                    {index}
                                                                </div>
                                                            );
                                                        }
                                                    )
                                                  : ""}
                                          </div>
                                      </div>
                                  );
                              })
                            : ""}

                        <div className="clear-filters" onClick={clearFilters}>
                            Մաքրել Ֆիլտրերը
                        </div>
                    </div>
                    <div className="shops-container">
                        {/* {shops.map((shop, index) => {
                            return (
                                
                            );
                        })} */}
                        {currentItems &&
                            currentItems.map((shop, index) => (
                                <Shop
                                    key={index}
                                    categoryIcon={shop.categoryIcon}
                                    brandLogo={shop.brandLogo}
                                    shopName={shop.shopName}
                                    shopInstaName={shop.shopInstaName}
                                    shopDescription={shop.shopDescription}
                                ></Shop>
                            ))}
                    </div>
                </div>
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => handlePageClick(e)}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Shops;
