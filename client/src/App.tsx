import { RouterProvider } from 'react-router-dom';
import ContextWrapper from './context/ContextWrapper';
import router from './router';

const App = () => {
  return (
    <ContextWrapper>
      <RouterProvider router={router} />
    </ContextWrapper>
  )
}

export default App;
