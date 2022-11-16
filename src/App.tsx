import React, { useState } from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import { Icon } from "./components/Icon/icon";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import Transition from "./components/Transition/transition";
// import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
// 添加solid全部图标
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <Button
          size={ButtonSize.Large}
          onClick={() => {
            setShow(!show);
          }}
        >
          Toggle
        </Button>
        <Transition
          in={show}
          timeout={300}
          animation="zoom-in-left"
          addEndListener={() => {}}
        >
          <div>
            <p>
              eidt<code>src/app.vue</code>
            </p>
            <Button btnType={ButtonType.Default}>hello</Button>
          </div>
        </Transition>
        <Icon icon="arrow-down" theme="primary" size="10x" />
        <Menu
          // mode={"vertical"}
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
