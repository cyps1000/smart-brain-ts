/**
 * Defines the data's interface
 */
export interface Payload {
  outputs: {
    data: {
      regions: {
        region_info: {
          bounding_box: {
            bottom_row: number;
            left_col: number;
            right_col: number;
            top_row: number;
          };
        };
      }[];
    };
  }[];
}

/**
 * Handles calculating the face location
 */
export const calculateFaceLocation = (data: Payload) => {
  if (data && data.outputs) {
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      const image = document.getElementById("inputImage") as HTMLCanvasElement;
      const width = Number(image!.width);
      const height = Number(image!.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height
      };
    });
  }
  return;
};
