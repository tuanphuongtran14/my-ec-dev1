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
                $gte: filter.minPrice
            };

        // If user query max price, add it to query conditions
        if(filter.maxPrice)
            query['price'] = {
                ...query['price'],
                $lte: filter.maxPrice
            };

        // If user query min ram, add it to query conditions
        if(filter.minRam)
            query['ram'] = {
                $gte: filter.minRam
            };

        // If user query max ram, add it to query conditions
        if(filter.maxRam)
            query['ram'] = {
                ...query['ram'],
                $lte: filter.maxRam
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
                $gte: filter.minScreenSize
            };

        // If user query max ram, add it to query conditions
        if(filter.maxScreenSize)
            query['screen_size'] = {
                ...query['screen_size'],
                $lte: filter.maxScreenSize
            };

        // If user query platform, add it to query conditions
        if(filter.platform) 
            query['platform_name'] = filter.platform;

        // If user query min battery capacity, add it to query conditions
        if(filter.minBatteryCapacity)
            query['battery_capacity'] = {
                $gte: filter.minBatteryCapacity
            };

        // If user query max battery capacity,, add it to query conditions
        if(filter.maxBatteryCapacity)
            query['battery_capacity'] = {
                ...query['battery_capacity'],
                $lte: filter.maxBatteryCapacity
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
        if(sort) {
            // Create sortContent variable to contain sort options
            let sortContent = {};

            // Add sort options to sortContent variable
            sort.forEach(element => {
                const [ key, value ] = element.split(':');
                sortContent[key] = value;
            });

            // Add sortContent variable to option variable in order to sort query
            option = {
                ...option,
                sort: sortContent
            };
        }


        // ================= End handle sort ====================



        const products = await strapi.query('product').model.find(query, null, option);

        return products.map(product => product.toObject());
    }
};
