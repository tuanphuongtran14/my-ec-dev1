'use strict';
const {
    ObjectID
} = require('mongodb');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async search(filter, limit, skip, sort) {
        // ============== Start handle filter ===================
        // If filter is undefined, change it to empty object in order to avoid errors
        if (!filter)
            filter = {};

        // Initial filter variable in order to execute query to db
        let query = {};

        let queryMore = {};

        // If user query brand, add it to more conditions
        if (filter.brand)
            queryMore['brand.name'] = filter.brand;

        // If id_ne exist, find products whose id is not equal id_ne
        if (filter.id_ne)
            query['_id'] = {
                $nin: [new ObjectID(filter.id_ne)]
            }

        // If user query product id, add it to query conditions
        if (filter.id)
            query['_id'] = new ObjectID(filter.id);

        // If user query name, add it to query conditions
        if (filter.name)
            query['$text'] = {
                $search: filter.name
            };

        // If user query slug, add it to query conditions
        if (filter.slug)
            query['slug'] = filter.slug;

        // If user query min price, add it to query conditions
        if (filter.minPrice)
            query['finalPrice'] = {
                $gte: Number(filter.minPrice)
            };

        // If user query max price, add it to query conditions
        if (filter.maxPrice)
            query['finalPrice'] = {
                ...query['finalPrice'],
                $lte: Number(filter.maxPrice)
            };

        // If user query min ram, add it to query conditions
        if (filter.minRam)
            query['ram'] = {
                $gte: Number(filter.minRam)
            };

        // If user query max ram, add it to query conditions
        if (filter.maxRam)
            query['ram'] = {
                ...query['ram'],
                $lte: Number(filter.maxRam)
            };

        // If user query screen panel, add it to query conditions
        if (filter.screenPanel)
            query['screenPanel'] = filter.screenPanel;

        // If user query screen resolution, add it to query conditions
        if (filter.screenResolution)
            query['screenResolution'] = filter.screenResolution;

        // If user query min ram, add it to query conditions
        if (filter.minScreenSize)
            query['screenSize'] = {
                $gte: Number(filter.minScreenSize)
            };

        // If user query max ram, add it to query conditions
        if (filter.maxScreenSize)
            query['screenSize'] = {
                ...query['screenSize'],
                $lte: Number(filter.maxScreenSize)
            };

        // If user query platform, add it to query conditions
        if (filter.platform)
            query['platformName'] = filter.platform;

        // If user query min battery capacity, add it to query conditions
        if (filter.minBatteryCapacity)
            query['batteryCapacity'] = {
                $gte: Number(filter.minBatteryCapacity)
            };

        // If user query max battery capacity,, add it to query conditions
        if (filter.maxBatteryCapacity)
            query['batteryCapacity'] = {
                ...query['batteryCapacity'],
                $lte: Number(filter.maxBatteryCapacity)
            };

        // =============== End handle filter ====================


        // ================ Start handle sort ===================
        // If sort is passed into, add it to option variable
        // Create sortContent variable to contain sort options
        let sortContent = {
            updatedAt: -1
        };
        if (sort) {
            sortContent = {};
            // Add sort options to sortContent variable
            sort.forEach(element => {
                const [key, value] = element.split(':');
                if (value.toLowerCase() === 'asc')
                    sortContent[key] = 1;

                if (value.toLowerCase() === 'desc')
                    sortContent[key] = -1;
            });
        }


        // ================= End handle sort ====================
        let products = await strapi.query('product').model
            .aggregate([
                {
                    "$match": query
                },
                { 
                    "$lookup": {
                        "from": "brands",
                        "localField": "brand",
                        "foreignField": "_id",
                        "as": "brand"
                    }
                },
                {
                    "$unwind": {
                        "path": "$brand",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                { 
                    "$lookup": {
                        "from": "upload_file",
                        "localField": "thumbnail",
                        "foreignField": "_id",
                        "as": "thumbnail"
                    }
                },
                {
                    "$unwind": {
                        "path": "$thumbnail",
                        "preserveNullAndEmptyArrays": true
                    }
                },
                { 
                    "$lookup": {
                        "from": "components_product_options",
                        "let": { "optionIds": "$options.ref" },
                        "pipeline": [
                            { "$match": { "$expr": { "$in": ["$_id", "$$optionIds"] } } },
                            { 
                                "$lookup": {
                                    "from": "upload_file",
                                    "let": { "imageIds": "$images" },
                                    "pipeline": [
                                        { "$match": { "$expr": { "$in": ["$_id", "$$imageIds"] } } },
                                    ],
                                    "as": "images"
                                }
                            },
                        ],
                        "as": "options"
                    }
                },
                {
                    "$addFields": {
                        "total_sold": {
                            "$sum": "$options.soldQuantity"
                        }
                    }
                },
                {
                    "$match": queryMore
                },
                {
                    "$sort": sortContent
                },
                {
                    "$skip": skip || 0
                },
                {
                    "$limit": limit || 100
                },
            ]);
            
        return products;
    },

    async findRelatedBySlug(slug, limit, skip, sort) {
        // ================ Start handle filter ===================
        // Retrieve product by slug
        const [ product ] = await strapi.query('product').model.aggregate([{
                "$match": {
                    slug: slug
                }
            },
            {
                "$lookup": {
                    "from": "brands",
                    "localField": "brand",
                    "foreignField": "_id",
                    "as": "brand"
                }
            },
            {
                "$unwind": "$brand"
            }
        ]);

        // Get product's attribute need to compare
        const {
            ram,
            finalPrice,
            batteryCapacity,
            screenPanel,
            screenSize,
            platformName,
            brand
        } = product;

        // Create filter varible
        const query = {
            _id: { $nin: [new ObjectID(product._id)] },
            $or: [
                {
                    brand: brand._id,
                },
                {
                    finalPrice: {
                        $gt: finalPrice - 2000000,
                        $lt: finalPrice + 2000000,
                    }
                },
                {
                    ram: {
                        $gt: ram - 2,
                        $lt: ram + 2
                    },
                    batteryCapacity: {
                        $gt: batteryCapacity - 1000,
                        $lt: batteryCapacity + 1000
                    },
                    screenSize: {
                        $gt: screenSize - 0.5,
                        $lt: screenSize + 0.5
                    },
                    screenPanel: screenPanel
                },
            ]
        };
        // ================ Start handle filter ===================
        
        // ================ Start handle sort ===================
        // If sort is passed into, add it to option variable
        // Create sortContent variable to contain sort options
        let sortContent = {
            createdAt: -1
        };
        if (sort) {
            sortContent = {};
            // Add sort options to sortContent variable
            sort.forEach(element => {
                const [key, value] = element.split(':');
                if (value.toLowerCase() === 'asc')
                    sortContent[key] = 1;

                if (value.toLowerCase() === 'desc')
                    sortContent[key] = -1;
            });
        }


        // ================= End handle sort ====================

        const relatedProducts = await strapi.query('product').model.aggregate([
            { 
                "$match": query 
            },
            {
                "$lookup": {
                    "from": "brands",
                    "let": { "brandId": "$brand" },
                    "pipeline": [
                        {
                            "$match": { "$expr": { "$eq": ["$_id", "$$brandId"] } }
                        }
                    ],
                    "as": "brand"
                }
            },
            {
              "$unwind": {
                "path": "$brand",
                "preserveNullAndEmptyArrays": true
              }
            },
            {
                "$lookup": {
                    "from": "upload_file",
                    "let": { "thumbnailId": "$thumbnail" },
                    "pipeline": [
                        {
                            "$match": { "$expr": { "$eq": ["$_id", "$$thumbnailId"] } }
                        }
                    ],
                    "as": "thumbnail"
                }
            },
            {
              "$unwind": {
                "path": "$thumbnail",
                "preserveNullAndEmptyArrays": true
              }
            },
            {
                "$lookup": {
                    "from": "components_product_options",
                    "let": { "optionIds": "$options.ref" },
                    "pipeline": [
                        {
                            "$match": { "$expr": { "$in": ["$_id", "$$optionIds"] } },
                        },
                        {
                            "$lookup": {
                                "from": "upload_file",
                                "let": { "imageIds": "$images" },
                                "pipeline": [
                                    {
                                        "$match": { "$expr": { "$in": ["$_id", "$$imageIds"] } }
                                    }
                                ],
                                "as": "images"
                            }
                        },
                    ],
                    "as": "options"
                }
            },
            {
                "$sort": sortContent
            },
            {
                "$skip": skip || 0
            },
            {
                "$limit": limit || 100
            },
        ]);

        return relatedProducts;
    }
};