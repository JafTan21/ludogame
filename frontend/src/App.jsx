import { BrowserRouter } from 'react-router-dom';
import Page from 'routes/Page';
import { SocketContext, socket } from 'services/socket';

import 'styles/auth.css';

export default function App() {

  return (
    <SocketContext.Provider value={socket}>
      <BrowserRouter>
        <Page />
      </BrowserRouter>
    </SocketContext.Provider>
  );
};
