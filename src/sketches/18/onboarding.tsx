import React from 'react'
import Lottie from 'react-lottie'
import shoesAnim from './lottie/shoesAnim.json'

export const Onboarding = (props) => {
  const [pos, setPos] = React.useState([null,null])
  const w = window.innerWidth
  const h = window.innerHeight
  React.useEffect(() => {
    setInterval(() => {
      setPos(props.getPosition());
    }, 16)
  }, [])
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
     <div
        style={{
          position: 'absolute',
          left: w/2 - 320,
          bottom: 70,
          width: 400,
          height: 160,
          background: 'rgba(130,130,130,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 16,
          boxSizing: 'border-box',
          borderRadius: 12,
          fontSize: 18,
          color: 'white',
          backdropFilter: 'blur(12px)',
          paddingRight: 120,
        }}
      >
        Take off your shoes and tap 'OK' when ready
      </div> 
      <div
        style={{
          position: 'absolute',
          left: w/2-32,
          bottom: 194,
        }}
      >
        <Button
          onClick={() => {
            props.onStepChange(props.activeStep+1);
          }}
        >OK</Button>
      </div>
      <div>
        <svg width={w} height={h}>
          <path  strokeDasharray="6" strokeLinecap="round" stroke="#eee" strokeWidth="2" fill="none" d={`M ${w/2} ${h-148} H ${pos[0] || 0} V ${h-pos[1] || 0}`}/>
        </svg>
      </div>
    </div>
  );
}

const Button = (props) => {
  return (
    <div
      style={{
        background: 'rgba(250,250,250,0.2)',
        width: 88,
        height: 88,
        display: 'flex',
        marginLeft: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: 16,
        position: 'absolute',
        color: 'white',
        pointerEvents: 'all'
      }}
      onClick={props.onClick}
    >
      { props.children }
    </div>
  );
}

const ShoesAnimation = () => {
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: shoesAnim,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
  return (
    <div>
      <Lottie 
	      options={defaultOptions}
        height={164}
        width={164}
      />
    </div>
  );
}
