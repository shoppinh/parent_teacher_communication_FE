export type Direction = 'left' | 'right' | 'up' | 'down';
export type TransactionsTimeout = {
  exit: number;
  enter: number;
};

export type MenuItem = {
  title: string;
  link: string;
  isProtected: boolean;
  isShowWhenLoggedIn?: boolean;
  isHideWhenLoggedIn?: boolean;
  onLeftSidebar?: boolean;
  onBottomLeftSidebar?: boolean;
  iconClass?: string;
};
