import axios from "axios";

/**
 * Checks if the input is a valid image
 */
export const isImage = async (image: string) => {
  /**
   * Checks if there is an image
   */
  if (!image) return false;

  try {
    /**
     * Handles the get req to the image URL
     */
    const res = await axios.get(image);

    /**
     * Checks if there's a response
     */
    if (!res) return false;

    /**
     * Checks the response's status code
     */
    if (!(res.status >= 200 && res.status < 300)) return false;

    /**
     * Checks for Headers
     */
    if (!res.headers) return false;

    /**
     * Checks for content-type
     */
    const contentType = res.headers["content-type"];
    if (!contentType) return false;

    // eslint-disable-next-line
    return contentType.search(/^image\//) != -1;
  } catch (error) {
    return false;
  }
};
