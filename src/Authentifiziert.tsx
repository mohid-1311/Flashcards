import { JSX } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute(element: JSX.Element): JSX.Element{
  const auth = localStorage.getItem("isAuthenticated") === "true"
  return auth ? element : <Navigate to="/Anmeldung"/>
}