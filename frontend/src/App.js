import AdminPage from './admin/AdminPage'
import OrdersPageAdmin from './admin/OrdersPageAdmin';
import ClientPage from './client/ClientPage'
import UsersPageAdmin from './admin/UsersPageAdmin'
import LoginPageAdmin from './admin/LoginPageAdmin'
import MenusPageAdmin from './admin/MenusPageAdmin';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/admin' element={<AdminPage/>}/>
      <Route path='/admin/login' element={<LoginPageAdmin/>}/>
      <Route path='/admin/users' element={<UsersPageAdmin/>}/>
      <Route path='/admin/menus' element={<MenusPageAdmin/>}/>
      <Route path='/admin/orders' element={<OrdersPageAdmin/>}/>
      <Route path='/client/:tableId' element={<ClientPage/>}/>
    </Routes>
  );
}

export default App;
