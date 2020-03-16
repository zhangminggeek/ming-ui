import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { RadioProps, RadioState, RadioChangeEvent } from './interface';
import './style/index.less';

class Item extends React.Component<RadioProps, RadioState> {
  constructor(props: RadioProps) {
    super(props);

    const checked = !!props.checked || !!props.defaultChecked;

    this.state = {
      checked,
    };
  }

  static getDerivedStateFromProps(props: RadioProps, state: RadioState) {
    if ('checked' in props) {
      return {
        ...state,
        checked: props.checked,
      };
    }
    return null;
  }

  handleChange = (e: RadioChangeEvent) => {
    const { disabled } = this.props;
    if (disabled) return;

    if (!('checked' in this.props)) {
      this.setState({ checked: e.target.checked });
    }
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          ...this.props,
          checked: e.target.checked,
        },
      });
    }
  };

  renderRadio = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { props, state } = this;
    const { children, name, value, disabled } = props;
    const { checked } = state;

    return (
      <label
        className={classNames(getPrefixCls('radio-wrapper'), {
          [`${getPrefixCls('radio-wrapper-disabled')}`]: disabled,
        })}
      >
        <span
          className={classNames(getPrefixCls('radio'), {
            [`${getPrefixCls('radio-checked')}`]: checked,
            [`${getPrefixCls('radio-disabled')}`]: disabled,
          })}
        >
          <input
            type="radio"
            className={getPrefixCls('radio-input')}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={this.handleChange}
          />
          <span className={getPrefixCls('radio-inner')}></span>
        </span>
        <span className={getPrefixCls('radio-content')}>{children}</span>
      </label>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderRadio}</ConfigConsumer>;
  }
}

export default Item;
