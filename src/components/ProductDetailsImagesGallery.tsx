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
          <div key={index} className="w-[70px] h-[70px] object-cover">
            <PhotoView src={item}>
              <img
                src={item}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </PhotoView>
          </div>
        ))}
      </div>
    </PhotoProvider>
  );
}
