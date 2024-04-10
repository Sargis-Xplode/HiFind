"use client";
import { CSSProperties, useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import Shop from "../../Components/Shop/Shop";
import "./page.scss";
import filterIcon from "../../../../Assets/filter-icon.svg";
import Categories from "../../../../types/categories";

import ReactPaginate from "react-paginate";
import ClipLoader from "react-spinners/MoonLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

const override: CSSProperties = {
    display: "flex",
    margin: "0 auto",
    borderColor: "red",
};

const Shops = () => {
    const t = useTranslations("shopsPage");
    const t2 = useTranslations("homePage");
    const t3 = useTranslations("shopCategories");
    const localActive = useLocale();

    const query = useParams();

    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [searchActive, setSearchActive] = useState(false);
    const [currentItems, setCurrentItems] = useState(shops);
    const [heading, setHeading] = useState("");

    const [itemOffSet, setItemOffSet] = useState(0);
    const [endOffSet, setEndOffSet] = useState(0);
    const [mobileFilterMenu, setMobileFilterMenu] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [atLeastOneVariantSelected, setAtLeastOneVariantSelected] = useState(false);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<any>([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        axios
            .get("api/shop/all")
            .then((res) => {
                const shops = res.data.shops;
                setShops(shops.reverse());
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });

        axios
            .get(`/${localActive}/api/categories/all`)
            .then((res) => {
                const categoriesDB = res.data.categories;
                setCategories(categoriesDB);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (shops.length) {
            let filtered = false;

            const arr = shops.filter((shop: any) => {
                selectedCategories.map((category) => {
                    if (shop.subCategories.includes(category)) {
                        filtered = true;
                    }

                    return category;
                });

                if (filtered) return shop;
            });

            setFilteredShops(arr);
        }
    }, [categories]);

    useEffect(() => {
        if (shops.length) {
            setLoading(false);

            setEndOffSet(itemOffSet + itemsPerPage);
            const arr =
                filteredShops.length > 0
                    ? filteredShops.slice(itemOffSet, itemOffSet + itemsPerPage)
                    : !searchActive && selectedCategories.length === 0
                    ? shops.slice(itemOffSet, itemOffSet + itemsPerPage)
                    : [];

            setCurrentItems(arr);

            const count =
                filteredShops.length > 0
                    ? Math.ceil(filteredShops.length / itemsPerPage)
                    : !searchActive && selectedCategories.length === 0
                    ? Math.ceil(shops.length / itemsPerPage)
                    : 0;
            setPageCount(count);
        }
    }, [shops, itemOffSet, filteredShops, searchActive]);

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % shops.length;
        setItemOffSet(newOffset);
    };

    const toggleCheck = (categ: any, index: number) => {
        setAtLeastOneVariantSelected(true);
        categ.variants.map((vari: any, ind: number) => {
            if (ind === index) {
                vari.selected = !vari.selected;
                let array: any = [...selectedCategories];
                if (vari.selected) {
                    array = [...selectedCategories, vari.variant];
                } else {
                    array.pop();
                }
                setSelectedCategories(array);
            }
            return vari;
        });

        setCategories([...categories]);
    };

    const handleOpenDropDown = (index: number, categoryName: string) => {
        clearFilters();
        setHeading(categoryName);

        const arr = categories.map((categ: any, ind: number) => {
            if (index === ind) {
                categ.clicked = !categ.clicked;
            } else {
                categ.clicked = false;
            }
            return categ;
        });
        setCategories(arr);
    };

    const clearFilters = () => {
        const arr = categories.map((categ: any) => {
            categ?.variants?.map((vari: any) => {
                vari.selected = false;
                return vari;
            });
            return categ;
        });

        setAtLeastOneVariantSelected(false);
        setSelectedCategories([]);
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
                <h2>{heading}</h2>
                <div className="container">
                    {mobileFilterMenu && (
                        <div className="filters-container-mobile">
                            <div className="container">
                                <div className="filter-heading-container-mobile">
                                    <div>
                                        <h3>{heading}</h3>
                                        <Image
                                            src={filterIcon}
                                            alt={"filter"}
                                        ></Image>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faX}
                                        onClick={closeMobileFilter}
                                    />
                                </div>

                                {categories.length
                                    ? categories.map((category: any, index: number) => {
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
                                                          ? category.variants.map((variant: any, index: number) => {
                                                                return (
                                                                    <div
                                                                        className="variant"
                                                                        key={index}
                                                                        onClick={() => toggleCheck(category, index)}
                                                                    >
                                                                        <div></div>
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
                                                                        <div className="variant-text-container">
                                                                            {localActive === "hy"
                                                                                ? variant.subCategoryArm
                                                                                : variant.subCategoryEng}
                                                                        </div>
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
                            <Image
                                src={filterIcon}
                                alt={"filter"}
                            ></Image>
                        </div>

                        {categories.length
                            ? categories.map((category: any, index: number) => {
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
                                                  ? category?.variants.map((variant: any, index: number) => {
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
                                                                <div className="variant-text-container">
                                                                    {localActive === "hy"
                                                                        ? variant.subCategoryArm
                                                                        : variant.subCategoryEng}
                                                                </div>
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
                        {searchActive && currentItems.length === 0 ? (
                            ""
                        ) : (
                            <div
                                className="filters-btn-mobile"
                                onClick={openMobileFilter}
                            >
                                {t("filters")}
                                <Image
                                    src={filterIcon}
                                    alt="Filter"
                                ></Image>
                            </div>
                        )}

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
