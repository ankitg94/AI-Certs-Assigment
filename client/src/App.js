import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Form from "./Components/Form"
const App = () => {
  return (
    <>
    <BrowserRouter> 
    <Routes> 
      <Route path="/" element={<Form/>}/>
       
        
      {/* <Route path="/" element={ <ItemList/>} />  */}
     
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
