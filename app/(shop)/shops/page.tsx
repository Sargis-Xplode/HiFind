"use client";
import { useEffect, useState } from "react";
import { faCheckCircle, faFilter, faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Shop from "../../Components/Shop/Shop";
import "./page.scss";

import { allShops, allFilteredShops } from "../../../Assets/js/assets";
import ReactPaginate from "react-paginate";

const Shops = () => {
    const [shops, setShops] = useState(allShops);
    const [filteredShops, setFilteredShops] = useState<any>(allFilteredShops);
    const [currentItems, setCurrentItems] = useState(shops);
    const [heading, setHeading] = useState("Խանութներ");

    const [itemOffSet, setItemOffSet] = useState(0);
    const [endOffSet, setEndOffSet] = useState(0);
    const [mobileFilterMenu, setMobileFilterMenu] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [atLeastOneVariantSelected, setAtLeastOneVariantSelected] = useState(false);

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % shops.length;
        setItemOffSet(newOffset);
    };

    useEffect(() => {
        setEndOffSet(itemOffSet + itemsPerPage);
        const arr =
            filteredShops.length > 0
                ? filteredShops.slice(itemOffSet, itemOffSet + itemsPerPage)
                : shops.slice(itemOffSet, itemOffSet + itemsPerPage);

        setCurrentItems(arr);

        const count =
            filteredShops.length > 0
                ? Math.ceil(filteredShops.length / itemsPerPage)
                : Math.ceil(shops.length / itemsPerPage);
        setPageCount(count);
    }, [itemOffSet, filteredShops]);

    const [categories, setCategories] = useState([
        {
            category: "Խանութներ",
            clicked: false,
            variants: [
                {
                    variant: "Խանութ",
                    selected: false,
                },
                {
                    variant: "Խանութ",
                    selected: false,
                },
                {
                    variant: "Խանութ",
                    selected: false,
                },
                {
                    variant: "Խանութ",
                    selected: false,
                },
                {
                    variant: "Խանութ",
                    selected: false,
                },
                {
                    variant: "Խանութ",
                    selected: false,
                },
                {
                    variant: "Խանութ",
                    selected: false,
                },
            ],
        },
        {
            category: "Ծառայություններ",
            clicked: false,
            variants: [
                {
                    variant: "Ծառայություններ",
                    selected: false,
                },
                {
                    variant: "Ծառայություններ",
                    selected: false,
                },
                {
                    variant: "Ծառայություններ",
                    selected: false,
                },
                {
                    variant: "Ծառայություններ",
                    selected: false,
                },
                {
                    variant: "Ծառայություններ",
                    selected: false,
                },
                {
                    variant: "Ծառայություններ",
                    selected: false,
                },
                {
                    variant: "Ծառայություններ",
                    selected: false,
                },
            ],
        },
        {
            category: "Ժամանց",
            clicked: false,
            variants: [
                {
                    variant: "Ժամանց",
                    selected: false,
                },
                {
                    variant: "Ժամանց",
                    selected: false,
                },
                {
                    variant: "Ժամանց",
                    selected: false,
                },
                {
                    variant: "Ժամանց",
                    selected: false,
                },
                {
                    variant: "Ժամանց",
                    selected: false,
                },
                {
                    variant: "Ժամանց",
                    selected: false,
                },
                {
                    variant: "Ժամանց",
                    selected: false,
                },
            ],
        },
        {
            category: "Գեղեցկություն",
            clicked: false,
            variants: [
                {
                    variant: "Գեղեցկություն",
                    selected: false,
                },
                {
                    variant: "Գեղեցկություն",
                    selected: false,
                },
                {
                    variant: "Գեղեցկություն",
                    selected: false,
                },
                {
                    variant: "Գեղեցկություն",
                    selected: false,
                },
                {
                    variant: "Գեղեցկություն",
                    selected: false,
                },
                {
                    variant: "Գեղեցկություն",
                    selected: false,
                },
                {
                    variant: "Գեղեցկություն",
                    selected: false,
                },
            ],
        },
        {
            category: "Առողջություն/Խնամք",
            clicked: false,
            variants: [
                {
                    variant: "Առողջություն/Խնամք",
                    selected: false,
                },
                {
                    variant: "Առողջություն/Խնամք",
                    selected: false,
                },
                {
                    variant: "Առողջություն/Խնամք",
                    selected: false,
                },
                {
                    variant: "Առողջություն/Խնամք",
                    selected: false,
                },
                {
                    variant: "Առողջություն/Խնամք",
                    selected: false,
                },
                {
                    variant: "Առողջություն/Խնամք",
                    selected: false,
                },
                {
                    variant: "Առողջություն/Խնամք",
                    selected: false,
                },
            ],
        },
    ]);

    const toggleCheck = (categ: any, index: number) => {
        setAtLeastOneVariantSelected(true);
        const arr = categ.variants.map((vari: any, ind: number) => {
            if (ind === index) {
                vari.selected = !vari.selected;
            }
            return vari;
        });

        setCategories([...categories]);
    };

    const handleOpenDropDown = (index: number, categoryName: string) => {
        clearFilters();
        setHeading(categoryName);

        const arr = categories.map((categ, ind) => {
            if (index === ind) {
                categ.clicked = true;
            } else {
                categ.clicked = false;
            }
            return categ;
        });
        setCategories(arr);
    };

    const clearFilters = () => {
        const arr = categories.map((categ) => {
            categ?.variants?.map((vari) => {
                vari.selected = false;
                return vari;
            });
            return categ;
        });

        setAtLeastOneVariantSelected(false);
        setCategories(arr);
    };

    const filter = () => {
        closeMobileFilter();
    };

    const openMobileFilter = () => {
        setMobileFilterMenu(true);
    };

    const closeMobileFilter = () => {
        setMobileFilterMenu(false);
    };

    return (
        <div>
            <Header
                setFilteredShops={setFilteredShops}
                allShops={allShops}
            ></Header>
            <section className="shops-section">
                <h2>{heading}</h2>
                <div className="container">
                    {mobileFilterMenu && (
                        <div className="filters-container-mobile">
                            <div className="container">
                                <div className="filter-heading-container-mobile">
                                    <div>
                                        <h3>{heading}</h3>
                                        <FontAwesomeIcon icon={faFilter} />
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faX}
                                        onClick={closeMobileFilter}
                                    />
                                </div>

                                {categories.length
                                    ? categories.map((category, index) => {
                                          return (
                                              <div
                                                  className="categories-mobile"
                                                  key={index}
                                              >
                                                  <div
                                                      className="categories-with-plus-mobile"
                                                      onClick={() => handleOpenDropDown(index, category.category)}
                                                  >
                                                      {category.category}
                                                      {category.clicked ? (
                                                          <FontAwesomeIcon icon={faMinus} />
                                                      ) : (
                                                          <FontAwesomeIcon icon={faPlus} />
                                                      )}
                                                  </div>
                                                  <div
                                                      className={
                                                          (category.clicked ? "clicked " : "") + "dropdown-slider"
                                                      }
                                                  >
                                                      {category.variants.length
                                                          ? category.variants.map((variant, index) => {
                                                                return (
                                                                    <div
                                                                        className="variant"
                                                                        key={index}
                                                                        onClick={() => toggleCheck(category, index)}
                                                                    >
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
                                                                        {variant.variant} {index}
                                                                    </div>
                                                                );
                                                            })
                                                          : ""}
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ""}

                                <div className="buttons-container-mobile">
                                    <div
                                        className={
                                            (atLeastOneVariantSelected ? "" : "display-none") + " clear-filters-mobile"
                                        }
                                        onClick={clearFilters}
                                    >
                                        Մաքրել Ֆիլտրերը
                                    </div>
                                    <button
                                        className="filter-check-mobile button"
                                        onClick={filter}
                                    >
                                        Ֆիլտրել
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="filters-container">
                        <div className="filter-heading-container">
                            <h3>Ֆիլտրեր</h3>
                            <FontAwesomeIcon icon={faFilter} />
                        </div>

                        {categories.length
                            ? categories.map((category, index) => {
                                  return (
                                      <div
                                          className="categories"
                                          key={index}
                                      >
                                          <div
                                              className="categories-with-plus "
                                              onClick={() => handleOpenDropDown(index, category.category)}
                                          >
                                              {category.category}
                                              {category.clicked ? (
                                                  <FontAwesomeIcon icon={faMinus} />
                                              ) : (
                                                  <FontAwesomeIcon icon={faPlus} />
                                              )}
                                          </div>
                                          <div className={(category.clicked ? "clicked " : "") + "dropdown-slider"}>
                                              {category?.variants?.length
                                                  ? category?.variants.map((variant, index) => {
                                                        return (
                                                            <div
                                                                className="variant"
                                                                key={index}
                                                                onClick={() => toggleCheck(category, index)}
                                                            >
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
                                                                {variant.variant} {index}
                                                            </div>
                                                        );
                                                    })
                                                  : ""}
                                          </div>
                                      </div>
                                  );
                              })
                            : ""}

                        <div
                            className={(atLeastOneVariantSelected ? "" : "display-none") + " clear-filters"}
                            onClick={clearFilters}
                        >
                            Մաքրել Ֆիլտրերը
                        </div>
                    </div>

                    <div className={(mobileFilterMenu ? "display-none" : "") + " shops-container"}>
                        <div
                            className="filters-btn-mobile"
                            onClick={openMobileFilter}
                        >
                            Ֆիլտրեր
                            <FontAwesomeIcon icon={faFilter} />
                        </div>

                        {currentItems.map((shop, index) => (
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
                    activeClassName={"selected-page"}
                />
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Shops;
