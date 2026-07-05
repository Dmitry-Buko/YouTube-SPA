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

const SaveQueryModal = ({ open, onClose, query = "" }) => {
  const [name, setName] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [maxResults, setMaxResults] = useState(25);

  const handleSave = () => {
    if (!name.trim()) return;

    const savedQuery = {
      originalQuery: query,
      name: name.trim(),
      sortBy,
      maxResults,
    };

    console.log("Сохранён запрос:", savedQuery);
    // Здесь можно добавить dispatch в Redux

    onClose();
    // Очистка формы
    setName("");
    setSortBy("");
    setMaxResults(25);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{ textAlign: "center", fontWeight: 600, color: "black" }}
      >
        Сохранить запрос
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          {/* Запрос (только для отображения) */}
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Запрос
            </Typography>
            <TextField
              fullWidth
              value={query || ""}
              size="small"
              variant="outlined"
              slotProps={{
                input: {
                  readOnly: true,
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
                // InputProps={{
                //   type: "number",
                //   min: 5,
                //   max: 50,
                // }}
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
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SaveQueryModal;
