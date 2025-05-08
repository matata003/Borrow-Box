
import './App.css';
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './Components/SignUp';
import SignIn from './Components/SignIn';
import AddProduct from './Components/AddProduct';
import GetProduct from './Components/GetProduct';
import Navbar from './Components/Navbar';
import SingleProduct from './Components/SingleProduct';
import Conversations from './Components/Conversations'
import SectionOne from './Components/SectionOne';
import Carousel from './Components/Carousel';
import SectionTwo from './Components/SectionTwo';
import Footer from './Components/Footer';
import Inbox from './Components/Inbox';
import Profile from './Components/Profile';







function App() {
  return (
   <Router>
      <div className="App">
        <Routes>
          <Route path = "/signup" element={<SignUp/>}></Route>
          <Route path = "/signin" element={<SignIn/>}></Route>
          <Route path='/addproduct' element ={<AddProduct/>}></Route>
          <Route path='/' element ={<GetProduct/>}></Route>
          <Route path='/navbar' element={<Navbar/>}></Route>
          <Route path = '/singleproduct' element = {<SingleProduct/>}></Route>
          <Route path='/conversations' element ={<Conversations/>}></Route>
          
          <Route path='/SectionOne' element={<SectionOne/>}></Route>
          <Route path='/Carousel' element={<Carousel/>}></Route>
          <Route path ='/SectionTwo' element ={<SectionTwo/>}></Route>
          <Route path ='/footer' element ={<Footer/>}></Route>
          <Route path='/inbox' element={<Inbox/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </div>
   </Router>
  );
}

export default App;
