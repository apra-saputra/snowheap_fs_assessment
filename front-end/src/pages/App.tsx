import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthContextProvider from "@/contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  );
}

export default App;
