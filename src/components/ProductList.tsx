import { useDispatch, useSelector } from "react-redux";
import { useGetFoodsQuery } from "../store/services/rtkApi";
import { useEffect } from "react";
import { setOriginalFoods } from "../store/features/foods";
import styled from "styled-components";
import { IApiResponse } from "../store/types/Api";
import { Link } from "react-router-dom";
import Loading from "./Loading";

function ProductList(): JSX.Element {
  const dispatch = useDispatch();
  const { data: food } = useGetFoodsQuery<IApiResponse>();

  useEffect(() => {
    if (food) {
      dispatch(setOriginalFoods(food));
    }
  }, [food, dispatch]);

  if (!food) {
    return <Loading />;
  }

  return (
    <Container>
      {food.map((f) => (
        <Link style={{ all: "unset" }} to={`/foods/${f._id}`} key={f._id}>
          <FoodItem key={f._id}>
            <FoodImage src={f.imageUrl} alt={f.name} />
            <FoodInfo>
              <FoodName>{f.name}</FoodName>
              <FoodPrice>{f.price} kr</FoodPrice>
            </FoodInfo>
          </FoodItem>
        </Link>
      ))}
    </Container>
  );
}

export default ProductList;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 64px;
`;

const FoodItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 350px;
  border-radius: 8px;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    & > img {
      transition: transform 0.1s ease-in-out;
      transform: scale(1.2);
    }
  }

  & > img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    transition: transform 0.1s ease-in-out;
  }
`;

const FoodImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
`;

const FoodInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 150px;
`;

const FoodName = styled.h3`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
  text-align: center; /* center the food name */
`;

const FoodPrice = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  margin-top: 10px; /* add margin to the top of the price */
`;
