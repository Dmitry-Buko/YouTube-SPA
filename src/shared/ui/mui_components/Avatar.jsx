import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";

export default function LetterAvatars() {
  const username = localStorage.getItem('userEmail')
  const letter = username[0].toUpperCase() || null
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{letter}</Avatar>
    </Stack>
  );
}
