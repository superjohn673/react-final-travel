import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminOrders from "./pages/admin/AdminOrders";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import MemberLayout from "./pages/front/MemberLayout";
import Orders from "./pages/front/orders";
import OrderDetail from "./pages/front/OrderDetail.js";
import UserProfile from "./pages/front/UserProfile.js";
import MyFavorite from "./pages/front/MyFavorite.js";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import AreaJapan from "./pages/front/AreaJapan";
import CityJapan from "./pages/front/CityJapan";
import Tour from "./pages/front/Tour";
import ThemeJapan from "./pages/front/ThemeJapan";
import SeasonJapan from "./pages/front/SeasonJapan";
import WeatherJapan from "./pages/front/WeatherJapan";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import Success from "./pages/front/Success";
import Login from "./pages/Login";
import ServiceLocations from "./pages/front/ServiceLocation";
import Information from "./pages/front/Information";
import ContactUs from "./pages/front/ContactUs";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <ScrollToTop /> {/* 使用 ScrollToTop 組件 */}
        <Routes>
          <Route path="/" element={<FrontLayout />}>
            <Route path="" element={<Home />} />
            <Route path="location" element={<ServiceLocations />} />
            <Route path="information" element={<Information />} />
            <Route path="contact" element={<ContactUs />} />
            <Route path="member" element={<MemberLayout />}>
              <Route path="orders" element={<Orders />} />
              <Route path="orders/:orderId" element={<OrderDetail />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="favorite" element={<MyFavorite />} />
            </Route>

            <Route path="products" element={<Products />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="area-japan" element={<AreaJapan />}>
              <Route path=":name" element={<CityJapan />} />
            </Route>
            <Route path="Tour" element={<Tour />}>
              <Route path=":theme" element={<ThemeJapan />} />
            </Route>
            <Route path="season-japan" element={<SeasonJapan />}>
              <Route path=":season" element={<WeatherJapan />} />
            </Route>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="success/:orderId" element={<Success />} />
            <Route path="login" element={<Login />}></Route>
          </Route>

          <Route path="/admin" element={<Dashboard />}>
            <Route path="products" element={<AdminProducts />}></Route>
            <Route path="coupons" element={<AdminCoupons />}></Route>
            <Route path="orders" element={<AdminOrders />}></Route>
          </Route>
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
