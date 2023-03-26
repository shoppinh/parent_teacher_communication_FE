import React, { useMemo } from 'react';
import { pxToRem } from '../../../../../styles/theme/utils';
import { StyleConstants } from '../../../../../styles/constants/style';
import tw, { styled } from 'twin.macro';
import { media } from '../../../../../styles';
import { PButton } from '../../../../components/PButton';
import { PIcon } from 'app/components/PIcon';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../../store/selectors/session';
import { ConstantRoles } from '../../../../../utils/constants';

interface Props {
  onRightBarClick: () => void;
  onLeftBarClick: () => void;
  headerTitle: string;
}

interface NavigationIconProps {
  isActive?: boolean;
}

const Container = styled.div`
  height: ${pxToRem(StyleConstants.HEADER_HEIGHT)}rem;
  background-color: ${(p) => p.theme.background};
  width: 100%;
  border-bottom: ${pxToRem(1)}rem solid ${(p) => p.theme.borderLight};
`;
const NavigationButton = styled(PButton)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  && {
    background-color: ${(p) => p.theme.background};
  }
`;
const MobileStyledButton = styled(NavigationButton)`
  ${tw`p-3`}
  ${media.md`
    display: none;
  `}
`;
const StyledIcon = styled(PIcon)<NavigationIconProps>`
  font-size: ${pxToRem(25)}rem;
  color: ${(p) => (p.isActive ? p.theme.backgroundVariant : p.theme.placeholder)};
  margin: 0 ${pxToRem(10)}rem;
`;
const MenuStyledIcon = styled(PIcon)`
  font-size: ${pxToRem(20)}rem;
  color: ${(p) => p.theme.text};
`;
const HeaderTitle = styled.p`
  font-size: ${pxToRem(20)}rem;
  font-weight: 700;
  padding-left: ${pxToRem(12)}rem;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavigationGroup = styled.div`
  display: none;
  margin-top: ${pxToRem(10)}rem;
  ${media.md`
    display: block;
  `}
  padding: 0 ${pxToRem(12)}rem;
`;
const ButtonGroup = styled.div`
  display: none;
  ${media.md`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;
const DesktopStyledButton = styled(NavigationButton)`
  display: none;
  padding-top: ${pxToRem(10)}rem;
  ${media.md`
    display: block;
  `}
`;
const Header: React.FC<Props> = ({ onRightBarClick, onLeftBarClick, headerTitle }) => {
  const currentUser = useSelector(getUser);
  const navigationList = useMemo(() => {
    if (currentUser?.roleId === ConstantRoles.TEACHER)
      return [
        {
          id: 'teacherHome',
          url: '/teacher',
          iconName: 'partei-file-text',
        },
        {
          id: 'teacherEvent',
          url: '/teacher-event',
          iconName: 'partei-calendar',
        },
        {
          id: 'teacherManagement',
          url: '/teacher-management',
          iconName: 'partei-users',
        },
        {
          id: 'teacherSetting',
          url: '',
          iconName: 'partei-cog',
          action: () => alert('on click success'),
        },
      ];
    else if (currentUser?.roleId === ConstantRoles.PARENT)
      return [
        {
          id: 'parentHome',
          url: '/parent',
          iconName: 'partei-file-text',
        },
        {
          id: 'parentEvent',
          url: '/parent-event',
          iconName: 'partei-calendar',
        },
        {
          id: 'parentManagement',
          url: '/parent-management',
          iconName: 'partei-users',
        },
        {
          id: 'teacherSetting',
          url: '',
          iconName: 'partei-cog',
          action: () => alert('on click success'),
        },
      ];
    else
      return [
        {
          id: 'adminHome',
          url: '/admin',
          iconName: 'partei-file-text',
        },
        {
          id: 'adminManagement',
          url: '/admin-management',
          iconName: 'partei-users',
        },
        {
          id: 'adminSetting',
          url: '',
          iconName: 'partei-cog',
          action: () => alert('on click success'),
        },
      ];
  }, [currentUser?.roleId]);
  const location = useLocation();
  return (
    <Container>
      <HeaderWrapper>
        <MobileStyledButton onClick={onLeftBarClick}>
          <MenuStyledIcon className='partei-menu' />
        </MobileStyledButton>
        <HeaderTitle>{headerTitle}</HeaderTitle>
        <MobileStyledButton onClick={onRightBarClick}>
          <MenuStyledIcon className='partei-bubbles3' />
        </MobileStyledButton>
      </HeaderWrapper>
      <ButtonGroup>
        <NavigationGroup>
          {navigationList.map((navigationItem) =>
            navigationItem?.action ? (
              <NavigationButton onClick={navigationItem?.action} key={navigationItem.id}>
                <StyledIcon className={navigationItem.iconName} />
              </NavigationButton>
            ) : (
              <Link to={navigationItem.url} key={navigationItem.id}>
                <StyledIcon
                  className={navigationItem.iconName}
                  isActive={navigationItem.url === location.pathname}
                />
              </Link>
            )
          )}
        </NavigationGroup>
        <DesktopStyledButton>
          <StyledIcon className='partei-bell' />
        </DesktopStyledButton>
      </ButtonGroup>
    </Container>
  );
};

export default Header;
