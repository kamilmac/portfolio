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

const RECENT_SKETCH = '7';

const Sketch = () => {
  const { id } = useParams();
  const Component = React.lazy(() => import(`./sketches/${id || RECENT_SKETCH}.tsx`));
  return (
    <React.Suspense
      fallback={<>loading...</>}
    >
      <Component />
    </React.Suspense>
  );
};

// const Shield = (props) => {
//   const [ready, setReady] = React.useState(false)
//   React.useEffect(() => {
//     setTimeout(
//       () => {
//         setReady(true);
//       },
//       1000,
//     );
//   }, []);

//   if (!ready) { return <h1>SHJIELDING</h1>; }
//   return (
//     <div>
//       <h1>LETS GO</h1>
//       { props.children }
//     </div>
//   )
// }

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