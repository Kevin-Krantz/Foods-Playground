import React from "react";
import { useGetCartQuery } from "../store/services/rtkApi";
import { useCriiptoVerify, AuthMethodSelector } from "@criipto/verify-react";
import Loading from "./Loading";
import "../styles/button.css";
import Login from "./Login";
import styled from "styled-components";
import { isCartEmpty } from "../utils/cartUtils";

function Checkout(): JSX.Element {
  const { data: cart } = useGetCartQuery();

  const isEmpty = isCartEmpty(cart);

  console.log(isEmpty);

  const { claims, isLoading, logout: rawLogout, error } = useCriiptoVerify();

  const logout = async (redirectUri: string) => {
    rawLogout({ redirectUri });
  };

  return (
    <React.Fragment>
      <Container>
        {isEmpty && (
          <EmptyCartText>
            You have no food in the cart. Add something to it and come back!
          </EmptyCartText>
        )}
        <CartItems>
          {cart?.items?.map((cartItem: any) => (
            <CartItem key={cartItem._id}>
              <ItemImage src={cartItem.imageUrl} alt={cartItem.name} />
              <ItemInfo>
                <ItemName>{cartItem.name}</ItemName>
                <ItemQuantity>{cartItem.quantity}x</ItemQuantity>
              </ItemInfo>
            </CartItem>
          ))}
        </CartItems>
        {isLoading && <Loading />}
        {error ? (
          <ErrorText>
            An error occurred: {error.error} ({error.error_description})
          </ErrorText>
        ) : null}
        {claims ? (
          <>
            <ThanksText>
              Tack för din beställning {claims?.givenname}!
            </ThanksText>
            <button
              className="button-84"
              onClick={() => logout("http://localhost:3000/status")}
            >
              Se status
            </button>
          </>
        ) : (
          !isEmpty && (
            <Login>
              <AuthMethodSelector />
            </Login>
          )
        )}
      </Container>
    </React.Fragment>
  );
}

export default Checkout;

const Container = styled.div`
  padding-bottom: 500px;
  margin: 81px;
`;

const EmptyCartText = styled.h2`
  color: white;
`;

const CartItems = styled.ul`
  list-style: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  color: #ffffff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  object-fit: contain;
`;

const ItemInfo = styled.div`
  margin-left: 20px;
`;

const ItemName = styled.h2`
  font-size: 1.2rem;
  margin: 0;
`;

const ItemQuantity = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin-top: 4px;
`;

const ErrorText = styled.p`
  color: white;
  margin-top: 8px;
`;

const ThanksText = styled.p`
  color: white;
  margin-top: 8px;
`;
