"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import "../page.scss";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckCircle, faChevronDown, faChevronUp, faX, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import editIcon from "../../../../Assets/edit-icon.svg";
import deleteIcon from "../../../../Assets/delete-icon.svg";
import xIcon from "../../../../Assets/x.svg";

import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";
import { useLocale } from "next-intl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoriesList = () => {
    const localActive = useLocale();

    const [categories, setCategories] = useState([]);
    const [showAddNewCategoryModal, setShowAddNewCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState("");
    const [clicked, setClicked] = useState(false);
    const [updateCategories, setUpdateCategories] = useState(false);
    const [currentlyEditingCategory, setCurrentlyEditingCategory] = useState<any>({});
    const [currentlyDeletingCategory, setCurrentlyDeletingCategory] = useState<any>({});

    const [variants, setVariants] = useState<any>([]);
    const [subCategories, setSubCategories] = useState<any>([
        {
            subCategoryArm: "",
            subCategoryEng: "",
        },
    ]);

    useEffect(() => {
        axios
            .get(`/${localActive}/api/categories/all`)
            .then((res) => {
                const categoriesDB = res.data.categories;
                setCategories(categoriesDB);
            })
            .catch((error) => {
                console.log(error);
                toast("Couldn't get categories", {
                    type: "error",
                });
            });
    }, [updateCategories]);

    const openModal = (modal: string) => {
        if (modal === "add") {
            setShowAddNewCategoryModal(true);
        } else if (modal === "edit") {
            setShowEditCategoryModal(true);
        } else if (modal === "delete") {
            setShowDeleteCategoryModal(true);
        }
    };

    const closeModal = () => {
        setShowAddNewCategoryModal(false);
        setShowEditCategoryModal(false);
        setShowDeleteCategoryModal(false);
    };

    const handleOpenDropDown = (index: number) => {
        const arr: any = categories.map((categ: any, ind: number) => {
            if (index === ind) {
                categ.clicked = !categ.clicked;
            }
            return categ;
        });
        setCategories(arr);
    };

    const handleEditButtonClick = (e: any, categ: any, method: string) => {
        e.stopPropagation();
        openModal(method);
        if (method === "edit") {
            setCurrentlyEditingCategory(categ);
        } else if (method === "delete") {
            setCurrentlyDeletingCategory(categ);
        }
        setVariants(categ.variants);
    };

    const handleCategoryNameChange = (e: any) => {
        setNewCategoryName(e.target.value);
    };

    const handleSubcategoryInputChange = (e: any, ind: number, lang: string) => {
        const arr = subCategories.map((subCateg: any, index: number) => {
            if (index === ind) {
                if (lang === "hy") {
                    subCateg.subCategoryArm = e.target.value;
                } else {
                    subCateg.subCategoryEng = e.target.value;
                }
            }
            return subCateg;
        });
        setSubCategories(arr);
    };

    const handleSubcategoryInputEdit = (e: any, ind: number, lang: string) => {
        const arr = variants?.map((variant: any, index: number) => {
            if (index === ind) {
                if (lang === "hy") {
                    variant.subCategoryArm = e.target.value;
                } else {
                    variant.subCategoryEng = e.target.value;
                }
            }
            return variant;
        });
        setVariants(arr);
        setCurrentlyEditingCategory({
            ...currentlyEditingCategory,
            variants: arr,
        });
    };

    const handleSubcategoryInputRemove = (ind: number) => {
        const arr = variants?.filter((variant: any, index: number) => {
            if (index !== ind) {
                return variant;
            }
        });
        setVariants(arr);
        setCurrentlyEditingCategory({
            ...currentlyEditingCategory,
            variants: arr,
        });
    };

    const addNewSubCategory = () => {
        const arr = [
            ...subCategories,
            {
                subCategoryArm: "",
                subCategoryEng: "",
            },
        ];
        setSubCategories(arr);
    };

    const addNewSubCategoryForEdit = () => {
        const arr = [
            ...variants,
            {
                subCategoryArm: "",
                subCategoryEng: "",
            },
        ];
        setVariants(arr);
    };

    const submitNewCategory = () => {
        const body = {
            category: newCategoryName,
            clicked,
            variants: subCategories,
        };
        axios
            .post(`/${localActive}/api/categories/single`, JSON.stringify(body))
            .then((res) => {
                setUpdateCategories(!updateCategories);
                toast("New Category submitted successfully", {
                    type: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                toast(error, {
                    type: "error",
                });
            });
        closeModal();
        setSubCategories([
            {
                subCategoryArm: "",
                subCategoryEng: "",
            },
        ]);
    };

    const handleEditCategoryItem = () => {
        const body = {
            category: currentlyEditingCategory.category,
            clicked,
            variants: currentlyEditingCategory.variants,
            id: currentlyEditingCategory._id,
        };

        axios
            .post(`/${localActive}/api/categories/single/update`, JSON.stringify(body))
            .then((res) => {
                setUpdateCategories(!updateCategories);
                toast("Categories updated", {
                    type: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                toast(error, {
                    type: "error",
                });
            });
        closeModal();
    };

    const handleDeleteCategoryItem = (categ: any) => {
        const body = {
            id: categ._id,
        };

        axios
            .post(`/${localActive}/api/categories/single/delete`, JSON.stringify(body))
            .then((res) => {
                setUpdateCategories(!updateCategories);
                toast("Category successfully removed", {
                    type: "success",
                });
            })
            .catch((error) => {
                console.log(error);
                toast(error, {
                    type: "error",
                });
            });
        closeModal();
    };

    return (
        <section className="categories-list-section">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {showAddNewCategoryModal || showEditCategoryModal || showDeleteCategoryModal ? (
                <div
                    className="category-modal-wrapper"
                    onClick={closeModal}
                >
                    {showAddNewCategoryModal ? (
                        <div
                            className="add-new-category-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="close-modal"
                                onClick={closeModal}
                            >
                                <Image
                                    src={xIcon}
                                    alt="X Icon"
                                />
                            </div>
                            <h3>Ավելացնել նորը</h3>

                            <p>Ընտրացանկի անունը</p>
                            <input
                                type="text"
                                placeholder="Ընտրացանկի անունը"
                                onChange={(e) => handleCategoryNameChange(e)}
                                autoFocus
                            />

                            <div className="sub-categories-container">
                                {subCategories.length > 0
                                    ? subCategories.map((subCateg: any, index: number) => {
                                          return (
                                              <div key={index}>
                                                  <p>Ենթակատեգորիա {index > 0 ? index + 1 : ""}</p>
                                                  <input
                                                      type="text"
                                                      placeholder="Ենթակատեգորիա (հայերեն)"
                                                      onChange={(e) => {
                                                          handleSubcategoryInputChange(e, index, "hy");
                                                      }}
                                                      value={subCateg?.subCategoryArm}
                                                  />
                                                  <input
                                                      type="text"
                                                      placeholder="Ենթակատեգորիա (անգլլերեն)"
                                                      onChange={(e) => {
                                                          handleSubcategoryInputChange(e, index, "en");
                                                      }}
                                                      value={subCateg?.subCategoryEng}
                                                  />
                                              </div>
                                          );
                                      })
                                    : ""}
                            </div>

                            <p
                                className="add-new-subCategory"
                                onClick={addNewSubCategory}
                            >
                                +Ավելացնել ենթակատեգորիա
                            </p>

                            <button
                                className="button"
                                onClick={submitNewCategory}
                            >
                                Ավելացնել
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    {showEditCategoryModal ? (
                        <div
                            className="edit-category-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="close-modal"
                                onClick={closeModal}
                            >
                                <Image
                                    src={xIcon}
                                    alt="X Icon"
                                />
                            </div>
                            <h3>Խմբագրել</h3>

                            <p>Ընտրացանկի անունը</p>
                            <input
                                type="text"
                                placeholder="Ընտրացանկի անունը"
                                readOnly
                                value={currentlyEditingCategory.category}
                                className="category-name"
                            />

                            <div className="sub-categories-container">
                                {variants?.length > 0
                                    ? variants?.map((subCateg: any, index: number) => {
                                          return (
                                              <div
                                                  key={index}
                                                  className="input-group-container"
                                              >
                                                  <p>Ենթակատեգորիա {index > 0 ? index + 1 : ""}</p>
                                                  <div className="input-group">
                                                      <input
                                                          type="text"
                                                          placeholder="Ենթակատեգորիա (հայերեն)"
                                                          onChange={(e) => {
                                                              handleSubcategoryInputEdit(e, index, "hy");
                                                          }}
                                                          value={subCateg?.subCategoryArm}
                                                      />
                                                      <input
                                                          type="text"
                                                          placeholder="Ենթակատեգորիա (անգլլերեն)"
                                                          onChange={(e) => {
                                                              handleSubcategoryInputEdit(e, index, "en");
                                                          }}
                                                          value={subCateg?.subCategoryEng}
                                                      />

                                                      <div
                                                          className="remove-input-group"
                                                          onClick={() => handleSubcategoryInputRemove(index)}
                                                      >
                                                          <FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ""}
                            </div>

                            <p
                                className="add-new-subCategory"
                                onClick={addNewSubCategoryForEdit}
                            >
                                +Ավելացնել ենթակատեգորիա
                            </p>

                            <button
                                className="button"
                                onClick={() => handleEditCategoryItem()}
                            >
                                Խմբագրել
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                    {showDeleteCategoryModal ? (
                        <div
                            className="delete-category-modal"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div
                                className="close-modal"
                                onClick={closeModal}
                            >
                                <Image
                                    src={xIcon}
                                    alt="X Icon"
                                />
                            </div>
                            <h3>Ջնջել</h3>

                            <h4>Ցանկանում եք ջնջել "{currentlyDeletingCategory.category}" ընտրացանկը։</h4>
                            <p>
                                <span>*</span> Ջնջելու դեպքում կջնջվեն նաև ենթակատեգորիաները։
                            </p>

                            <button
                                className="button"
                                onClick={() => handleDeleteCategoryItem(currentlyDeletingCategory)}
                            >
                                Ջնջել
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}

            <AdminAsidePanel
                selected={"categories-list"}
                notificationCounter={0}
            ></AdminAsidePanel>
            <main>
                <div className="categories-list-header">
                    <h2>Ընտրացանկ</h2>
                    <div>
                        <button
                            className="button"
                            onClick={() => openModal("add")}
                        >
                            + Ավելացնել նորը
                        </button>
                    </div>
                </div>

                <div className="list">
                    {categories.length
                        ? categories.map((categ: any, index) => {
                              return (
                                  <div
                                      className="category-item-container"
                                      key={index}
                                  >
                                      <div
                                          className={(categ.clicked ? "row-clicked" : "") + " row"}
                                          onClick={() => handleOpenDropDown(index)}
                                      >
                                          <div className="first-column">
                                              {categ.clicked ? (
                                                  <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                                              ) : (
                                                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                                              )}

                                              <p>{categ.category}</p>
                                          </div>
                                          <div className="edit-delete-icons">
                                              <div onClick={(e) => handleEditButtonClick(e, categ, "edit")}>
                                                  <Image
                                                      src={editIcon}
                                                      alt="Edit Icon"
                                                  ></Image>
                                              </div>
                                              <div onClick={(e) => handleEditButtonClick(e, categ, "delete")}>
                                                  <Image
                                                      src={deleteIcon}
                                                      alt="Delete Icon"
                                                  ></Image>
                                              </div>
                                          </div>
                                      </div>

                                      <div className={(categ?.clicked ? "clicked " : "") + "dropdown-slider"}>
                                          {categ.variants?.length
                                              ? categ.variants.map((variant: any, index: number) => {
                                                    return (
                                                        <div
                                                            className="variant"
                                                            key={index}
                                                        >
                                                            {localActive === "hy"
                                                                ? variant.subCategoryArm
                                                                : variant.subCategoryEng}
                                                        </div>
                                                    );
                                                })
                                              : ""}
                                      </div>
                                  </div>
                              );
                          })
                        : ""}
                </div>
            </main>
        </section>
    );
};

export default CategoriesList;
