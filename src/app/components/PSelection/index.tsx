import { styled } from 'twin.macro';
import { pxToRem } from '../../../styles/theme/utils';

export const PSelection = styled.select`
  min-width: ${pxToRem(140)}rem;
  background-color: #fff;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px 12px;
  appearance: none;

  border: ${pxToRem(1)}rem solid ${(p) => p.theme.backgroundVariant};
  border-radius: ${pxToRem(10)}rem;
  padding: ${pxToRem(12)}rem ${pxToRem(32)}rem ${pxToRem(12)}rem ${pxToRem(20)}rem;
  outline: none;
  font-weight: 700;
`;
