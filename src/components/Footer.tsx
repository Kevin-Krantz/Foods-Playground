import styled from "styled-components";

function Footer(): JSX.Element {
  return (
    <FooterContainer>
      <Logo src="/images/logo.png" alt="Your App Logo" />
      <FooterText>
        © {new Date().getFullYear()} BiteBlast. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.footer`
  background-color: #000000af;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;
`;

const Logo = styled.img`
  height: 150px;
  margin-right: 100px;
`;

const FooterText = styled.p`
  font-size: 16px;
`;
