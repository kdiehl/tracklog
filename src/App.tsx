// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import ArchivedTickets from "./tickets/ArchivedTickets";
import Navbar from "./components/Navbar";
import "./App.css";
import JiraTickets from "./tickets/JiraTickets";
import { SettingsProvider } from "./contexts/SettingsContext";
import SettingsPage from "./pages/SettingsPage";

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-700 dark:text-white">
          <Navbar />
          <div className="flex flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route
                path="/tickets"
                element={
                  <div className="flex-1 p-5 overflow-y-auto">
                    <JiraTickets />
                  </div>
                }
              ></Route>
              <Route
                path="/tickets/archive"
                element={
                  <div className="flex-1 p-5 overflow-y-auto">
                    <ArchivedTickets />
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </SettingsProvider>
  );
};

export default App;
