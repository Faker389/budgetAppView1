import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'
import Main from './components/main';
import Statistic from './components/statistic';
import User from './components/user';
import Footer from './components/footer';
function App() {
  return (<Router>
    <div className='w-full h-screen flex-col overflow-hidden bg-white flex'>
    <Routes>
      <Route path='/' Component={Main} />
      <Route path='/statistic' Component={Statistic} />
      <Route path='/user' Component={User} />
    </Routes>
     <Footer />
    </div>
  </Router>
  );
}

export default App;
