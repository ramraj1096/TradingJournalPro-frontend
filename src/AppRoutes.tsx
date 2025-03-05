import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AssetSearchPage from "./pages/AssetSearchPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import MarketNews from "./pages/MarketNews";
import ManagePortfolio from "./pages/ManagePortfolio";
import ManageTrades from "./pages/ManageTrades";

import JournalLogs from "./pages/JournalLogsPage";
import HoldingsAnalyticsPage from "./pages/HoldingsAnalyticsPage";
import TradesAnalyticsPage from "./pages/TradesAnalyticsPage";
import JournalAnalyticsPage from "./pages/JournalAnalyticsPage";
import ProtectedRoute from "./auth/ProtectedRoute";


const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout showHero>
            <HomePage />
          </Layout>
        }
      />
      
      <Route
        path="/search/:symbol"
        element={
          <Layout >
            <AssetSearchPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout >
            <LoginPage />
          </Layout>
        }
      />

      <Route
        path="/register"
        element={
          <Layout >
            <RegisterPage />
          </Layout>
        }
      />

      <Route
        path="/reset-password"
        element={
          <Layout >
            <ForgetPasswordPage />
          </Layout>
        }
      />
      <Route element={<ProtectedRoute />}>
      <Route
        path="/market-news"
        element={
          <Layout >
            <MarketNews />
          </Layout>
        }
      />
      <Route
        path="/manage-portfolio"
        element={
          <Layout >
            <ManagePortfolio />
          </Layout>
        }
      />
      <Route
        path="/manage-trades"
        element={
          <Layout >
            <ManageTrades />
          </Layout>
        }
      />

      <Route
        path="/journal-logs"
        element={
          <Layout >
            <JournalLogs />
          </Layout>
        }
      />

      <Route
        path="/holdings/analytics"
        element={
          <Layout >
            <HoldingsAnalyticsPage />
          </Layout>
        }
      />

      <Route
        path="/trades/analytics"
        element={
          <Layout >
            <TradesAnalyticsPage />
          </Layout>
        }
      />
      <Route
        path="/journals/analytics"
        element={
          <Layout >
            <JournalAnalyticsPage />
          </Layout>
        }
      />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>
  );
};

export default AppRoutes;
