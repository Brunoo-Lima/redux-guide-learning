import cartActionTypes from './action-types';

const initialState = {
  products: [],
  productTotalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case cartActionTypes.ADD_PRODUCT:
      //verifica se o produto ja esta no carrinho
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id,
      );

      // se ele estiver, aumentar a sua quantidade em 1
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product,
          ),
        };
      }
      //se ele nao estiver, add
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    default:
      return state;
  }
};

export default cartReducer;
