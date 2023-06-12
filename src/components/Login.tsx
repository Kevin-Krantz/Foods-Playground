function Login({ children }: any): JSX.Element {
  return (
    <div style={{ marginBottom: "210px" }}>
      <p style={{ color: "white", marginTop: "32px", marginLeft: "32px" }}>
        Vänligen identifiera dig med BankID för att slutföra din beställning!
      </p>
      {children}
    </div>
  );
}

export default Login;
