import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Employees from './pages/DashBoard/DashBoard';
import Form from './pages/Form/Form';

const App = () => {


  return (
    <div className='w-full h-[100vh] bg-gradient-to-b from-neutral-800 to-neutral-900 overflow-y-auto'>
      
      {/* Layout */}
      <Layout />

      {/* pages */}
      <div className="w-full max-w-[1300px]  mx-auto  h-[calc(100vh-8rem)]">
        <Routes>
          <Route path="/" element={<Employees />} />
          <Route path="/form" element={<Form isEditForm={false} />} />
          <Route path="/form/edit/:id" element={<Form isEditForm={true} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
