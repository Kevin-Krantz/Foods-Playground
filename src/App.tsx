import { Route, BrowserRouter, Routes } from "react-router-dom";
import "@criipto/verify-react/dist/criipto-verify-react.css";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import FoodStatus from "./components/FoodStatus";
import AboutUs from "./components/AboutUs";
import HomePage from "./components/HomePage";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import MyPage from "./components/MyPage";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/foods" element={<ProductList />} />
          <Route path="/foods/:id" element={<ProductPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/status" element={<FoodStatus />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/mypage" element={<MyPage />} />

          {/* <Route
            path="/login"
            element={
              <Login>
                <AuthMethodSelector />
              </Login>
            }
          /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
