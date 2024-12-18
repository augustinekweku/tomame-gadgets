import { PhotoProvider, PhotoView } from "react-photo-view";

type IProps = {
  images: string[];
};

export default function ProductDetailsImagesGallery({
  images,
}: Readonly<IProps>) {
  return (
    <PhotoProvider>
      <div className="flex items-center gap-2">
        {images.map((item, index) => (
          <div key={index} className="w-16 h-12 object-cover">
            <PhotoView src={item}>
              <img src={item} alt="" />
            </PhotoView>
          </div>
        ))}
      </div>
    </PhotoProvider>
  );
}
