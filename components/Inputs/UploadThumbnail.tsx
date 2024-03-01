import React from "react";
import ImageIcon from "@/components/Icons/ImageIcon";
import UploadIcon from "@/components/Icons/UploadIcon";
import DeleteIcon from "@/components/Icons/DeleteIcon";

type UploadThumbnailProps = {
  id?: string;
  changeThumbnail?: (file: File) => void;
  thumbnailURL?: string;
  removeThumbnail?: () => void;
};

const UploadThumbnail = ({
  id = "",
  changeThumbnail = () => {},
  thumbnailURL = "",
  removeThumbnail = () => {},
}: UploadThumbnailProps) => {
  return (
    <section className="grid h-full grid-rows-autoX1 gap-4">
      <div>
        <p>Upload Thumbnail</p>
      </div>
      <div className="flex gap-4">
        <div className="relative flex aspect-square h-full items-center justify-center rounded border-2 border-dark-500 bg-dark-100 fill-dark-500">
          {thumbnailURL ? (
            <div
              className="absolute flex h-full w-full flex-col justify-end bg-cover bg-center"
              style={{ backgroundImage: `url(${thumbnailURL})` }}
            >
              <button
                className="flex h-8 w-8 items-center justify-center rounded-tr border-r-2 border-t-2 border-dark-500 bg-dark-100 hover:border-red hover:bg-red"
                onClick={removeThumbnail}
              >
                <DeleteIcon className="h-4 fill-white" />
              </button>
            </div>
          ) : (
            <ImageIcon className="h-14 w-14" />
          )}
        </div>
        <div className="flex w-full items-center justify-center">
          <label
            htmlFor={`dropzone-file-${id}`}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dark-500 bg-dark-100 fill-dark-500 outline outline-2 outline-transparent transition-all duration-300 ease-in-out hover:bg-dark-300 hover:fill-grey focus-visible:outline-grey"
          >
            <UploadIcon className="h-14 w-14" />
            <h5>JPG or PNG</h5>
            <p className="text-xs">PNG or JPG</p>
            <input
              id={`dropzone-file-${id}`}
              type="file"
              accept="image/png, image/jpeg"
              className="hidden"
              onChange={changeThumbnail}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default UploadThumbnail;
