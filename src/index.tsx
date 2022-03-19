import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import { App }  from './sketches/1'

import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

const LAST = 0;

const Comp = (id) => React.lazy(() => import(`./sketches/${id}`));

const Goto = () => {
  const { id } = useParams();
  console.log({id})

  const Elem = Comp(id || LAST);

  return (
    <React.Suspense
      fallback={<>...</>}
    >
      <Elem />
    </React.Suspense>
  )
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path=":id"
          element={
            <Goto />
          }
        />
        <Route path="/" element={<Goto />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
)
