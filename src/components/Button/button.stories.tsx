import React from "react";
import { addDecorator, storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Button, { ButtonSize, ButtonType } from "./button";
// import { withInfo } from "@storybook/addon-info";

const defaultButton = () => (
  <Button onClick={action("clicked")}>default button</Button>
);

// const styles: React.CSSProperties = {
//   textAlign: 'center'
// }

// const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>

const buttonWithSize = () => (
  <>
    <Button size={ButtonSize.Large}>large button</Button>
    <Button size={ButtonSize.Small}>small button</Button>
  </>
);

const buttonWithType = () => (
  <>
    <Button btnType={ButtonType.Primary}>primary button</Button>
    <Button btnType={ButtonType.Danger}>danger button</Button>
    <Button btnType={ButtonType.Link} href="http://baidu.com">
      link button
    </Button>
  </>
);

storiesOf("Button Component", module)
  // .addDecorator(CenterDecorator)
  // .addDecorator(withInfo)
  // .addParameters({
  //   info: {
  //     // 这里是通过addon/info去生成文档，也可以在组件里的注释通过addon/docgen生成文档。如果用方式2，事例名称必须与组件名称一样，即Button
  //     // text: `
  //     //   this is a very nice component
  //     //   ## this is a header
  //     //   ~~~js
  //     //   const a = 'hello'
  //     //   ~~~
  //     // `,
  //     inline: true,
  //   },
  // })
  .add("Button", defaultButton)
  .add("不同尺寸的Button", buttonWithSize)
  // .add("不同尺寸的Button", buttonWithSize, { info: { inline: false } })
  .add("不同类型的Button", buttonWithType);
