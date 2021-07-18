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
            query['final_price'] = {
                $gte: Number(filter.minPrice)
            };

        // If user query max price, add it to query conditions
        if (filter.maxPrice)
            query['final_price'] = {
                ...query['final_price'],
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
            query['screen_panel'] = filter.screenPanel;

        // If user query screen resolution, add it to query conditions
        if (filter.screenResolution)
            query['screen_resolution'] = filter.screenResolution;

        // If user query min ram, add it to query conditions
        if (filter.minScreenSize)
            query['screen_size'] = {
                $gte: Number(filter.minScreenSize)
            };

        // If user query max ram, add it to query conditions
        if (filter.maxScreenSize)
            query['screen_size'] = {
                ...query['screen_size'],
                $lte: Number(filter.maxScreenSize)
            };

        // If user query platform, add it to query conditions
        if (filter.platform)
            query['platform_name'] = filter.platform;

        // If user query min battery capacity, add it to query conditions
        if (filter.minBatteryCapacity)
            query['battery_capacity'] = {
                $gte: Number(filter.minBatteryCapacity)
            };

        // If user query max battery capacity,, add it to query conditions
        if (filter.maxBatteryCapacity)
            query['battery_capacity'] = {
                ...query['battery_capacity'],
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
            .aggregate([{
                    "$match": query
                },
                {
                    "$skip": skip || 0
                },
                {
                    "$limit": limit || 100
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
                    "$match": queryMore
                },
                {
                    "$unwind": "$brand"
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
                    "$unwind": "$thumbnail"
                },
                {
                    "$lookup": {
                        "from": "components_product_options",
                        "localField": "options.ref",
                        "foreignField": "_id",
                        "as": "options"
                    }
                },
                {
                    "$unwind": "$options"
                },
                {
                    "$lookup": {
                        "from": "upload_file",
                        "localField": "options.images",
                        "foreignField": "_id",
                        "as": "options.images"
                    }
                },
                {
                    "$group": {
                        "_id": "$_id",
                        "name": {
                            "$first": '$name'
                        },
                        "regular_price": {
                            "$first": '$regular_price'
                        },
                        "final_price": {
                            "$first": '$final_price'
                        },
                        "slug": {
                            "$first": '$slug'
                        },
                        "sales_percentage": {
                            "$first": '$sales_percentage'
                        },
                        "cpu": {
                            "$first": '$cpu'
                        },
                        "gpu": {
                            "$first": '$gpu'
                        },
                        "screen_panel": {
                            "$first": '$screen_panel'
                        },
                        "screen_size": {
                            "$first": '$screen_size'
                        },
                        "screen_resolution": {
                            "$first": '$screen_resolution'
                        },
                        "height": {
                            "$first": '$height'
                        },
                        "width": {
                            "$first": '$width'
                        },
                        "depth": {
                            "$first": '$depth'
                        },
                        "weight": {
                            "$first": '$weight'
                        },
                        "ram": {
                            "$first": '$ram'
                        },
                        "rom": {
                            "$first": '$rom'
                        },
                        "platform_name": {
                            "$first": '$platform_name'
                        },
                        "platform_version": {
                            "$first": '$platform_version'
                        },
                        "battery_type": {
                            "$first": '$battery_type'
                        },
                        "battery_capacity": {
                            "$first": '$battery_capacity'
                        },
                        "short_desc": {
                            "$first": '$short_desc'
                        },
                        "full_desc": {
                            "$first": '$full_desc'
                        },
                        "inclusion_box": {
                            "$first": '$inclusion_box'
                        },
                        "warranty": {
                            "$first": '$warranty'
                        },
                        "condition": {
                            "$first": '$condition'
                        },
                        "brand": {
                            "$first": '$brand'
                        },
                        "thumbnail": {
                            "$first": '$thumbnail'
                        },
                        "updatedAt": {
                            "$first": '$updatedAt'
                        },
                        "createdAt": {
                            "$first": '$createdAt'
                        },
                        "stars": {
                            "$first": '$stars'
                        },
                        "votes": {
                            "$first": '$votes'
                        },
                        "options": {
                            "$push": "$options"
                        }
                    }
                },
                {
                    "$addFields": {
                        "total_sold": {
                            "$sum": "$options.sold_quantity"
                        }
                    }
                },
                {
                    "$sort": sortContent
                }
            ])

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
            final_price,
            battery_capacity,
            screen_panel,
            screen_size,
            platform_name
        } = product;

        // Create filter varible
        const query = {
            _id: { $nin: [new ObjectID(product._id)] },
            $or: [
                {
                    ram: {
                        $gt: ram - 2,
                        $lt: ram + 2
                    }
                },
                {
                    final_price: {
                        $gt: final_price - 2000000,
                        $lt: final_price + 2000000
                    }
                },
                {
                    screen_size: {
                        $gt: screen_size - 0.5,
                        $lt: screen_size + 0.5
                    },
                    screen_panel: screen_panel
                },
            ]
        };
        // ================ Start handle filter ===================
        
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

        const relatedProducts = await strapi.query('product').model.aggregate([
            { 
                "$match": query 
            },
            {
                "$skip": skip || 0
            },
            {
                "$limit": limit || 100
            },
            {
                "$lookup": {
                    "from": "brands",
                    "let": { "brandId": "$brand" },
                    "pipeline": [
                        {
                            "$match": { "_id": "$$brandId"}
                        }
                    ],
                    "as": "brand"
                }
            },
            {
                "$lookup": {
                    "from": "upload_file",
                    "let": { "thumbnailId": "$thumbnail" },
                    "pipeline": [
                        {
                            "$match": { "_id": "$$thumbnailId"}
                        }
                    ],
                    "as": "thumbnail"
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
            }
        ]);

        return relatedProducts;
    }
};