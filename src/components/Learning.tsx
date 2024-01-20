import { ArrowBack, VolumeUp } from "@mui/icons-material";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchAudio, translateWords } from "../utils/features";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  getWordsFail,
  getWordsRequest,
  getWordsSuccess,
} from "../redux/slices";
import Loader from "./Loader";

const Learning = () => {
  const [count, setCount] = useState<number>(0);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const audioref = useRef(null);
  const params = useSearchParams()[0].get("language") as langType;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, words, error } = useSelector(
    (state: { root: stateType }) => state.root
  );

  useEffect(() => {
    dispatch(getWordsRequest());
    translateWords(params)
      .then((arr) => {
        dispatch(getWordsSuccess(arr));
      })
      .catch((err) => {
        console.log(err);
        if (error) {
          dispatch(getWordsFail(err));
          dispatch(clearState());
        }
      });
  }, [dispatch, error, params]);

  const backWard = (): void => {
    setCount((prev) => prev - 1);
    setAudioSrc("");
  };

  const nextHandler = (): void => {
    setCount((prev) => prev + 1);
    setAudioSrc('');
  };

  const audioHandler = async () => {
    const player: HTMLAudioElement = audioref.current!;

    if (player) {
      player.play();
    } else {
      const data = await fetchAudio(words[count].word, params);
      setAudioSrc(data);
    }
  };

  if (loading) return <Loader />;

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "1rem",
      }}
    >
      <>
        {audioSrc && <audio src={audioSrc} autoPlay ref={audioref}></audio>}
        <Button onClick={count === 0 ? () => navigate("/") : backWard}>
          <ArrowBack />
        </Button>
      </>
      <Typography textAlign={"center"} fontWeight={"400"} fontSize={"1.2rem"}>
        Learning made easy
      </Typography>
      <Stack
        direction={"row"}
        mt={"1rem"}
        ml={"1rem"}
        spacing={"1rem"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography variant="h4">
          {count + 1}-{words[count]?.meaning}
        </Typography>
        <Typography color={"blue"} variant="h4">
          {words[count]?.word}
        </Typography>
        <Button sx={{ borderRadius: "50%" }} onClick={audioHandler}>
          <VolumeUp />
        </Button>
      </Stack>
      <Button
        onClick={count === 7 ? () => navigate("/quiz") : nextHandler}
        variant="contained"
        sx={{ margin: "3rem 0" }}
        fullWidth
      >
        {count === 7 ? "Test" : "Next"}
      </Button>
    </Container>
  );
};

export default Learning;
