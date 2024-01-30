import './css-constant/color.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routePath } from "./constant/route";
import AppLayout from "./route/AppLayout";
import Home from "./features/Home";
import NoLoginPage from "./route/NoLoginRoute";
import Login from "./login/Login";
import ProtectedRoute from "./route/ProtectedRoute";
import Contact from "./features/Contact";
import NotFound from "./features/NotFound";
import Report from "./features/Report";
import Inbox from "./features/Inbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routePath.slash} element={<AppLayout />}>
          {/* No authen routes */}
          <Route path={routePath.login} element={<NoLoginPage />}>
            <Route path={routePath.login} element={<Login />} />
          </Route>

          {/* Authenticated Routes */}
          <Route path={routePath.slash} element={<ProtectedRoute />}>
            <Route path={routePath.other} element={<NotFound />} />
            <Route path='' element={<Home />} />
            <Route path={routePath.home} element={<Home />} />
            <Route path={routePath.contact} element={<Contact />} />
            <Route path={routePath.inbox} element={<Inbox />} />
            <Route path={routePath.report} element={<Report />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
