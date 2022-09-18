import React from 'react'
import Lottie from 'react-lottie'
import rollUp from './lottie/rollUp.json'
import { motion } from 'framer-motion'
import { useControls } from 'leva';
import { Scanline } from '@react-three/postprocessing';

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


export const Onboarding = (props) => {
  const [pos, setPos] = React.useState([null,null])
  const {
    DisableDashedLine,
    DashedLineColor,
    DashedLineWidth,
    DashedLineArray,
    InstructionsBGColor,
    InstructionsPaddingLeft,
    InstructionsPaddingBottom,
  } = useControls({
    DisableDashedLine: false,
    DashedLineColor: '#3d37de',
    DashedLineWidth: {
      value: 1,
      min: 1,
      max: 20,
      step: 1,
    },
    DashedLineArray: {
      value: 12,
      min: 1,
      max: 40,
      step: 1,
    },
    InstructionsBGColor: '#1e1e1e44',
    InstructionsPaddingLeft: {
      value: 200,
      min: 0,
      max: 1000,
      step: 10,
    },
    InstructionsPaddingBottom: {
      value: 80,
      min: 0,
      max: 1000,
      step: 10,
    },
  });
  const w = window.innerWidth
  const h = window.innerHeight
  
  React.useEffect(() => {
    let interval = null;
    setTimeout(() => {
      interval = setInterval(() => {
        const newP = props.getPosition()
        setPos(newP);
      }, 16)
    }, 1200)
    return () => {
      clearInterval(interval)
    };
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
        style={{
          position: 'absolute',
          x: InstructionsPaddingLeft,
          y: h - (INSTRUCTIONS[props.activeStep].h + InstructionsPaddingBottom),
          width: INSTRUCTIONS[props.activeStep].w,
          height: INSTRUCTIONS[props.activeStep].h,
          background: InstructionsBGColor,
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
        pos[0] && pos[1] && props.activeStep < 2 && !DisableDashedLine &&
        <svg width={w} height={h}>
          <path strokeDasharray={DashedLineArray} strokeLinecap="round" stroke={DashedLineColor} strokeWidth={DashedLineWidth} fill="none" d={`M ${INSTRUCTIONS[props.activeStep].w + InstructionsPaddingLeft} ${h-(INSTRUCTIONS[props.activeStep].h/2 + InstructionsPaddingBottom)} H ${pos[0] || 0} V ${h-pos[1] || 0}`}/>
        </svg>
      }
    </div>
  );
}

const Button = (props) => {
  const {
    InstructionsButtonColor,
  } = useControls({
    InstructionsButtonColor: '#3e00cfdd',
  });
  return (
    <motion.div
      whileTap={{
        scale: 0.9,
      }}
      style={{
        background: InstructionsButtonColor,
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
