import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthGaurdAdmin from "./gaurds/AuthGaurdAdmin";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import LayoutMain from "./layouts/main/LayoutMain";
import AddUpdateCategoryForm from "./pages/admin/categories/AddUpdateCategoryForm";
import CategoryList from "./pages/admin/categories/CategoryList";
import DashBoard from "./pages/admin/DashBoard";
import OrdersList from "./pages/admin/orders/OrdersList";
import AddUpdatePageForm from "./pages/admin/pages/AddUpdatePageForm";
import PageList from "./pages/admin/pages/PageList";
import AddUpdateProductForm from "./pages/admin/products/AddUpdateProductForm";
import AdminProductsList from "./pages/admin/products/ProductsList";
import AddUpdateSubCategoryForm from "./pages/admin/subCategories/AddUpdateSubCategoryForm";
import SubCategoriesList from "./pages/admin/subCategories/SubCategoriesList";
import UpdateUserForm from "./pages/admin/users/UpdateUserForm";
import UsersList from "./pages/admin/users/UsersList";
import Home from "./pages/main/Home";
import Page from "./pages/main/Page";
import ProductDetails from "./pages/main/ProductDetails";
import ProductList from "./pages/main/ProductList";
import SignIn from "./pages/main/SignIn";
import SignUp from "./pages/main/SignUp";
import store from "./redux/store";
import VerifyEmail from "./pages/main/VerifyEmail";
import { grey } from "@mui/material/colors";
import RequestVerification from "./pages/main/RequestVerification";
import CheckOut from "./pages/main/CheckOut";
import AuthGaurd from "./gaurds/AuthGaurd";
import AddUpdateFilterForm from "./pages/admin/filters/AddUpdateFilterForm";
import FilterList from "./pages/admin/filters/FilterList";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: grey[800],
      },
      text: {
        main: grey[700],
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LayoutMain />}>
              <Route index element={<Home />} />
              <Route path="category/:categorySlug" element={<Page />} />
              <Route
                path="category/:categorySlug/:subCategorySlug"
                element={<ProductList />}
              />
              <Route
                path="category/:categorySlug/:subCategorySlug/:productSlug"
                element={<ProductDetails />}
              />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="verifyEmail" element={<VerifyEmail />} />
              <Route
                path="requestVerification"
                element={<RequestVerification />}
              />
              <Route
                path="checkout"
                element={
                  <AuthGaurd>
                    <CheckOut />
                  </AuthGaurd>
                }
              />
            </Route>

            <Route
              path="/admin"
              element={
                <AuthGaurdAdmin>
                  <LayoutAdmin />
                </AuthGaurdAdmin>
              }
            >
              <Route index element={<DashBoard />} />
              <Route path="categories" element={<CategoryList />} />
              <Route
                path="categories/:id"
                element={<AddUpdateCategoryForm />}
              />
              <Route path="filters" element={<FilterList />} />
              <Route path="filters/:id" element={<AddUpdateFilterForm />} />
              <Route path="subCategories" element={<SubCategoriesList />} />
              <Route
                path="subCategories/:id"
                element={<AddUpdateSubCategoryForm />}
              />
              <Route path="products" element={<AdminProductsList />} />
              <Route path="products/:id" element={<AddUpdateProductForm />} />
              <Route path="pages" element={<PageList />} />
              <Route path="pages/:id" element={<AddUpdatePageForm />} />
              <Route path="orders" element={<OrdersList />} />
              <Route path="users" element={<UsersList />} />
              <Route path="users/:id" element={<UpdateUserForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
