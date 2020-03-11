import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import './style/index.less';

interface RadioProps {
  name?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  value?: any;
  onChange?: Function;
}

interface RadioState {
  checked: boolean;
}

class Radio extends React.Component<RadioProps, RadioState> {
  constructor(props: RadioProps) {
    super(props);

    const checked = !!props.checked || !!props.defaultChecked;

    this.state = {
      checked,
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { disabled, onChange } = this.props;
    if (disabled) return;
    if (!('value' in this.props)) {
      this.setState({ checked: e.target.checked });
    }
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  renderRadio = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { children, name, disabled } = this.props;
    const { checked } = this.state;

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

export default Radio;
