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

const RECENT_SKETCH = 7;
let next = null;
let prev = null;
let page = null;

const Sketch = () => {
  const { id } = useParams();
  const [next, setNext] = React.useState(null)
  const [prev, setPrev] = React.useState(null)

  React.useEffect(() => {
    console.log('computing next/prev', Number(id))
    console.log(Number(id) >= RECENT_SKETCH ? null : Number(id)+1);
    setNext(Number(id) >= RECENT_SKETCH ? null : Number(id)+1);
    setPrev(Number(id) <= 1 ? null : Number(id)-1);
    console.log({prev})
    console.log({next})
  }, [id])

  const Component = React.lazy(() => import(`./sketches/${id || RECENT_SKETCH}.tsx`));
  return (
    <>
      <h1>
        {
          next &&
          <Link to={`/${next}`}>Next</Link>
        }
      </h1>
      <h1>
        {
          prev &&
          <Link to={`/${prev}`}>Prev</Link>
        }
      </h1>
      <React.Suspense
        fallback={<>loading...</>}
      >
        <Component />
      </React.Suspense>
    </>
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