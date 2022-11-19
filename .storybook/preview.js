import '../src/styles/index.scss'
import { withInfo } from "@storybook/addon-info";
import { addDecorator, addParameters } from '@storybook/react';


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const styles = {
  // textAlign: 'center',
  padding: '20px 40px'
}

// 全局decorators，改变样式，而不是在每个story里面addDecorator，这个变量一定要命名为decorators
export const decorators = [
  (Story, context) => (
    <div style={styles}>
      <h3>组件演示</h3>
      <Story />
    </div>
  ),
];

// 全局控制
addDecorator(withInfo)
addParameters({ info: { inline: true, header: false } }) 