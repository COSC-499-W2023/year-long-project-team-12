import ImageCrop from './profilepicchanger';
import ImageCropProvider from './ImageCropProvider';

const App = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <ImageCropProvider>
        <ImageCrop />
      </ImageCropProvider>
    </div>
  );
};

export default App;