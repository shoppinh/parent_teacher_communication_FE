import styled from 'styled-components/macro';
import { lazyLoad } from 'utils/loadable';
import { PLoadingIndicator } from '../PLoadingIndicatior';

const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PEditor = lazyLoad(
  () => import('./index'),
  (module) => module.default,
  {
    fallback: (
      <LoadingWrapper>
        <PLoadingIndicator />
      </LoadingWrapper>
    ),
  }
);
