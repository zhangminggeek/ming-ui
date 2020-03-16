import React, { Component } from 'react';
import { RadioGroupContextProvider } from './context';
import { RadioChangeEvent } from './interface';
import { ConfigConsumer } from '../config-provider';

interface GroupProps {
  name?: string;
  disabled?: boolean;
  value?: any;
  defaultValue?: any;
  onChange?: (e: RadioChangeEvent) => void;
  children?: React.ReactNode;
}

interface GroupState {
  value?: any;
}

function getCheckedValue(children: React.ReactNode) {
  let value = null;
  let matched = false;
  React.Children.forEach(children, (radio: any) => {
    if (radio && radio.props && radio.props.checked) {
      value = radio.props.value;
      matched = true;
    }
  });
  return matched ? { value } : undefined;
}

export class Group extends Component<GroupProps, GroupState> {
  constructor(props: GroupProps) {
    super(props);
    let value;
    if (props.value !== undefined) {
      value = props.value;
    } else if (props.defaultValue !== undefined) {
      value = props.defaultValue;
    } else {
      const checkedValue = getCheckedValue(props.children);
      value = checkedValue && checkedValue.value;
    }

    this.state = {
      value,
    };
  }

  static getDerivedStateFromProps(props: GroupProps, state: GroupState) {
    if ('value' in props) {
      return {
        ...state,
        value: props.value,
      };
    }
    return null;
  }

  handleChange = (e: RadioChangeEvent) => {
    const { onChange } = this.props;
    if (!('value' in this.props)) {
      this.setState({
        value: e.target.value,
      });
    }
    if (onChange) onChange(e);
  };

  renderGroup = () => {
    return <div>{this.props.children}</div>;
  };

  render() {
    const { name, disabled } = this.props;
    const { value } = this.state;

    return (
      <RadioGroupContextProvider
        value={{
          name,
          disabled,
          value,
          onChange: this.handleChange,
        }}
      >
        <ConfigConsumer>{this.renderGroup}</ConfigConsumer>
      </RadioGroupContextProvider>
    );
  }
}

export default Group;
