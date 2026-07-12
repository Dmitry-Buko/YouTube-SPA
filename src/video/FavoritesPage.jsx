import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteQuery, loadQueries } from "./store/savedQueriesSlice";
import { useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import {
  IconButton,
  Container,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSaveQueryModal } from "../hooks/useSaveQueryModal";

function FavoritesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openModal, SaveQueryModalComp } = useSaveQueryModal();
  const favorites = useSelector((state) => state.savedQueries.queries);

  useEffect(() => {
    dispatch(loadQueries());
  }, [dispatch]);

  const handleItemClick = (item) => {
    navigate("/search", {
      state: {
        searchTarget: item.originalQuery,
        order: item.sortBy || "",
        maxResults: item.maxResults || 12,
      },
    });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    dispatch(deleteQuery(id));
  };

  const handleEdit = (item, e) => {
    e.stopPropagation();
    openModal({
      query: item.originalQuery,
      initialName: item.name,
      initialSort: item.sortBy,
      initialMaxResults: item.maxResults,
      isEdit: true,
      queryId: item.id,
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography variant="h3" sx={{ color: "#ffffff", fontWeight: 700 }}>
          Избранное
        </Typography>
      </Box>

      {favorites.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "#e0e0e0", mb: 1 }}>
            У вас пока нет избранных запросов.
          </Typography>
          <Typography variant="body2" sx={{ color: "#888" }}>
            Сохраняйте поисковые запросы, чтобы они появились здесь
          </Typography>
        </Box>
      ) : (
        <Box sx={{ bgcolor: "#1a1a1a", borderRadius: 3, p: 2 }}>
          <List>
            {favorites.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem
                  onClick={() => handleItemClick(item)}
                  sx={{
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#252525" },
                    py: 2,
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    slotProps={{
                      primary: {
                        sx: { color: "#e0e0e0", fontWeight: 500 },
                      },
                    }}
                  />

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                      onClick={(e) => handleEdit(item, e)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleDelete(item.id, e)}
                      color="error"
                      size="small"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </Box>
                </ListItem>
                {index < favorites.length - 1 && (
                  <Divider sx={{ borderColor: "#333" }} />
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      )}

      <SaveQueryModalComp />
    </Container>
  );
}

export default FavoritesPage;
