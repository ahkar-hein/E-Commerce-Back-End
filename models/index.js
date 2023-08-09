// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
// this is product, category, tag and product tag association.
// Product belongs to Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', // Cascade delete products when a category is deleted
});
// Category has many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', // Cascade delete products when a category is deleted
});
// Each product belongs to many tag through product tags
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
  onDelete: 'CASCADE', // Cascade delete product tags when a product is deleted
});
// Each tag has many products through product tags
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  onDelete: 'CASCADE', // Cascade delete associate product tags.
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
