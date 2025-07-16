import LoginForm from "./components/authentication/login-form.jsx";
import RegisterForm from "./components/authentication/register-form.jsx";
import Header from "./controller/Header";
import Body from "./controller/Body";
import Footer from "./controller/Footer";
import { Routes, Route } from "react-router";
import NoPage from "./components/pages/NoPage";
import ShowPostById from "./utilis/showPostById.jsx";
import {ThemeProvider} from "@/components/theme-provider.jsx";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const data = useSelector((state)=> state.slice1.darkMode)
console.log(data)
  return (
    <>
    <ThemeProvider defaultTheme={data} storageKey="vite-ui-theme">
      <div className="m-3">
        <Header></Header>
        <Routes>
          <Route index element={<Body></Body>}></Route>
          <Route path="/view/post/:id" element={<ShowPostById></ShowPostById>}></Route>
          <Route
            path="login"
            element={
              <LoginForm className={"w-full min-w-3xs max-w-xs"}></LoginForm>
            }
          ></Route>
          <Route
            path="register"
            element={
              <RegisterForm
                className={"w-full min-w-3xs max-w-xs"}
              ></RegisterForm>
            }
          ></Route>
          <Route path="*" element={<NoPage></NoPage>}></Route>
        </Routes>

        <Footer></Footer>
      </div></ThemeProvider>
    </>
  );
}

export default App;
