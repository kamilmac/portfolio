import React from 'react'
import Lottie from 'react-lottie'
import rollUp from './lottie/rollUp.json'
import { motion } from 'framer-motion'
import { useControls } from 'leva';


export const VolumentalLogo: React.FC = () => {
  return (
    <svg
      x="0px"
      y="0px"
      viewBox="0 0 167.5 86.7"
      fill="#eee"
    >
      <g>
        <g>
          <polygon points="63.6,33.3 32.2,46.9 32.2,37.4 55.3,28.5 32.2,19.6 32.2,10.4 63.6,24.2 63.6,33.3 " />
        </g>
        <g>
          <polygon points="84.2,0 84.2,57.3 75.1,57.3 75.1,0 84.2,0 " />
        </g>
        <g>
          <path d="M109.3,28.6c0,9,2.1,12.7,7,12.7c4.8,0,6.9-3.7,6.9-12.7c0-9-2.1-12.6-6.9-12.6C111.4,16,109.3,19.6,109.3,28.6 L109.3,28.6z M133.2,28.6c0,12.9-6.1,20-16.9,20c-10.9,0-17-7.1-17-20c0-12.8,6.1-20,17-20C127.1,8.7,133.2,15.8,133.2,28.6 L133.2,28.6z" />
        </g>
      </g>
      <g>
        <path d="M2.6,73l3.3,10.4L9.2,73h2.6L7.2,86.4H4.6L0,73H2.6z" />
        <path d="M23.6,72.7c0.9,0,1.7,0.1,2.5,0.4c0.8,0.3,1.4,0.7,1.9,1.3c1.1,1.2,1.7,2.9,1.7,5.2c0,2.3-0.6,4-1.7,5.3 c-1.1,1.2-2.6,1.7-4.4,1.7c-1.9,0-3.3-0.6-4.4-1.8c-1.1-1.2-1.7-3-1.7-5.2c0-2.3,0.6-4,1.7-5.3C20.2,73.3,21.7,72.7,23.6,72.7z M27.2,79.7c0-1.5-0.3-2.7-1-3.6c-0.6-0.8-1.5-1.3-2.6-1.3c-1.1,0-2,0.4-2.6,1.3c-0.7,0.8-1,2-1,3.6c0,1.5,0.3,2.7,1,3.5 c0.7,0.8,1.5,1.2,2.6,1.2c1.1,0,2-0.4,2.6-1.2C26.8,82.4,27.2,81.3,27.2,79.7z"/>
        <path d="M39.3,84.3h5.6v2.1h-8V73h2.5V84.3z" />
        <path d="M53.6,73v8.4c0,1.1,0.3,1.9,0.8,2.4c0.6,0.5,1.3,0.7,2.2,0.7c0.9,0,1.6-0.2,2.2-0.7c0.6-0.5,0.8-1.3,0.8-2.4V73h2.5v8.4 c0,1.7-0.5,3-1.4,4c-1,0.9-2.3,1.4-4.1,1.4c-1.7,0-3.1-0.5-4.1-1.4c-1-0.9-1.4-2.2-1.4-4V73H53.6z"/>
        <path d="M73.4,73l3.7,8l3.7-8h3.4v13.4h-2.5V76.2l-3.8,8.7h-1.6l-4-9v10.5h-2.5V73H73.4z" />
        <path d="M92.3,73h8.7v2.1h-6.3v3.5h5.9v2.1h-5.9v3.5h6.3v2.1h-8.7V73z"/>
        <path d="M111.4,73l6,9.5V73h2.5v13.4h-2.5l-6.2-9.8v9.8h-2.5V73H111.4z"/>
        <path d="M126.1,73h10.9v2.1h-4.2v11.3h-2.5V75.1h-4.2V73z"/>
        <path d="M145.3,73h3.1l4.4,13.4h-2.6l-0.9-2.9h-5l-1,2.9h-2.6L145.3,73z M144.9,81.7h3.8l-1.9-5.8L144.9,81.7z"/>
        <path d="M161.9,84.3h5.6v2.1h-8V73h2.5V84.3z"/>
      </g>
    </svg>
  );
};

const INSTRUCTIONS = [
  {
    text: 'Take off your shoes and tap "OK" when ready',
    w: 520,
    h: 200,
  },
  {
    text: 'Roll up your pants and stand on the scanner',
    lottie: rollUp,
    w: 460,
    h: 320,
  },
  {
    text: "Hang on. You're almost there",
    w: 500,
    h: 200,
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
      value: 120,
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
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 60,
          top: 40,
          left: 40,
          pointerEvents: 'all',
        }}
        onClick={() => window.location.href = '/18'}
      >
        <VolumentalLogo />
      </div>
      <motion.div
        style={{
          position: 'absolute',
          x: InstructionsPaddingLeft,
          y: h - (INSTRUCTIONS[props.activeStep].h + InstructionsPaddingBottom),
          maxWidth: INSTRUCTIONS[props.activeStep].w,
          width: INSTRUCTIONS[props.activeStep].w,
          height: INSTRUCTIONS[props.activeStep].h,
          background: InstructionsBGColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: 24,
          boxSizing: 'border-box',
          borderRadius: 32,
          fontSize: 28,
          color: '#eee',
          backdropFilter: 'blur(12px)',
          transformOrigin: 'center right',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              textAlign: 'center',
            }}
          >
            { INSTRUCTIONS[props.activeStep].text }
          </div>
          {
            INSTRUCTIONS[props.activeStep].lottie &&
            <div
              style={{
                paddingTop: 24,
              }}
            >
              <LottieAnim anim={INSTRUCTIONS[props.activeStep].lottie} />
            </div>
          }
        </div>
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
        width: 112,
        minWidth: 112,
        maxWidth: 112,
        height: 112,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        fontSize: 28,
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
    <Lottie 
      options={defaultOptions}
      height={144}
      width={144}
    />
  );
}
