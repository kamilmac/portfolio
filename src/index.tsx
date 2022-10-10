import React from 'react'
import './index.css'
import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  Navigate,
  Link,
} from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Main } from './main';

const Sketch = () => {
  const { id } = useParams();

  const Component = React.lazy(() => import(`./sketches/${id}.tsx`));
  return (
    <React.Suspense
      fallback={<>loading...</>}
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
        <Route path="/" element={<Main />} />
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

