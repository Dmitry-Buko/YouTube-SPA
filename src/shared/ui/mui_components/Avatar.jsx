import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
import { useSelector } from "react-redux";

export default function LetterAvatars() {
  const username = useSelector((state) => state.auth.email);
  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>{username[0]}</Avatar>
    </Stack>
  );
}
