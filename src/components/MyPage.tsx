import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import styled from "styled-components";

function MyPage() {
  const currentUser = useSelector(
    (state: RootState) => state.entities.auth.currentUser
  );

  return (
    <Container>
      {currentUser ? (
        <div>YOOOOO {currentUser.name}</div>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
}

export default MyPage;

const Container = styled.div`
  color: white;
`;
