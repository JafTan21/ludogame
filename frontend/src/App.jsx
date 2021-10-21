import { BrowserRouter } from 'react-router-dom';
import Page from 'routes/Page';
import { SocketContext, socket } from 'services/socket';

import 'styles/auth.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App() {

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
      <ToastContainer />
    </SocketContext.Provider>
  );
};
