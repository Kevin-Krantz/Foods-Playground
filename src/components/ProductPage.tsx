import { useParams } from "react-router-dom";
import {
  useAddToCartMutation,
  useGetFoodQuery,
} from "../store/services/rtkApi";
import styled from "styled-components";
import { useEffect } from "react";
import { RootState } from "../store/configureStore";
import { useSelector } from "react-redux";

function ProductPage(): JSX.Element {
  const { id } = useParams();
  const { data: food } = useGetFoodQuery(id);
  const [addToCart] = useAddToCartMutation();

  const currentUser = useSelector((state: RootState) => state.entities.auth);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when the component is mounted
  }, []);

  const handleAddToCart = () => {
    if (food) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      addToCart({ foodId: food._id, quantity: 1 });
    }
  };

  return (
    <Container>
      <ImageContainer>
        <Image src={food?.imageUrl} alt={food?.name} />
      </ImageContainer>
      <Details>
        <Title>{food?.name}</Title>
        <Description>{food?.description}</Description>
        <Ingredients>Ingredienser: {food?.ingredients.join(", ")}</Ingredients>
        <Price>Pris: {food?.price}kr</Price>
        {currentUser.token === null && (
          <Register>
            Registrera dig för att lägga till något i varukorgen
          </Register>
        )}
        <AddToCartButton onClick={handleAddToCart}>Lägg till</AddToCartButton>
      </Details>
    </Container>
  );
}

export default ProductPage;

const Container = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageContainer = styled.div`
  width: 40%;
  height: 100%;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const Details = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 40px;
  margin-top: 150px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Ingredients = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Price = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Register = styled.em`
  color: red;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  display: inline-block;
  padding: 0.5em 1.5em;
  margin-top: 20px;
  font-size: 1.2em;
  font-weight: 700;
  text-align: center;
  background-color: #ffffff81;
  color: #000;
  border-radius: 2em;
  transition: all ease-out;

  &:hover {
    background-color: transparent;
    color: #fff;
    border: 2px solid #000000;
  }

  &:active {
    font-size: 1.3em;
    border: 2px solid #ffffff;
  }
`;
