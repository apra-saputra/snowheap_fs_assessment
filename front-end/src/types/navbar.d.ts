type ItemProps = {
  item: MenuType;
  setOpen: (params: boolean) => void;
};

type MenuType = {
  child?: ChildMenuType[];
} & ChildMenuType;

type ChildMenuType = {
  icon: any;
  name: string;
  path: string;
};

type NavbarProps = {};

type ChildItemProps = {
  className?: string | undefined;
  handleAction: (params: string) => void;
} & ChildMenuType;
