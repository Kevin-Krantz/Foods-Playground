import styled from "styled-components";

function HomePage() {
  return <FirstPicture src="/images/pizza1.jpg" />;
}

export default HomePage;

const FirstPicture = styled.img`
  height: 500px;
  width: 400px;
`;
