import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Inicial from "./pages/Inicial"
import Menu from "./pages/Menu"

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path="/inicial" element={<Inicial/>}/>
        {/*Todas as rotas internas ficam dentro do layout principal */}
        <Route path="/*" element={<Menu/>}/>
      </Routes>
    </Router>
  )
}