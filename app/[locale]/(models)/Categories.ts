import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema({
    subCategoryArm: String,
    subCategoryEng: String,
});

const categoriesSchema = new Schema({
    category: String,
    clicked: Boolean,
    variants: [variantSchema],
});

const Categories = mongoose.models.Categories || mongoose.model("Categories", categoriesSchema);
export default Categories;
