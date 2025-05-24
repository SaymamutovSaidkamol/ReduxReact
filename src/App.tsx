import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import { useRoutes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Saved from "./pages/Saved/Saved"
import Create from "./pages/Create/Create"

function App() {

  return (
    <>
      <Header />
      {
        useRoutes([
          { path: "/", element: <Home /> },
          { path: "/saved", element: <Saved /> },
          { path: "/create", element: <Create /> }
        ])
      }
      <Footer />
    </>
  )
}

export default App