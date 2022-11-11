import React from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
