import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
import Home from "./Home/Home"
import Login from "./Login/Login";
import { ProtectedRoute } from "./ProtectedRoute/ProtectedRoute";
import Register from "./Register/Register"; 


function App() {
  
  return (
    <div className="text-black bg-slate-300 h-screen flex">
    <AuthProvider>
      <Routes>
        <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
        } />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;
