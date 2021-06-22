/**
 * Imports Material UI components
 */
import Box from "@material-ui/core/Box";

/**
 * Imports the component styles
 */
import { useStyles } from "./FaceRecognition.styles";

/**
 * Imports boxes interface
 */
import { Payload } from "../../utils";

/**
 * Defines the props interface
 */
export interface FaceRecognitionProps {
  image: string;
  boxes: Payload[];
}

/**
 * Displays the component
 */
const FaceRecognition: React.FC<FaceRecognitionProps> = (props) => {
  const { image, boxes } = props;

  /**
   * Gets the component styles
   */
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box style={{ position: "relative" }}>
        {image && (
          <img className={classes.media} src={image} id="inputImage" alt="" />
        )}
        {boxes.map((box: any, index: number) => {
          return (
            <Box
              key={index}
              className={classes.boundingBox}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol
              }}
            ></Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default FaceRecognition;
