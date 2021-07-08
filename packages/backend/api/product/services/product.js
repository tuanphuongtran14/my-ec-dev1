'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
    async search(filter, limit, skip, sort) {
        // ============== Start handle filter ===================
        // If filter is undefined, change it to empty object in order to avoid errors
        if(!filter) 
            filter = {};

        // Initial filter variable in order to execute query to db
        let query = {
            published_at: {
                $ne: null
            }
        };

        let queryMore = {};

        // If user query brand, add it to more conditions
        if(filter.brand)
            queryMore['brand.name'] = filter.brand;

        // If id_ne exist, find products whose id is not equal id_ne
        if(filter.id_ne)
            query['_id'] = {
                $ne: filter.id_ne
            }

        // If user query name, add it to query conditions
        if(filter.name)
            query['$text'] = {$search: filter.name};

        // If user query min price, add it to query conditions
        if(filter.minPrice)
            query['price'] = {
                $gte: Number(filter.minPrice)
            };

        // If user query max price, add it to query conditions
        if(filter.maxPrice)
            query['price'] = {
                ...query['price'],
                $lte: Number(filter.maxPrice)
            };

        // If user query min ram, add it to query conditions
        if(filter.minRam)
            query['ram'] = {
                $gte: Number(filter.minRam)
            };

        // If user query max ram, add it to query conditions
        if(filter.maxRam)
            query['ram'] = {
                ...query['ram'],
                $lte: Number(filter.maxRam)
            };

        // If user query screen panel, add it to query conditions
        if(filter.screenPanel) 
            query['screen_panel'] = filter.screenPanel;

        // If user query screen resolution, add it to query conditions
        if(filter.screenResolution) 
            query['screen_resolution'] = filter.screenResolution;

        // If user query min ram, add it to query conditions
        if(filter.minScreenSize)
            query['screen_size'] = {
                $gte: Number(filter.minScreenSize)
            };

        // If user query max ram, add it to query conditions
        if(filter.maxScreenSize)
            query['screen_size'] = {
                ...query['screen_size'],
                $lte: Number(filter.maxScreenSize)
            };

        // If user query platform, add it to query conditions
        if(filter.platform) 
            query['platform_name'] = filter.platform;

        // If user query min battery capacity, add it to query conditions
        if(filter.minBatteryCapacity)
            query['battery_capacity'] = {
                $gte: Number(filter.minBatteryCapacity)
            };

        // If user query max battery capacity,, add it to query conditions
        if(filter.maxBatteryCapacity)
            query['battery_capacity'] = {
                ...query['battery_capacity'],
                $lte: Number(filter.maxBatteryCapacity)
            };

        // =============== End handle filter ====================
        

        // ============ Start handle skip & limit ===============
        // Initial option variable for query
        let option = {}

        // If limit is passed into, add it to option variable
        if(limit)
            option = {
                limit: Number(limit)
            };
        
        // If skip is passed into, add it to option variable
        if(skip)
            option = {
                ...option,
                skip: Number(skip)
            };
        // ============ Start handle skip & limit ===============


        // ================ Start handle sort ===================
        // If sort is passed into, add it to option variable
        // Create sortContent variable to contain sort options
        let sortContent = {
            updatedAt: -1
        };
        if(sort) {
            sortContent = {};
            // Add sort options to sortContent variable
            sort.forEach(element => {
                const [ key, value ] = element.split(':');
                if(value.toLowerCase() === 'asc')
                    sortContent[key] = 1;
                
                if(value.toLowerCase() === 'desc')
                    sortContent[key] = -1;
            });
        }


        // ================= End handle sort ====================
        let products = await strapi.query('product').model
            .aggregate([
                { "$match": query },
                { "$lookup": {
                  "from": "brands",
                  "localField": "brand",
                  "foreignField": "_id",
                  "as": "brand"
                }},
                { "$match": queryMore },
                { "$unwind": "$brand" },
                { "$lookup": {
                  "from": "upload_file",
                  "localField": "thumbnail",
                  "foreignField": "_id",
                  "as": "thumbnail"
                }},
                { "$unwind": "$thumbnail" },
                { "$lookup": {
                  "from": "components_product_options",
                  "localField": "options.ref",
                  "foreignField": "_id",
                  "as": "options"
                }},
                { "$unwind": "$options" },
                { "$lookup": {
                  "from": "upload_file",
                  "localField": "options.images",
                  "foreignField": "_id",
                  "as": "options.images"
                }},
                { "$group": {
                    "_id": "$_id",
                    "name" : { "$first": '$name' },
                    "price" : { "$first": '$price' },
                    "slug" : { "$first": '$slug' },
                    "sales_percentage" : { "$first": '$sales_percentage' },
                    "cpu" : { "$first": '$cpu' },
                    "gpu" : { "$first": '$gpu' },
                    "screen_panel" : { "$first": '$screen_panel' },
                    "screen_size" : { "$first": '$screen_size' },
                    "screen_resolution" : { "$first": '$screen_resolution' },
                    "height" : { "$first": '$height' },
                    "width" : { "$first": '$width' },
                    "depth" : { "$first": '$depth' },
                    "weight" : { "$first": '$weight' },
                    "ram" : { "$first": '$ram' },
                    "rom" : { "$first": '$rom' },
                    "platform_name" : { "$first": '$platform_name' },
                    "platform_version" : { "$first": '$platform_version' },
                    "battery_type" : { "$first": '$battery_type' },
                    "battery_capacity" : { "$first": '$battery_capacity' },
                    "short_desc" : { "$first": '$short_desc' },
                    "full_desc" : { "$first": '$full_desc' },
                    "inclusion_box" : { "$first": '$inclusion_box' },
                    "warranty" : { "$first": '$warranty' },
                    "condition" : { "$first": '$condition' },
                    "brand" : { "$first": '$brand' },
                    "thumbnail" : { "$first": '$thumbnail' },
                    "updatedAt" : { "$first": '$updatedAt' },
                    "createdAt" : { "$first": '$createdAt' },
                    "options": { "$push": "$options" }
                }},
                {
                  "$addFields": { 
                      "totalSold": { "$sum": "$options.sold_quantity" }
                }},
                { "$sort": sortContent }
            ])

        return products;
    }
};
