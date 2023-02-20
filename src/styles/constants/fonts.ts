import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { pxToRem } from 'styles/theme/utils';
import { StyleConstants } from './style';

export const H1 = styled.h1`
  font: normal 700 ${pxToRem(26)}rem / ${pxToRem(32)}rem ${StyleConstants.FONT_FAMILY};
  letter-spacing: 0.5px;

  ${media.md`
        font-size: ${pxToRem(30)}rem;
    `}
`;

export const P = styled.p`
  font: normal 400 ${pxToRem(15)}rem / ${pxToRem(24)}rem ${StyleConstants.FONT_FAMILY};
  letter-spacing: 0.5px;
`;

export const Span = styled.span`
  font: normal 400 1rem / ${pxToRem(17)}rem ${StyleConstants.FONT_FAMILY};
  letter-spacing: 0.5px;
`;

export const Price = styled.span`
  font: normal 400 ${pxToRem(15)}rem / ${pxToRem(17)}rem ${StyleConstants.FONT_FAMILY};
  letter-spacing: 0.2px;
`;

export const LinkFormat = styled.span`
  font: normal 400 1rem / ${pxToRem(17)}rem ${StyleConstants.FONT_FAMILY};
  letter-spacing: 0.5px;
`;

export const TitleFormat = styled.span`
  font: normal 700 15px/18px ${StyleConstants.FONT_FAMILY};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${media.md`
        font-size: 22px;
        line-height: 27px;
    `}
`;
