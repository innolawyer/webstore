const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const user = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const basketProduct = sequelize.define('basket_product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})
const product = sequelize.define('product', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    rating: {type: DataTypes.INTEGER, defaultValue:0},
    img: {type: DataTypes.STRING, allowNull:false},
})

const type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
})
const rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
})
const productInfo = sequelize.define('productInfo', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, unique: true, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
})
const typeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


user.hasOne(basket)
basket.belongsTo(user)

user.hasMany(rating)
rating.belongsTo(user)

basket.hasMany(basketProduct)
basketProduct.belongsTo(basket)

type.hasMany(product)
product.belongsTo(type)

brand.hasMany(product)
product.belongsTo(brand)

product.hasMany(rating)
rating.belongsTo(product)

product.hasMany(productInfo)
productInfo.belongsTo(product)

type.belongsToMany(brand, {through: typeBrand})
brand.belongsToMany(type, {through: typeBrand})

module.exports = {
    user,
    basket,
    basketProduct,
    product,
    productInfo,
    type,
    typeBrand,
    brand,
    rating
}