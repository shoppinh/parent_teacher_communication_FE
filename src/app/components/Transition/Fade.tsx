import { animated, config, useSpring } from '@react-spring/web';
import React from 'react';
import { styled } from 'twin.macro';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const AnimatedDiv = styled(animated.div)`
  outline: none;
`;

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  { in: open, children, onEnter, onExited, ...other },
  ref
) {
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    config: { ...config.stiff },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <AnimatedDiv ref={ref} style={style} {...other}>
      {children}
    </AnimatedDiv>
  );
});
