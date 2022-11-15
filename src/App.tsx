import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FontAwesomeIcon icon={faCoffee} size={"lg"} />
        <Menu
          mode={"vertical"}
          defalutIndex={"0"}
          defaultOpenSubMenus={["1"]}
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>cool1</MenuItem>
          <SubMenu title={"dropdown"}>
            <MenuItem disabled>cool2</MenuItem>
            <MenuItem>cool3</MenuItem>
          </SubMenu>
        </Menu>
        <Button autoFocus>Hello</Button>
        <Button
          onClick={(e) => {
            alert("haha");
          }}
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
        >
          {" "}
          hello
        </Button>
        <Button
          className="custom"
          btnType={ButtonType.Link}
          size={ButtonSize.Large}
          href="www.baidu.com"
        >
          {" "}
          Link
        </Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Large} disabled>
          {" "}
          Default button
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Large}
          href="www.baidu.com"
          disabled
        >
          {" "}
          Disable Link button
        </Button>
        <Button
          btnType={ButtonType.Link}
          size={ButtonSize.Large}
          href="www.baidu.com"
        >
          {" "}
          Link button
        </Button>
      </header>
    </div>
  );
}

export default App;
