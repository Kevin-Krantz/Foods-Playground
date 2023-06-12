import { useSelector } from "react-redux";
import styled from "styled-components";
import { useGetCartQuery } from "../store/services/rtkApi";

function PurchaseComplete(): JSX.Element {
  const { data: cart } = useGetCartQuery();

  console.log(cart?.items);

  return (
    <Container>
      <ContentWrapper>
        <StatusHeading>Köp Lyckades!</StatusHeading>
        <StatusText>Tack för din beställning!</StatusText>
        <StatusText>Din mat är påväg!</StatusText>
      </ContentWrapper>
    </Container>
  );
}

export default PurchaseComplete;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  border-radius: 12px;
  background-color: #ffffff62;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatusHeading = styled.h1`
  font-size: 2.2rem;
  color: #000000;
`;

const StatusText = styled.p`
  font-size: 1.2rem;
  color: #000000;
`;
