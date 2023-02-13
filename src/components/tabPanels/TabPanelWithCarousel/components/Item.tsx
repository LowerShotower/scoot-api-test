import * as React from 'react';

interface ItemProps {
  name?: string;
  avatar: string;
  text?: string;
  onClick?: () => void;
  active: boolean;
}
const Item = ({
  name,
  avatar,
  active,
  text,
  onClick,
}: ItemProps): JSX.Element => {
  return (
    <div
      className="indicator flex h-auto w-64  cursor-pointer flex-col rounded-sm border-r-amber-300 bg-orange-200 p-2"
      onClick={onClick}
    >
      <span
        className={`${
          active ? 'badge-secondary' : 'badge-primary'
        } badge indicator-item`}
      ></span>
      <div className="flex justify-items-stretch ">
        <div className="avatar mr-2">
          <div className="mask  w-12 rounded-full">
            <img src={`${avatar}`} />
          </div>
        </div>
        <p className="flex-1">{name}</p>
      </div>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Item;
