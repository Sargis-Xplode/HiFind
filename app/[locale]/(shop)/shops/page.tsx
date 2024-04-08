"use client";
import { useEffect, useState } from "react";
import { faCheckCircle, faFilter, faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Shop from "../../Components/Shop/Shop";
import "./page.scss";

import ReactPaginate from "react-paginate";
import { useTranslations } from "next-intl";
import axios from "axios";

const Shops = () => {
    const t = useTranslations("shopsPage");
    const t2 = useTranslations("homePage");

    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [searchActive, setSearchActive] = useState(false);
    const [currentItems, setCurrentItems] = useState(shops);
    const [heading, setHeading] = useState("shops");

    const [itemOffSet, setItemOffSet] = useState(0);
    const [endOffSet, setEndOffSet] = useState(0);
    const [mobileFilterMenu, setMobileFilterMenu] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [atLeastOneVariantSelected, setAtLeastOneVariantSelected] = useState(false);

    useEffect(() => {
        axios
            .get("api/shop/all")
            .then((res) => {
                const shops = res.data.shops;
                setShops(shops.reverse());
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (shops.length) {
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

    const [categories, setCategories] = useState([
        {
            category: "shops",
            clicked: false,
            variants: [
                {
                    variant: "shops",
                    selected: false,
                },
                {
                    variant: "shops",
                    selected: false,
                },
                {
                    variant: "shops",
                    selected: false,
                },
                {
                    variant: "shops",
                    selected: false,
                },
                {
                    variant: "shops",
                    selected: false,
                },
                {
                    variant: "shops",
                    selected: false,
                },
                {
                    variant: "shops",
                    selected: false,
                },
            ],
        },
        {
            category: "services",
            clicked: false,
            variants: [
                {
                    variant: "services",
                    selected: false,
                },
                {
                    variant: "services",
                    selected: false,
                },
                {
                    variant: "services",
                    selected: false,
                },
                {
                    variant: "services",
                    selected: false,
                },
                {
                    variant: "services",
                    selected: false,
                },
                {
                    variant: "services",
                    selected: false,
                },
                {
                    variant: "services",
                    selected: false,
                },
            ],
        },
        {
            category: "entertainment",
            clicked: false,
            variants: [
                {
                    variant: "entertainment",
                    selected: false,
                },
                {
                    variant: "entertainment",
                    selected: false,
                },
                {
                    variant: "entertainment",
                    selected: false,
                },
                {
                    variant: "entertainment",
                    selected: false,
                },
                {
                    variant: "entertainment",
                    selected: false,
                },
                {
                    variant: "entertainment",
                    selected: false,
                },
                {
                    variant: "entertainment",
                    selected: false,
                },
            ],
        },
        {
            category: "beauty",
            clicked: false,
            variants: [
                {
                    variant: "beauty",
                    selected: false,
                },
                {
                    variant: "beauty",
                    selected: false,
                },
                {
                    variant: "beauty",
                    selected: false,
                },
                {
                    variant: "beauty",
                    selected: false,
                },
                {
                    variant: "beauty",
                    selected: false,
                },
                {
                    variant: "beauty",
                    selected: false,
                },
                {
                    variant: "beauty",
                    selected: false,
                },
            ],
        },
        {
            category: "healthCare",
            clicked: false,
            variants: [
                {
                    variant: "healthCare",
                    selected: false,
                },
                {
                    variant: "healthCare",
                    selected: false,
                },
                {
                    variant: "healthCare",
                    selected: false,
                },
                {
                    variant: "healthCare",
                    selected: false,
                },
                {
                    variant: "healthCare",
                    selected: false,
                },
                {
                    variant: "healthCare",
                    selected: false,
                },
                {
                    variant: "healthCare",
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
                allShops={shops}
                setSearchActive={setSearchActive}
            ></Header>
            <section className="shops-section">
                <h2>{t2(heading)}</h2>
                <div className="container">
                    {mobileFilterMenu && (
                        <div className="filters-container-mobile">
                            <div className="container">
                                <div className="filter-heading-container-mobile">
                                    <div>
                                        <h3>{t2(heading)}</h3>
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
                                                      {t2(category.category)}
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
                                                                        {t2(variant.variant)} {index}
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
                                        {t("clearFilters")}
                                    </div>
                                    <button
                                        className="filter-check-mobile button"
                                        onClick={filter}
                                    >
                                        {t("filter")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="filters-container">
                        <div className="filter-heading-container">
                            <h3>{t("filters")}</h3>
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
                                              {t2(category.category)}
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
                                                                {t2(variant.variant)} {index}
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
                            {t("clearFilters")}
                        </div>
                    </div>

                    <div className={(mobileFilterMenu ? "display-none" : "") + " shops-container"}>
                        <div
                            className="filters-btn-mobile"
                            onClick={openMobileFilter}
                        >
                            {t("filters")}
                            <FontAwesomeIcon icon={faFilter} />
                        </div>

                        {currentItems.length > 0 ? (
                            currentItems.map((shop, index) => {
                                const {
                                    buisnessName,
                                    descriptionArm,
                                    descriptionEng,
                                    instaPageLink,
                                    instaPfpPreview,
                                    subCategories,
                                } = shop;
                                return (
                                    <Shop
                                        key={index}
                                        buisnessName={buisnessName}
                                        descriptionArm={descriptionArm}
                                        descriptionEng={descriptionEng}
                                        instaPageLink={instaPageLink}
                                        instaPfpPreview={""}
                                        subCategories={subCategories}
                                    ></Shop>
                                );
                            })
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
                    />
                )}
            </section>
            <Footer></Footer>
        </div>
    );
};

export default Shops;
