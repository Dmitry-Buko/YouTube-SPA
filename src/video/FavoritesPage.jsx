import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteQuery,
  loadQueries,
} from "./store/savedQueriesSlice";
import { useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
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
    <div className="favorites-container">
      <h1 className="favorites-title">Избранное</h1>

      {favorites.length === 0 ? (
        <p className="favorites-empty">У вас пока нет избранных запросов.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((item) => (
            <li
              key={item.id}
              className="favorites-item"
              onClick={() => handleItemClick(item)}
            >
              <span className="favorites-text">{item.name}</span>
              <IconButton
                className="favorites-edit-btn"
                onClick={(e) => handleEdit(item, e)}
                color="primary"
                size="small"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="favorites-delete-btn"
                onClick={(e) => handleDelete(item.id, e)}
                color="error"
                size="small"
              >
                <DeleteForeverIcon />
              </IconButton>
              <SaveQueryModalComp />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoritesPage;
