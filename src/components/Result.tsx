import {
  Button,
  Container,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearState } from "../redux/slices";
import { useNavigate } from "react-router-dom";
import { countMatchingElements } from "../utils/features";

const Result = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { words, result } = useSelector(
    (state: { root: stateType }) => state.root
  );

  const correctAns = countMatchingElements(result,words.map((i)=>i.meaning));

  const percentage = (correctAns / words.length) * 100;

  const resetHandler = (): void => {
    dispatch(clearState());
    navigate("/");
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h3" color={"primary"} m={"2rem 0"}>
        Result
      </Typography>
      <Typography variant="h6" m={"1rem"}>
        You got {correctAns} right out of {words?.length}
      </Typography>
      <Stack direction={"row"} justifyContent={"space-evenly"}>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Yours Ans
          </Typography>
          <List>
            {result.map((i, index) => (
              <ListItem key={index}>
                {index + 1} - {i}
              </ListItem>
            ))}
          </List>
        </Stack>
        <Stack>
          <Typography m={"1rem 0"} variant="h5">
            Correct Ans
          </Typography>
          <List>
            {words?.map((i, index) => (
              <ListItem key={index}>
                {index + 1} - {i.meaning}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
      <Typography
        m={"1rem"}
        variant="h5"
        color={percentage > 50 ? "green" : "red"}
      >
        {percentage > 50 ? "Pass" : "Fail"}
      </Typography>
      <Button
        sx={{
          margin: "1rem",
        }}
        variant="contained"
        onClick={resetHandler}
      >
        Reset
      </Button>
    </Container>
  );
};

export default Result;
