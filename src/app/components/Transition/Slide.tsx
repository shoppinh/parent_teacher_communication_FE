import { animated, config, useSpring } from '@react-spring/web';
import React from 'react';
import { styled } from 'twin.macro';
import { zIndex } from '../../../styles/constants/style';
import { Direction } from '../../../types/Layout';

interface FadeProps {
  children?: React.ReactElement;
  className?: string;
  direction?: Direction;
  width?: string;
  // height only for up and down
  height?: string;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

interface WrapperProps {
  direction: Direction;
}

const AnimatedDiv = styled(animated.div)<WrapperProps>`
  height: 100%;
  color: black;
  z-index: ${zIndex.drawer};
  outline: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  top: 0;
  ${(props) =>
    props.direction === 'right' &&
    `
        left: 0;
    `}
  ${(props) =>
    props.direction === 'up' &&
    `
        top: 0;
        left: 0;
        right: 0;
        height: auto;
        max-height: 100%;
    `}
    ${(props) =>
    props.direction === 'left' &&
    `
        right: 0;
    `}
    ${(props) =>
    props.direction === 'down' &&
    `
        top: auto;
        left: 0;
        bottom: 0;
        right: 0;
        height: auto;
        max-height: 100%;
    `}
`;

export const Slide = React.forwardRef<HTMLDivElement, FadeProps>(function Slide(
  {
    in: open,
    className = '',
    children,
    width = '450px',
    height = '200px',
    direction = 'left',
    onEnter,
    onExited,
    ...other
  },
  ref
) {
  const fromConfig =
    direction === 'left' || direction === 'right'
      ? {
          width: '0px',
        }
      : {
          height: '0px',
        };

  const toConfig =
    direction === 'left' || direction === 'right'
      ? {
          width: open ? width : '0px',
        }
      : {
          height: open ? height : '0px',
        };

  const style = useSpring({
    from: fromConfig,
    to: toConfig,
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
    <AnimatedDiv ref={ref} className={className} style={style} direction={direction} {...other}>
      <>{children}</>
    </AnimatedDiv>
  );
});
