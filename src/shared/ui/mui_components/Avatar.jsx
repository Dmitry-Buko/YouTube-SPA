import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";

export default function LetterAvatars() {
  const username = localStorage.getItem('userEmail')
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{username[0].toUpperCase()}</Avatar>
    </Stack>
  );
}
