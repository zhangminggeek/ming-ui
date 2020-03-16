import React from 'react';
import Item from './item';
import RadioGroup from './group';
import { ConfigConsumer } from '../config-provider';
import RadioGroupContext from './context';
import { RadioProps, RadioState } from './interface';
import './style/index.less';

class Radio extends React.Component<RadioProps, RadioState> {
  static Group: typeof RadioGroup;

  static contextType = RadioGroupContext;

  renderRadio = () => {
    const { props, context } = this;

    const radioProps = { ...props };

    if (context) {
      radioProps.name = context.name;
      radioProps.checked = props.value === context.value;
      radioProps.disabled = props.disabled || context.disabled;
      radioProps.onChange = context.onChange;
    }

    return <Item {...radioProps} />;
  };

  render() {
    return <ConfigConsumer>{this.renderRadio}</ConfigConsumer>;
  }
}

export default Radio;
