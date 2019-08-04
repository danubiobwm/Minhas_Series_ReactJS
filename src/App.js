import React from 'react';
import Header from './component/Header';
import Generos from './component/Generos';
import Home from './component/Home';
import { BrowserRouter as Router, Route, Switch }  from 'react-router-dom';
import NovoGenero from './component/NovoGenero';
import EditarGenero from './component/EditarGenero';
import Serie from './component/Series';
import NovaSerie from './component/NovaSerie';
import InfoSerie from './component/InfoSerie';



function App() {



  return (
    <Router>
    <div >
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/generos' exact  component={Generos} />
        <Route path='/generos/novo' exact component={NovoGenero} />
        <Route path='/generos/:id' exact component={EditarGenero} />
        <Route path='/series' exact  component={Serie} />
        <Route path='/series/novo' exact component={NovaSerie} />
        <Route path='/series/:id' exact component={InfoSerie} />
      </Switch>
   
    
    </div>
    </Router>
  );
}

export default App;
