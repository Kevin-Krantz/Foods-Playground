import styled from "styled-components";

function AboutUs(): JSX.Element {
  return (
    <Container>
      <h2>Om oss</h2>
      <p>
        Välkommen till BiteBlast, en smakfull plats där vi serverar de mest
        delikata pizzor och kebabtallrikar. Vårt mål är att erbjuda dig de bästa
        smakupplevelserna med en enkel och bekväm beställningsprocess.
      </p>
      <p>
        Vi har ett brett utbud av pizzor och kebabtallrikar, tillagade med
        kärlek och de färskaste ingredienserna. Vår passion för matlagning och
        kundnöjdhet har gjort oss till en favorit bland våra kunder.
      </p>
      <p>
        På BiteBlast värdesätter vi kvalitet och smak, och vi är stolta över att
        kunna erbjuda dig dessa läckerheter direkt till din dörr. Vi hoppas att
        du njuter av våra rätter lika mycket som vi njuter av att laga dem åt
        dig.
      </p>
      <p>
        Tveka inte att kontakta oss om du har några frågor eller förslag. Vi ser
        fram emot att servera dig och göra din måltid minnesvärd.
      </p>
    </Container>
  );
}

export default AboutUs;

const Container = styled.div`
  color: white;
  padding: 20px;
  text-align: center;

  h2 {
    margin-bottom: 40px;
  }

  p {
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
