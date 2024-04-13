import mongoose, { Schema } from "mongoose";

const variantSchema = new Schema({
    subCategoryArm: String,
    subCategoryEng: String,
});

const shopSchema = new Schema({
    buisnessName: String,
    email: String,
    instaPageLink: String,
    descriptionArm: String,
    descriptionEng: String,
    instaPfpPreview: String,
    categoryName: String,
    subCategories: [variantSchema],
    approved: Boolean,
    denied: Boolean,
    newRequest: Boolean,
    date: String,
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
export default Shop;
