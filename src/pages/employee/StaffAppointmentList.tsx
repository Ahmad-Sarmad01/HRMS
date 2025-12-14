import { FC, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedAppointment } from "../../store/slices/appointmentSlice";
import {
  AppointmentListActionBar,
  AppointmentSearch,
} from "../../component/appointment";
import { AppointmentList } from "../../component/appointment";

const StaffAppointmentList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleSelectAppointment = (appointment: any) => {
    console.log("Selected appointment:", appointment);
    dispatch(setSelectedAppointment(appointment));
    navigate("/employees/appointment");
  };

  const handleError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePillButtonClick = (index: number, title?: string) => {
    setActiveBtn(index);

    if (title === "New") {
      navigate("/employees/appointment");
    } else if (title === "Search") {
      setShowSearch(!showSearch);
    }
  };

  return (
    <Box>
      <AppointmentListActionBar
        activeBtn={activeBtn}
        onButtonClick={handlePillButtonClick}
      />

      <AppointmentSearch
        onSelect={handleSelectAppointment}
        isVisible={showSearch}
      />

      <AppointmentList
        onSelect={handleSelectAppointment}
        onError={handleError}
        isVisible={true}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StaffAppointmentList;
