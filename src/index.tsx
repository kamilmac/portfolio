import React from 'react'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';

const RECENT_SKETCH = '5';

const Sketch = () => {
  const { id } = useParams();
  const Component = React.lazy(() => import(`./sketches/${id || RECENT_SKETCH}.tsx`));
  return (
    <React.Suspense
      fallback={<>...</>}
    >
      <Component />
    </React.Suspense>
  );
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":id" element={<Sketch />} />
        <Route path="/" element={<Navigate replace to={`/${RECENT_SKETCH}`} />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);