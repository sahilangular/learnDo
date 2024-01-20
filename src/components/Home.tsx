import { Button, Container, Stack, Typography } from "@mui/material";
import {  useNavigate } from "react-router-dom";

const languages = [
  {
    name: "Japanese",
    code: "ja",
  },
  {
    name: "Hindi",
    code: "Hi",
  },
  {
    name: "Spanish",
    code: "es",
  },
  {
    name: "French",
    code: "Fr",
  },
];

const Home = () => {
  const navigate = useNavigate()
  const languageHandler = (language: string): void => {
    navigate(`/learn?language=${language}`)
  };
  return (
    <Container maxWidth={"sm"}>
      <Typography variant="h4" p={"2rem"} textAlign={"center"}>
        Welcome! begin your journey of <strong>Leaning</strong>
      </Typography>
      <Stack
        direction={"row"}
        spacing={"2rem"}
        p={"2rem"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {languages.map((item, i) => (
          <Button key={i} onClick={()=>languageHandler(item.code)} variant="contained">
            {item.name}
          </Button>
        ))}
      </Stack>

      <Typography textAlign={"center"} fontSize={'1rem'} fontWeight={'600'}>
        Choose one language from above
      </Typography>
    </Container>
  );
};

export default Home;
