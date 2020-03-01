import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Preview from './preview';
import { StepBackwardOutlined } from '@ant-design/icons';
import './style/index.less';

type FitType = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

interface ImageProps {
  src: string;
  alt?: string;
  fit?: FitType;
  preview?: boolean;
  zIndex?: number;
  placeholder?: React.ReactNode;
  error?: React.ReactNode;
}

interface ImageState {
  isError: boolean;
  loading: boolean;
  imageWidth: number;
  imageHeight: number;
}

class Img extends React.Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);

    this.state = {
      isError: false,
      loading: true,
      imageWidth: 0,
      imageHeight: 0,
    };
  }

  handleLoad = (e: Event, img: HTMLImageElement) => {
    this.setState({
      loading: false,
      imageWidth: img.width,
      imageHeight: img.height,
    });
  };

  handleError = () => {
    this.setState({
      isError: true,
      loading: false,
    });
  };

  loadImage = () => {
    const img: HTMLImageElement = new Image();
    img.onload = (e: Event) => this.handleLoad(e, img);
    img.onerror = () => this.handleError();
    img.src = this.props.src;
  };

  renderImage = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { src, alt, fit = 'fill', preview = false, placeholder, error, ...rest } = this.props;
    const { loading, isError } = this.state;

    const canPreview: boolean = preview === true;

    const imageStyle: object = {
      objectFit: fit,
      cursor: canPreview ? 'pointer' : 'default',
    };

    return (
      <div className={getPrefixCls('image')} {...rest}>
        {loading && (
          <div className={getPrefixCls('image-placeholder')}>{placeholder || '加载中...'}</div>
        )}

        {isError && <div className={getPrefixCls('image-error')}>{error || '加载失败'}</div>}

        {!loading && !isError && (
          <img src={src} className={getPrefixCls('image-inner')} style={imageStyle} alt={alt} />
        )}

        {canPreview && <Preview src={src} />}
      </div>
    );
  };

  componentDidMount() {
    this.loadImage();
  }

  render() {
    return <ConfigConsumer>{this.renderImage}</ConfigConsumer>;
  }
}

export default Img;
