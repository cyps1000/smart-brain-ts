import { useEffect, useState, ChangeEvent } from "react";

/**
 * Imports Material UI Components
 */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

/**
 * Imports components
 */
import Rank from "../Rank";
import ImageLinkForm from "../ImageLinkForm";
import FaceRecognition from "../FaceRecognition";
import LoadingBar from "../LoadingBar";

/**
 * Imports Hooks
 */
import { useUser, useApiClient, useMessage } from "../../hooks";

/**
 * Imports utils
 */
import { calculateFaceLocation, Payload } from "../../utils";

/**
 * Imports the component styles
 */
import { useStyles } from "./App.styles";

/**
 * Defines the form inputs interface
 */
interface FormInputs {
  input: string;
}

/**
 * Displays the component
 */
const App: React.FC = () => {
  /**
   * Gets the component styles
   */
  const classes = useStyles();

  /**
   * Handles the loading state
   */
  const [loading, setLoading] = useState(false);

  /**
   * Handles the image state
   */
  const [imgUrl, setImgUrl] = useState("");

  /**
   * Handles the boxes state
   */
  const [boxes, setBoxes] = useState<Payload[]>([]);

  /**
   * Handles the input state
   */
  const [formData, setFormData] = useState<FormInputs>({
    input: ""
  });

  /**
   * Handles the user state
   */
  const { user, updateUser } = useUser();

  /**
   * Handles the messages state
   */
  const { dispatchMessage } = useMessage();

  /**
   * Init the useApiClient hook
   */
  const { apiClient } = useApiClient({ withCredentials: true });

  /**
   * Handles displaying the boxes
   */
  const displayFaceBoxes = (boxes: any) => {
    if (boxes) {
      setBoxes(boxes);
    }
  };

  /**
   * Handles detecting the faces
   */
  const detectFaces = async (input: FormInputs) => {
    /**
     * Checks if input is empty
     */
    if (formData.input.length < 1)
      return dispatchMessage({
        message: "Image URL field cannot be empty",
        severity: "error",
        autoClose: 3000
      });

    try {
      setLoading(true);
      const res = await apiClient.put("/api/face-detect", input);

      if (res) {
        const { data } = res;
        setLoading(false);
        updateUser({ ...user, score: data.score });
        displayFaceBoxes(calculateFaceLocation(data));
      }
    } catch (error) {
      if (error.response) {
        const errors = error.response.data.errors;

        setLoading(false);
        dispatchMessage({
          message: errors.map((err: { msg: any }) => err.msg),
          severity: "error",
          autoClose: 3000
        });
      }
    }
  };

  /**
   * Handles submitting the form
   */
  const handleSubmit = () => {
    detectFaces(formData);
  };

  /**
   * Handles the event source when the value is changed
   */
  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBoxes([]);
    setFormData({ input: e.target.value });
  };

  /**
   * Handles updating the image
   */
  useEffect(() => {
    setImgUrl(formData.input);
  }, [formData.input]);

  return (
    <Paper elevation={5} className={classes.paper}>
      <Grid container className={classes.container}>
        <Grid item lg={12}>
          <Rank user={user} />
        </Grid>
        <Grid item lg={12}>
          <ImageLinkForm
            input={formData.input}
            onChange={onChange}
            handleSubmit={handleSubmit}
          />
        </Grid>
        {loading ? (
          <LoadingBar />
        ) : (
          <Grid item lg={12}>
            <FaceRecognition image={imgUrl} boxes={boxes} />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default App;
