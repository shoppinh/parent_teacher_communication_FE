import React from 'react';
import { styled } from 'twin.macro';
import { keyframes } from 'styled-components';
import { colors } from '../../../styles/constants/colors';
import { pxToRem } from '../../../styles/theme/utils';

const LoadingWrapper = styled.div`
  margin-top: ${pxToRem(40)}rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PLoadingIndicator = (props: SvgProps) => (
  <LoadingWrapper>
    <Svg viewBox='-24 -24 48 48' small={props.small} lager={props.lager}>
      <Circle cx='0' cy='0' r='20' fill='none' strokeWidth='4'></Circle>
    </Svg>
  </LoadingWrapper>
);

const speed = 1.5;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 150;
    stroke-dashoffset: -24;
  }
  100% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: -124;
  }
`;

interface SvgProps {
  small?: boolean;
  lager?: boolean;
}

const Svg = styled.svg<SvgProps>`
  animation: ${rotate} ${speed * 1.75}s linear infinite;
  height: ${(p) => (p.lager ? '10rem' : p.small ? '1.25rem' : '3rem')};
  width: ${(p) => (p.lager ? '10rem' : p.small ? '1.25rem' : '3rem')};
  transform-origin: center;
`;

const Circle = styled.circle`
  animation: ${dash} ${speed}s ease-in-out infinite;
  stroke: ${(p) => p.theme.primary};
  stroke-linecap: round;
`;
