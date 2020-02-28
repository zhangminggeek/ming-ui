import React from 'react';

interface PreviewProps {
  src?: string,
}

interface PreviewState {

}

class Preview extends React.Component<PreviewProps, PreviewState> {
  constructor(props: PreviewProps) {
    super(props);
  }

  render() {
    const {
      src
    } = this.props;

    return (
      <div>
        <div></div>
        <img src={src} alt=""/>
      </div>
    )
  }
}

export default Preview;