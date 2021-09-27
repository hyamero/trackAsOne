interface Children {
  children: React.ReactNode;
}

interface NavBtnProps {
  method: string;
  onTap: () => void;
}

interface HeaderProps {
  title?: string;
  desc?: string;
}

interface HomepageButtonProps {
  desc: string;
  link: string;
  Icon: IconType;
}

interface ButtonProps {
  desc: string;
  href?: string;
  type?: button;
  Icon: IconType;
}


interface RoomTaskProps {
  task: TaskList;
  delTask: (id: string) => void;
}


interface RoomNavProps {
  room: RoomList;
}

interface ListRoomsProps {
  room: RoomList;
}

interface NoRoomsProps {
  desc: string;
  href: string;
}


interface InputProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
}

interface WcButtonProps {
  style?: string;
  desc: string;
  Icon: Icon;
  iconSize?: string;
  handleClick?: () => void;
}

interface InfoBtnProps {
  desc: string;
  handleClick: () => void;
}