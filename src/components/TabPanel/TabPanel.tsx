/**
 * Imports Material UI components
 */
import Box from "@material-ui/core/Box";

/**
 * Defines the props interface
 */
export interface TabPanelProps {
  index: number;
  value: number;
}

/**
 * Displays the component
 */
const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
