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

const RECENT_SKETCH = 8;

const Sketch = () => {
  const { id } = useParams();
  const [next, setNext] = React.useState(null)
  const [prev, setPrev] = React.useState(null)

  React.useEffect(() => {
    setNext(Number(id) >= RECENT_SKETCH ? null : Number(id)+1);
    setPrev(Number(id) <= 1 ? null : Number(id)-1);
  }, [id])

  const Component = React.lazy(() => import(`./sketches/${id || RECENT_SKETCH}.tsx`));
  return (
    <Layout next={next} prev={prev}>
      <React.Suspense
        fallback={<>loading...</>}
      >
        <Component />
      </React.Suspense>
    </Layout>
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


const Layout = ({prev, next, children}) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-evenly',
          padding: '20px 0',
          bottom: 0,
        }}
      >
        <div>
          {
            prev &&
            <Link
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '400%',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
              to={`/${prev}`}>👈</Link>
          }
        </div>
        <div>
          {
            next &&
            <Link 
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '400%',
                textTransform: 'uppercase',
                userSelect: 'none',
              }}
              to={`/${next}`}>👉</Link>
          }
        </div>
      </div>
      {
        children
      }
    </>
  );
};
