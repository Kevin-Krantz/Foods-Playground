import styled, { css } from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCartQuery } from "../store/services/rtkApi";
import { RootState } from "../store/configureStore";
import { logout } from "../store/features/auth";
import { getTotalQuantity } from "../utils/cartUtils";

function Navbar(): JSX.Element {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data: cart } = useGetCartQuery();

  const [extendedNavbar, setExtendedNavbar] = useState(false);

  const currentUser = useSelector((state: RootState) => state.entities.auth);

  const totalQuantity = currentUser.currentUser ? getTotalQuantity(cart) : 0;

  const handleLogout = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(logout());
    navigate("/foods");
  };

  return (
    <NavbarContainer extendedNavbar={extendedNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/"> Hem</NavbarLink>
            <NavbarLink to="/foods"> Maten</NavbarLink>
            <NavbarLink to="/contact"> Kontakta Oss</NavbarLink>
            <NavbarLink to="/aboutus"> Om Oss</NavbarLink>
            {currentUser.currentUser === null ? (
              <>
                <NavbarLink to="/register"> Registrera dig</NavbarLink>
                <NavbarLink to="/login"> Logga In</NavbarLink>
              </>
            ) : (
              <>
                <NavbarLink to="/mypage"> Mina Sidor</NavbarLink>
                <NavbarLink
                  to="/logout"
                  onClick={(event) => handleLogout(event)}
                >
                  Logga Ut
                </NavbarLink>
              </>
            )}
            <OpenLinksButton
              onClick={() => {
                setExtendedNavbar((curr) => !curr);
              }}
            >
              {extendedNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <ShoppingCartIcon
          key={totalQuantity}
          cartCount={totalQuantity}
          onClick={() => navigate("/checkout")}
          className="fa-solid fa-cart-shopping"
        >
          {totalQuantity <= 0 ? null : <Badge>{totalQuantity}</Badge>}
        </ShoppingCartIcon>
        <RightContainer>
          <Link style={{ all: "unset" }} to="/">
            <Logo src={"/images/logo.png"}></Logo>
          </Link>
        </RightContainer>
      </NavbarInnerContainer>
      {extendedNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/"> Home</NavbarLinkExtended>
          <NavbarLinkExtended to="/foods"> Products</NavbarLinkExtended>
          <NavbarLinkExtended to="/contact"> Contact Us</NavbarLinkExtended>
          <NavbarLinkExtended to="/about"> About Us</NavbarLinkExtended>
          <NavbarLinkExtended to="/register">Registrera dig</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;

interface CartProps {
  cartCount: number;
}

const NavbarContainer = styled.nav<{ extendedNavbar: boolean }>`
  width: 100%;
  height: ${(extendedNavbar) => (extendedNavbar ? "35vh" : "80px")};
  background-color: #000000af;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media (min-width: 700px) {
    height: 100px;
  }
`;

const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 50px;
  height: -20;
`;

const ShoppingCartIcon = styled.i<CartProps>`
  color: #ffffff;
  font-size: xx-large;
  margin-right: 8px;
  transition: transform 0.1s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.3);
  }

  &:active {
    transform: scale(1);
  }

  ${(props) =>
    props.cartCount > 0 &&
    css`
      animation: ${props.cartCount % 2 === 0 ? "shake1" : "shake2"} 0.5s;
      animation-fill-mode: none;
    `}

  @keyframes shake1 {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }

  @keyframes shake2 {
    10%,
    90% {
      transform: translate3d(1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(-2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(-4px, 0, 0);
    }
  }
`;

const Badge = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: red;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: center;
  padding: 2px;
  cursor: pointer;
`;

const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
`;

const NavbarLinkContainer = styled.div`
  display: flex;
`;

const NavbarLink = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
`;

const NavbarLinkExtended = styled(Link)`
  color: white;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
`;

const Logo = styled.img`
  max-height: 200px;
  margin-top: 8px;
  transition: filter 0.1s ease;

  &:hover {
    filter: brightness(0.5);
    cursor: pointer;
  }
`;

const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: white;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
