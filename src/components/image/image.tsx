import React from 'react';
import classNames from 'classnames';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import Preview from './preview';
import './style/index.less';

type FitType = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';

interface ImageProps {
  className?: string;
  style?: React.CSSProperties;
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
  isPreview: boolean;
}

class Img extends React.Component<ImageProps, ImageState> {
  constructor(props: ImageProps) {
    super(props);

    this.state = {
      isError: false,
      loading: true,
      imageWidth: 0,
      imageHeight: 0,
      isPreview: false,
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

  // check validity of image url before showing
  loadImage = () => {
    const img: HTMLImageElement = new Image();
    img.onload = (e: Event) => this.handleLoad(e, img);
    img.onerror = () => this.handleError();
    img.src = this.props.src;
  };

  changePreviewState = (state: boolean) => {
    // lock screen when previewing
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = state ? 'hidden' : 'auto';
    this.setState({ isPreview: state });
  };

  handlePreview = () => this.props.preview && this.changePreviewState(true);

  renderImage = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      className,
      style,
      src,
      alt,
      fit = 'fill',
      preview = false,
      zIndex = 2000,
      placeholder = '加载中...',
      error = '加载失败',
      ...rest
    } = this.props;
    const { loading, isError, isPreview } = this.state;

    const canPreview: boolean = preview === true;

    const imgClassNames = classNames(getPrefixCls('image'), className);

    const imageStyle: object = {
      objectFit: fit,
      cursor: canPreview ? 'pointer' : 'default',
    };

    return (
      <div className={imgClassNames} style={style} {...rest}>
        {loading && <div className={getPrefixCls('image-placeholder')}>{placeholder}</div>}

        {isError && <div className={getPrefixCls('image-error')}>{error}</div>}

        {!loading && !isError && (
          <img
            src={src}
            className={getPrefixCls('image-inner')}
            style={imageStyle}
            alt={alt}
            onClick={this.handlePreview}
          />
        )}

        {canPreview && (
          <Preview
            src={src}
            show={isPreview}
            zIndex={zIndex}
            changePreviewState={this.changePreviewState}
          />
        )}
      </div>
    );
  };

  componentDidMount() {
    this.loadImage();
  }

  componentWillUnmount() {
    // remove document style before unmounting
    document.documentElement.style.overflow = '';
  }

  render() {
    return <ConfigConsumer>{this.renderImage}</ConfigConsumer>;
  }
}

export default Img;
