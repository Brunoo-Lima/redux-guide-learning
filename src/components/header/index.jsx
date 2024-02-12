import { useMemo, useState } from 'react';

// Components
import Cart from '../cart/index';

// Styles
import * as Styles from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from './../../redux/user/actions';

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const { products } = useSelector((rootReducer) => rootReducer.cartReducer);

  const productsCount = useMemo(() => {
    return products.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [products]);

  const handleCartClick = () => {
    setCartIsVisible(true);
  };

  const handleLoginClick = () => {
    dispatch(loginUser({ name: 'Bruno', email: 'bruno@gmail.com' }));
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <Styles.Container>
      <Styles.Logo>Redux Shopping</Styles.Logo>
      <Styles.Buttons>
        {currentUser ? (
          <div onClick={handleLogoutClick}>Sair</div>
        ) : (
          <div onClick={handleLoginClick}>Login</div>
        )}
        <div onClick={handleCartClick}>Carrinho ({productsCount})</div>
      </Styles.Buttons>

      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />
    </Styles.Container>
  );
}

export default Header;
