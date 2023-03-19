import React, { useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { pxToRem } from '../../../../styles/theme/utils';
import { PButton } from '../../PButton';
import { useTranslation } from 'react-i18next';

interface DTableFooterProps {
  range: (number | string)[];
  setPage: (input: number) => void;
  page: number;
  slice: any[];
  total: number;
  start: number;
  end: number;
}

const ButtonGroup = styled.div`
  display: flex;
  ${tw`mt-2`}
`;
const Wrapper = styled.div`
  ${tw`w-full mt-4 flex justify-between items-center flex-col md:flex-row`}
  font-size: ${pxToRem(13)}rem;
`;
const FooterButton = styled(PButton)`
  width: ${pxToRem(38)}rem;
  height: ${pxToRem(38)}rem;
  padding: 0;
  margin: 0 ${pxToRem(4)}rem;
  border: ${pxToRem(1)}rem solid ${(p) => p.theme.background};
  box-shadow: 0 ${pxToRem(4)}rem ${pxToRem(14)}rem rgba(0, 0, 0, 0.2);
  font-weight: 400;
  font-size: ${pxToRem(14)}rem;
`;
const DisplayedText = styled.div`
  font-size: ${pxToRem(13)}rem;
  font-weight: 400;
`;
const LeftNavigationButton = styled(PButton)`
  width: ${pxToRem(100)}rem;
  height: ${pxToRem(38)}rem;
  padding: ${pxToRem(5)}rem ${pxToRem(20)}rem;
  margin-right: ${pxToRem(6)}rem;
  font-size: ${pxToRem(14)}rem;
  font-weight: 400;
`;

const RightNavigationButton = styled(PButton)`
  width: ${pxToRem(100)}rem;
  height: ${pxToRem(38)}rem;
  padding: ${pxToRem(5)}rem ${pxToRem(20)}rem;
  margin-left: ${pxToRem(6)}rem;
  font-size: ${pxToRem(14)}rem;
  font-weight: 400;
`;

const DTableFooter: React.FC<DTableFooterProps> = ({
  range = [],
  setPage,
  page,
  slice,
  total,
  start,
  end,
}) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [page, setPage, slice.length]);

  const renderFooterButton = (range: (number | string)[]) => {
    return range.map((el, index) => {
      if (typeof el === 'number')
        return (
          <FooterButton
            key={index}
            // variant={`${page === el ? 'confirmed' : 'secondary'}`}
            onClick={() => typeof el === 'number' && setPage(el)}
          >
            {el}
          </FooterButton>
        );
      return (
        <div style={{ height: '38px', padding: '5px 20px' }} key={index}>
          {el}
        </div>
      );
    });
  };

  return (
    <Wrapper>
      <DisplayedText>
        {/*<Trans i18nKey={'table.showingDisplay'}>*/}
        {/*  Showing*/}
        {/*  <StartTOend>*/}
        {/*    <>*/}
        {/*      {{ start }} to {{ end }}*/}
        {/*    </>*/}
        {/*  </StartTOend>*/}
        {/*  of {{ total }} results*/}
        {/*</Trans>*/}
      </DisplayedText>
      <ButtonGroup>
        <LeftNavigationButton
          disabled={page === 1}
          // isHidden={range.length < 2}
          variant='secondary'
          onClick={() => page > 1 && setPage(page - 1)}
        >
          {t('table.previous')}
        </LeftNavigationButton>
        {renderFooterButton(range)}
        <RightNavigationButton
          disabled={page === range[range.length - 1]}
          variant='secondary'
          // isHidden={range.length < 2}
          onClick={() => page < range[range.length - 1] && setPage(page + 1)}
        >
          {t('table.next')}
        </RightNavigationButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default DTableFooter;
