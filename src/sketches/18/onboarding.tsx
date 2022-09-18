import React from 'react'
import Lottie from 'react-lottie'
import rollUp from './lottie/rollUp.json'
import { motion } from 'framer-motion'

const INSTRUCTIONS = [
  {
    text: 'Take off your shoes and tap "OK" when ready',
    w: 400,
    h: 160,
  },
  {
    text: 'Roll up your pants and stand on the scanner',
    lottie: rollUp,
    w: 400,
    h: 160,
  },
  {
    text: "Hang on. You're almost there",
    w: 400,
    h: 160,
  }
];

const MARGIN = 80;


export const Onboarding = (props) => {
  const [pos, setPos] = React.useState([null,null])
  const w = window.innerWidth
  const h = window.innerHeight
  
  React.useEffect(() => {
    let interval = null;
    setTimeout(() => {
      interval = setInterval(() => {
        setPos(props.getPosition());
      }, 16)
    }, 1200)
    return () => clearInterval(interval);
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: 'absolute',
          x: MARGIN,
          y: h - (INSTRUCTIONS[props.activeStep].h + MARGIN),
          width: INSTRUCTIONS[props.activeStep].w,
          height: INSTRUCTIONS[props.activeStep].h,
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
          transformOrigin: 'center right',
        }}
      >
        { INSTRUCTIONS[props.activeStep].text }
        {
          INSTRUCTIONS[props.activeStep].lottie &&
          <LottieAnim anim={INSTRUCTIONS[props.activeStep].lottie} />
        }
        <div
          style={{
            margin: 12,
          }}
        >
          <Button
            onClick={() => {
              const next = INSTRUCTIONS[props.activeStep+1] ? props.activeStep+1 : 0;
              props.onStepChange(next);
            }}
          >
            OK
          </Button>
        </div>
      </motion.div>
      {
        pos[0] && pos[1] && props.activeStep < 2 &&
        <svg width={w} height={h}>
          <path strokeDasharray="6" strokeLinecap="round" stroke="#ddd" strokeWidth="2" fill="none" d={`M ${INSTRUCTIONS[props.activeStep].w + MARGIN} ${h-(INSTRUCTIONS[props.activeStep].h/2 + MARGIN)} H ${pos[0] || 0} V ${h-pos[1] || 0}`}/>
        </svg>
      }
    </div>
  );
}

const Button = (props) => {
  return (
    <motion.div
      whileTap={{
        scale: 0.9,
      }}
      style={{
        background: 'rgba(250,250,250,0.2)',
        width: 88,
        minWidth: 88,
        maxWidth: 88,
        height: 88,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: 16,
        color: 'white',
        pointerEvents: 'all',
        position: 'relative',
      }}
      onClick={props.onClick}
    >
      { props.children }
    </motion.div>
  );
}

const LottieAnim = (props) => {
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: props.anim,
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
