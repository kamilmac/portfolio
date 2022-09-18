import React from 'react'
import Lottie from 'react-lottie'
import rollUp from './lottie/rollUp.json'

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
          left: 80,
          bottom: 80,
          width: 400,
          height: 160,
          background: 'rgba(30,30,30,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 16,
          boxSizing: 'border-box',
          borderRadius: 32,
          fontSize: 18,
          color: '#eee',
          backdropFilter: 'blur(12px)',
          paddingRight: 120,
        }}
      >
        {
          props.activeStep === 0 ?
            'Take off your shoes and tap "OK" when ready' :
            'Roll up your pants and stand on the scanner'
        }
        {
          props.activeStep === 1 &&
          <RollUp />
        }
      </div>
      <div
        style={{
          position: 'absolute',
          left: w/2-320,
          bottom: 202,
        }}
      >
        <Button
          onClick={() => {
            props.onStepChange(props.activeStep+1);
          }}
        >OK</Button>
      </div>
      {
        pos[0] && pos[1] &&
        <svg width={w} height={h}>
          <path  strokeDasharray="6" strokeLinecap="round" stroke="#ddd" strokeWidth="2" fill="none" d={`M ${w/2- 200} ${h-158} H ${pos[0] || 0} V ${h-pos[1] || 0}`}/>
        </svg>
      }
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

const RollUp = () => {
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: rollUp,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  
  return (
    <div>
      <Lottie 
	      options={defaultOptions}
        height={96}
        width={96}
      />
    </div>
  );
}
