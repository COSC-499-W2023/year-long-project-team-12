import { useImageCropContext } from './ImageCropProvider';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import classNames from 'classnames';

export const ZoomSlider = ({ className }) => {
  const { zoom, setZoom, handleZoomIn, handleZoomOut, max_zoom, min_zoom, zoom_step } =
    useImageCropContext();

  return (
    <div className={classNames(className, 'flex items-center justify-center gap-2')}>
      <button className="p-1" onClick={handleZoomOut}>
        <ZoomOutIcon className="text-gray-400 w-4" />
      </button>
      <input
        type="range"
        name="volju"
        min={min_zoom}
        max={max_zoom}
        step={zoom_step}
        value={zoom}
        onChange={e => {
          setZoom(Number(e.target.value));
        }}
      />
      <button className="p-1" onClick={handleZoomIn}>
        <ZoomInIcon className="text-gray-400 w-4" />
      </button>
    </div>
  );
};

export const RotationSlider = ({ className }) => {
  const {
    rotation,
    setRotation,
    max_rotation,
    min_rotation,
    rotation_step,
    handleRotateAntiCw,
    handleRotateCw
  } = useImageCropContext();

  return (
    <div className={classNames(className, 'flex items-center justify-center gap-2')}>
      <button className="p-1" onClick={handleRotateAntiCw}>
        <RotateLeftIcon className="text-gray-400 w-4" />
      </button>
      <input
        type="range"
        name="volju"
        min={min_rotation}
        max={max_rotation}
        step={rotation_step}
        value={rotation}
        onChange={e => {
          setRotation(Number(e.target.value));
        }}
      />
      <button className="p-1" onClick={handleRotateCw}>
        <RotateRightIcon className="text-gray-400 w-4" />
      </button>
    </div>
  );
};