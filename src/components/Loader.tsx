import { CircularProgress, Stack } from "@mui/material"

const Loader = () => {
  return (
    <Stack direction="row" justifyContent={'center'} alignItems={'center'} position={'relative'} top={'16rem'}>
      <CircularProgress color="error" size={'6rem'} />
    </Stack>
  )
}

export default Loader