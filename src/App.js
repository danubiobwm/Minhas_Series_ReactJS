import React, {useState, useEffect} from 'react';
import Header from './component/Header';
import Generos from './component/Generos';
import Home from './component/Home';
import axios from 'axios';
import { BrowserRouter as Router, Route }  from 'react-router-dom';
import NovoGenero from './component/NovoGenero';
import EditarGenero from './component/EditarGenero';



function App() {

const [ data, setData ] = useState({});

useEffect(()=>{
  axios.get('/api').then(res =>{
    setData(res.data);
  });
},[]);

  return (
    <Router>
    <div >
      <Header />
      <Route path='/' exact component={Home} />
      <Route path='/generos/:id' exact component={EditarGenero} />
      <Route path='/generos/novo' exact component={NovoGenero} />
      <Route path='/generos' exact  component={Generos} />
      
      <pre>{JSON.stringify(data)}</pre>
    
    </div>
    </Router>
  );
}

export default App;
