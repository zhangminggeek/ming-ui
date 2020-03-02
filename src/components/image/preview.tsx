import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import {
  CloseCircleOutlined,
  ExpandOutlined,
  CompressOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

interface ModeInterface {
  name: string;
  icon: string;
}

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen',
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original',
  },
};

interface transformInterface {
  scale: number;
  deg: number;
}
interface PreviewProps {
  src: string;
  show: boolean;
  zIndex: number;
  changePreviewState: Function;
}

interface PreviewState {
  mode: ModeInterface;
  transform: transformInterface;
}

class Preview extends React.Component<PreviewProps, PreviewState> {
  static contextType = ConfigContext;

  constructor(props: PreviewProps) {
    super(props);

    this.state = {
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
      },
    };
  }

  toggleMode = (isContain: boolean) => {
    this.reset();
    this.setState({
      mode: isContain ? Mode.ORIGINAL : Mode.CONTAIN,
    });
  };

  reset = () => {
    this.setState({ transform: { scale: 1, deg: 0 } });
  };

  handleActions = (type: string) => {
    let { scale, deg } = this.state.transform;
    const ZOOM_RARE = 0.2;
    const ROTATE_DEG = 90;
    switch (type) {
      case 'zoomIn':
        scale = parseFloat((scale + ZOOM_RARE).toFixed(3));
        break;
      case 'zoomOut':
        if (scale > 0.2) scale = parseFloat((scale - ZOOM_RARE).toFixed(3));
        break;
      case 'turnLeft':
        deg -= ROTATE_DEG;
        break;
      case 'turnRight':
        deg += ROTATE_DEG;
        break;
      default:
        break;
    }
    this.setState({ transform: { scale, deg } });
  };

  handleClose = () => {
    this.props.changePreviewState(false);
    this.reset();
  };

  render() {
    const { getPrefixCls }: ConfigConsumerProps = this.context;
    const { src, show, zIndex } = this.props;
    const { mode, transform } = this.state;

    const body = document.getElementsByTagName('body')[0];

    const isContain = mode === Mode.CONTAIN;

    const imgCls = getPrefixCls('image-preview-img');

    return ReactDOM.createPortal(
      <div
        className={getPrefixCls('image-preview')}
        style={{ display: show ? 'block' : 'none', zIndex }}
      >
        <div className={getPrefixCls('image-preview-mask')}></div>
        <CloseCircleOutlined
          className={getPrefixCls('image-preview-close')}
          onClick={this.handleClose}
        />
        <div className={getPrefixCls('image-preview-viewer')}>
          <img
            src={src}
            className={classNames(imgCls, {
              [`${imgCls}-${mode.name}`]: mode.name,
            })}
            style={{ transform: `scale(${transform.scale}) rotate(${transform.deg}deg)` }}
            alt=""
          />
        </div>
        <div className={getPrefixCls('image-preview-actions')}>
          <ZoomInOutlined onClick={() => this.handleActions('zoomIn')} />
          <ZoomOutOutlined onClick={() => this.handleActions('zoomOut')} />
          {isContain ? (
            <ExpandOutlined
              onClick={() => {
                this.toggleMode(isContain);
              }}
            />
          ) : (
            <CompressOutlined
              onClick={() => {
                this.toggleMode(isContain);
              }}
            />
          )}
          <RotateLeftOutlined onClick={() => this.handleActions('turnLeft')} />
          <RotateRightOutlined onClick={() => this.handleActions('turnRight')} />
        </div>
      </div>,
      body,
    );
  }
}

export default Preview;
