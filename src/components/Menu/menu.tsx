import classNames from "classnames";
import React, { createContext, useState } from "react";
import { MenuItemProps } from "./menuItem";

type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  defalutIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
  children?: React.ReactNode;
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

// TODO ?
// 让Menu只接受MenuItem和SubMenu子组件（不是MenuItem和SubMenu只是报警告，但是还是可以传其它类型的组件的）
const renderChildren = (children: React.ReactNode) => {
  return React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<MenuItemProps>;
    const { displayName } = childElement.type;
    // console.log("childElement.type", childElement.type);
    if (displayName === "MenuItem" || displayName === "SubMenu") {
      // 方便MenuItem组件，不用再手动传index -- <MenuItem index={0}>cool1</MenuItem>
      return React.cloneElement(childElement, {
        index: index.toString(),
      });
    } else {
      console.error(
        "Warning: Menu has a child which is not a MenuItem Component"
      );
    }
  });
};

export const MenuContext = createContext<IMenuContext>({ index: "0" });
const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defalutIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setCurrentActive] = useState(defalutIndex);

  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setCurrentActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      {/* ul的子元素可能第一层不是li，所以这里用context */}
      <MenuContext.Provider value={passedContext}>
        {renderChildren(children)}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defalutIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
