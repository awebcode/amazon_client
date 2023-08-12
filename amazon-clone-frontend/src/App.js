import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  HomePage,
  NavBar,
  Checkout,
  SearchResults,
  ProductPage,
} from "./components";
import WishList from "./components/WishList";
import RegistrationForm from "./components/auth/Registration";
import LoginForm from "./components/auth/Login";
import Account from "./components/auth/Account";
import CreateProductComponent from "./components/product/CreateProduct";
import UpdateForm from "./components/product/Update";
import MainProducts from "./components/product/MainProduct";
import Details from "./components/product/Details";
import HomeFooter from "./components/Footer";
import CheckoutPage from "./components/CheackOut";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<RegistrationForm />} />
        <Route path="/signin" element={<LoginForm />} />
        <Route path="/account" element={<Account />} />
        <Route path="/create" element={<CreateProductComponent />} />
        <Route path="/update/:id" element={<UpdateForm />} />

        <Route path="/products" element={<MainProducts />} />
        <Route path="/products/:keyword" element={<MainProducts />} />
        <Route path="/product/:id" element={<Details />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
      <HomeFooter />
    </BrowserRouter>
  );
};

export default App;
