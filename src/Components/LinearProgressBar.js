import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 20,
  borderRadius: 24,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#eaeaea",
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: "24px",
    backgroundColor: "#20C997",
  },
}));

export default function LinearProgressBar({ value }) {
  return <BorderLinearProgress variant="determinate" value={value} />;
}
