const {
  sanitizeEntity
} = require('strapi-utils');

module.exports = {
  suggestedUsers: async (ctx, next) => {
    let users = await strapi.query('user', 'users-permissions').find({});
    console.log(ctx.params);
    ctx.send(users);
    await next();
  },

  getCart: async (ctx, next) => {
    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {

      try {
        const { id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
        const user = await strapi.query('user', 'users-permissions').findOne({
          id: id
        }, ['cart']);
        ctx.send(sanitizeEntity(user.cart, {
          model: strapi.plugins['users-permissions'].models.user
        }));
      } catch (error) {
        ctx.send({
          statusCode: 500,
          message: error
        });
      } 

    }  else {
      ctx.send({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }

    if (typeof next === 'function')
      await next();
  },

  addItemsToCart: async (ctx, next) => {
    const newDetail = ctx.request.body.input;

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      try {
        if(newDetail) {
          const { id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
          const user = await strapi.query('user', 'users-permissions').findOne({id: id});
  
          const oldDetails = user.cart.map(cart => {
              return {
                id: cart.id
              }
            });
  
          await strapi.query('user', 'users-permissions').update({id: id}, {
            cart: [...oldDetails, ...newDetail]
          });
  
          ctx.send({
            statusCode: 200,
            message: "Update cart successfully"
          });
        } else {
          ctx.send({
            statusCode: 400,
            message: "Update cart failed. Maybe your input is empty"
          })
        }
      } catch (error) {
        ctx.send({
          statusCode: 500,
          message: error
        });
      }
    }  else {
      ctx.send({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }

    if (typeof next === 'function')
      await next();
  },

  deleteOneCartItem: async (ctx, next) => {
    const deletedItemId = ctx.request.body.id;

    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      try {
        if(deletedItemId) {
          const { id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
          const user = await strapi.query('user', 'users-permissions').findOne({id: id});
  
          const newDetails = user.cart.filter(cart => {
            return cart.id !== deletedItemId
          }).map(cart => {
              return {
                id: cart.id
              }
            });
  
          await strapi.query('user', 'users-permissions').update({id: id}, {
            cart: [...newDetails]
          });
  
          ctx.send({
            statusCode: 200,
            message: `Delete item with ID ${deletedItemId} successfully`
          });
        } else {
          ctx.send({
            statusCode: 400,
            message: `Delete item with ID ${deletedItemId} cart failed. Maybe your input is empty`
          })
        }
      } catch (error) {
        ctx.send({
          statusCode: 500,
          message: error
        });
      }
    }  else {
      ctx.send({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }

    if (typeof next === 'function')
      await next();
  },

  deleteAllCartItems: async (ctx, next) => {
    if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
      try {
        const { id } = await strapi.plugins['users-permissions'].services.jwt.getToken(ctx);
        await strapi.query('user', 'users-permissions').update({id: id}, {
          cart: []
        });

        ctx.send({
          statusCode: 200,
          message: "Delete cart successfully"
        })
      } catch(error) {
        ctx.send({
          statusCode: 500,
          message: error
        });
      }
    } else {
      ctx.send({
        statusCode: 401,
        message: 'Unauthorized'
      });
    }

    if (typeof next === 'function')
      await next();
  }
};
