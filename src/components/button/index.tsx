import React from 'react';
import styles from './index.css';
import classNames from 'classnames';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import SizeContext, { SizeType } from '../config-provider/SizeContext';

export interface ButtonProps {
  size?: 'large' | 'default';
  prefixCls?: string;
  className?: string;
}

export interface ButtonState {
  loading?: boolean | { delay?: number };
  hasTwoCNChar: boolean;
}

class Button extends React.Component<ButtonProps, ButtonState> {
  static contextType = ConfigContext;

  constructor(props: ButtonProps) {
    super(props);
  }

  render() {
    const { children } = this.props;

    const { getPrefixCls }: ConfigConsumerProps = this.context;

    return (
      <SizeContext.Consumer>
        {size => {
          const {
            prefixCls: customizePrefixCls,
            size: customizeSize,
            className,
          } = this.props;

          let sizeCls = '';
          switch (customizeSize || size) {
            case 'large':
              sizeCls = 'lg';
              break;
            case 'small':
              sizeCls = 'sm';
              break;
            default:
              break;
          }

          const prefixCls = getPrefixCls('btn', customizePrefixCls);

          const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${sizeCls}`]: sizeCls,
          })
          
          return (
            <button
              className={classes}
              style={{
                fontSize: size === 'large' ? 40 : 20,
              }}
            >
              {children}
            </button>
          );
        }}
      </SizeContext.Consumer>
    );
  }
}

export default Button;
