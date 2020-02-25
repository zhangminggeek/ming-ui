import React from 'react';
import { ConfigConsumer, ConfigContext, ConfigConsumerProps } from './context';
import { SizeType, SizeContextProvider } from './SizeContext';

export { ConfigContext, ConfigConsumer, ConfigConsumerProps };

export interface ConfigProviderProps {
  prefixCls?: string;
  children?: React.ReactNode;
  componentSize?: SizeType;
}

class ConfigProvider extends React.Component<ConfigProviderProps> {
  getPrefixCls = (suffixCls: string, customizePrefixCls?: string) => {
    const { prefixCls = 'ming' } = this.props;

    if (customizePrefixCls) return customizePrefixCls;

    return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
  }

  renderProvider = (context: ConfigConsumerProps) => {
    const {
      componentSize,
      children,
     } = this.props;

    const config: ConfigConsumerProps = {
      ...context,
      getPrefixCls: this.getPrefixCls,
    }

    return (
      <SizeContextProvider size={componentSize}>
        <ConfigContext.Provider value={config}>
          {children}
        </ConfigContext.Provider>
      </SizeContextProvider>
    )
  }

  render() {
    return (
      <ConfigConsumer>
        {context => this.renderProvider(context)}
      </ConfigConsumer>
    )
  }
}

export default ConfigProvider;