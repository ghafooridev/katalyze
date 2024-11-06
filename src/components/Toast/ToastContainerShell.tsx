import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function ToastContainerShell() {
  return (
    <ToastContainer
      data-testid='toast-container'
      position='top-right'
      autoClose={4000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      style={{ width: '400px' }}
      limit={1}
    />
  );
}
