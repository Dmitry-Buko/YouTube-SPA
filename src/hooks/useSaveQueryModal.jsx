import { useCallback, useState } from "react";
import SaveQueryModal from "../shared/ui/mui_components/SaveQueryModal";

export const useSaveQueryModal = () => {
  const [open, setOpen] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const openModal = useCallback((props = {}) => {
    setModalProps(props);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  const SaveQueryModalComp = () => (
    <SaveQueryModal open={open} onClose={closeModal} {...modalProps} />
  );

  return {
    openModal,
    closeModal,
    SaveQueryModalComp,
  };
};
