import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import Create from './views/Create';
import Details from './views/Details';
import Update from './views/Update';
import ErrorPage from './views/ErrorPage';


function App() {
  return (
    <div>
      <h1>Jobs Board</h1>
      
      <Routes>
        <Route path='/jobs' element={<Dashboard />} />
        <Route path='/jobs/add' element={<Create />} />
        <Route path='/jobs/:id' element={<Details />} />
        <Route path='/jobs/edit/:id' element={<Update />} />
        {/* <Route path='*' element={<ErrorPage />} /> */}
      </Routes>
    </div>
  );
}

export default App;
