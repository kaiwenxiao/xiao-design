import React, {
  FunctionComponent,
  ReactNode,
  useContext,
  useState,
} from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import { Icon } from "../Icon/icon";
import { CSSTransition } from "react-transition-group";
import Transition from "../Transition/transition";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as string[];

  const isOpened =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;

  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode === "horizontal"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = (children: ReactNode) => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": menuOpen,
    });
    console.log("subMenuClasses", subMenuClasses);
    // React.Children.map - 只对可遍历的Children进行遍历
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem Component"
        );
      }
    });
    return (
      <Transition
        in={menuOpen}
        timeOut={300}
        animation="zoom-in-top"
        addEndListener={() => {}}
      >
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
      // <CSSTransition
      //   in={menuOpen}
      //   timeout={300}
      //   classNames="zoom-in-top"
      //   appear
      //   unmountOnExit
      // >
      //   <ul className={subMenuClasses}>{childrenComponent}</ul>
      // </CSSTransition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren(children)}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
