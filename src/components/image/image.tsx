import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

type FitType = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

interface ImageProps {
  src?: string,
  alt?: string,
  fit?: FitType,
  preview?: boolean,
  zIndex?: number,
}

interface ImageState {

}

class Image extends React.Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);
  }

  renderImage = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      src,
      alt,
      fit = 'none',
    } = this.props;

    const className = classNames(getPrefixCls('image'));

    const imageStyle: object = {
      objectFit: fit,
    }
    
    return (
      <div>
        <img
          src={src}
          className={className}
          style={imageStyle}
          alt={alt}
        />
      </div>
    )
  }

  render() {
    return <ConfigConsumer>{this.renderImage}</ConfigConsumer>
  }
}

export default Image;