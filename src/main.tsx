import React from 'react'
import { css } from '@emotion/css'
// background: img | video
// children: <html />
// sketch_id: 18
// title: ’light eater’
// details: ‘render made with blender etc…’

const SECTIONS = [
	{
		background: 'particles1200.jpg',
		children: null,
		sketch_id: 18,
		title: 'light eater',
		details: 'render made with blender etc…',
	},
  {
		background: 'swiatlojad_web.jpg',
		children: null,
		sketch_id: 18,
		title: 'light eater from plate',
		details: 'baklava',
	},
  {
		background: 'dove_web.jpg',
		children: null,
		sketch_id: 18,
		title: 'light eater from plate',
		details: 'baklava',
	},
]

export const Main = () => {
  return (
    <React.Suspense
      fallback={<>loading...</>}
    >
      <div>
        {
          SECTIONS.map(s =>
            <Section
              background={s.background}
              title={s.title}
              details={s.details}
            />  
          )
        }
      </div>
    </React.Suspense>
  );
};

const Section = (props) => {
  const size = useWindowSize();
  return (
    <div
      className={css`
        width: ${size.w}px;
        height: ${size.h}px;
        background-image: url(${props.background});
        background-size: cover;
        background-position: center;
        overflow: hidden;
      `}
    >

    </div>
  );
}


// Hook
function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    w: undefined,
    h: undefined,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}