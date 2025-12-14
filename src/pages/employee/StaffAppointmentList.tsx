import { FC, useState } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedAppointment } from "../../store/slices/appointmentSlice";
import { AppointmentList } from "../../component/appointment";

const StaffAppointmentList: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

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

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "stretch", md: "center" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
        }}
      >
        <Box
          component="h1"
          sx={{
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            fontWeight: 600,
            color: "var(--primary)",
            m: 0,
          }}
        >
          Appointment Register
        </Box>
      </Box>

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
