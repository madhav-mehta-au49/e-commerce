import './App.css';
import Home from './Page/Home';
import Layout from './Page/Layout';
import Login from './Page/Login';
import Menu from './Page/Menu';
import {Routes,Route, BrowserRouter} from "react-router-dom"
import NewProduct from './Page/NewProduct';
import SignUp from './Page/SignUp';
import { useEffect } from 'react';
import { setDatProduct } from './Redux/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Cart from './Page/Cart';
import Success from './Page/Success';
import Cancel from './Page/Cancel';

function App() {

  const dispatch = useDispatch()

  const productData = useSelector((state)=>state.product)
  

  useEffect(()=>{


    (async ()=>{
      const res = await fetch("http://localhost:8080/product")
      const resData = await res.json();
      
      dispatch(setDatProduct(resData))
    })()

  },[])

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<Home/>}/>
      {/* <Route path='menu' element={<Menu/>}/> */}
      <Route path='menu/:filterby' element={<Menu/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='newproducts' element={<NewProduct/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='success' element={<Success/>}/>
      <Route path='cancel' element={<Cancel/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
