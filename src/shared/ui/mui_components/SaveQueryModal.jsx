import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addQuery, updateQuery } from "../../../video/store/savedQueriesSlice";

const SaveQueryModal = ({
  open,
  onClose,
  query = "",
  initialMaxResults = 25,
  initialName = "",
  initialSort = "",
  isEdit = false,
  queryId,
}) => {
  const [name, setName] = useState(initialName);
  const [sortBy, setSortBy] = useState(initialSort);
  const [maxResults, setMaxResults] = useState(initialMaxResults);
  const [originalQuery, setOriginalQuery] = useState(query);
  const modalKey = isEdit ? `edit-${queryId}` : `new-${query}`;

  const dispatch = useDispatch();

  const handleSave = () => {
    if (!name.trim()) return;
    const savedQuery = {
      originalQuery: originalQuery.trim(),
      name: name.trim(),
      sortBy,
      maxResults,
    };

    if (isEdit && queryId) {
      dispatch(
        updateQuery({
          id: queryId,
          ...savedQuery,
        }),
      );
    } else {
      dispatch(addQuery(savedQuery));
    }

    onClose();
    // Очистка формы
    setName("");
    setSortBy("");
    setMaxResults(25);
    setOriginalQuery("");
  };

  const handleChangeOriginalQuery = (e) => {
    if (isEdit) setOriginalQuery(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      onClick={(e) => e.stopPropagation()}
      key={modalKey}
      fullWidth
    >
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: 600, color: "black" }}
      >
        {isEdit ? "Редактировать запрос" : "Сохранить запрос"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Запрос */}
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Запрос {isEdit && "(можно изменить)"}
            </Typography>
            <TextField
              fullWidth
              value={originalQuery || ""}
              size="small"
              variant="outlined"
              onChange={(e) => handleChangeOriginalQuery(e)}
              slotProps={{
                input: {
                  readOnly: !isEdit,
                },
              }}
            />
          </Box>

          {/* Название */}
          <Box>
            <Typography variant="body2" gutterBottom>
              * Название
            </Typography>
            <TextField
              fullWidth
              placeholder="Укажите название"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              error={!name.trim()}
              helperText={!name.trim() ? "Название обязательно" : ""}
            />
          </Box>

          {/* Сортировка */}
          <FormControl fullWidth size="small">
            <InputLabel>Сортировать по</InputLabel>
            <Select
              value={sortBy}
              label="Сортировать по"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="">Без сортировки</MenuItem>
              <MenuItem value="date">Сначала новые</MenuItem>
              <MenuItem value="rating">По высокому рейтингу</MenuItem>
              <MenuItem value="relevance">По релевантности</MenuItem>
              <MenuItem value="title">По алфавиту</MenuItem>
              <MenuItem value="viewCount">По количеству просмотров</MenuItem>
              <MenuItem value="videoCount">
                По количеству видео (для каналов)
              </MenuItem>
            </Select>
          </FormControl>

          {/* Максимальное количество */}
          <Box>
            <Typography variant="body2" gutterBottom>
              Максимальное количество
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
              <Slider
                value={maxResults}
                onChange={(e, newValue) => setMaxResults(newValue)}
                min={0}
                max={50}
                step={1}
                sx={{ flex: 1 }}
              />
              <TextField
                value={maxResults}
                onChange={(e) => setMaxResults(Number(e.target.value))}
                size="small"
                sx={{ width: 80 }}
                slotProps={{
                  input: {
                    type: "number",
                    min: 5,
                    max: 50,
                  },
                }}
              />
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 2 }}>
          Не сохранять
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!name.trim()}
          sx={{ borderRadius: 2 }}
        >
          {isEdit ? "Сохранить изменения" : "Сохранить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveQueryModal;
