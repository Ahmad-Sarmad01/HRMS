import { FC } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Employee } from "../../types/employee";

interface EmployeeDetailModalProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
}

const modalSx = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  maxHeight: "90vh",
  overflowY: "auto" as const,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
  p: 0,
};

const DetailItem: FC<{ label: string; value: string | undefined }> = ({
  label,
  value,
}) => (
  <Box sx={{ width: { xs: "100%", sm: "50%" }, pr: 2, pb: 1 }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1" fontWeight="medium">
      {value || "N/A"}
    </Typography>
  </Box>
);

const EmployeeDetailModal: FC<EmployeeDetailModalProps> = ({
  open,
  onClose,
  employee,
}) => {
  if (!employee) return null;

  const {
    staff_Name,
    staff_Code,
    designation,
    department,
    status,
    branch,
    joining_Date,
    sub_Status,
    employee_Category,
    nationality,
    uaE_Mobile_No,
    personal_Email,
    official_Email,
    arabic_Name,
    upload_Photo_Name,
  } = employee;

  const photoUrl = upload_Photo_Name
    ? `https://mechrisoft.com/mechriapi/uploads/${upload_Photo_Name}`
    : "";

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalSx}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader
            title="Employee Details"
            action={
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            }
            sx={{
              borderBottom: "1px solid #E5E7EB",
              backgroundColor: "#F9FAFB",
            }}
          />

          <CardContent
            sx={{ overflowY: "auto", maxHeight: "calc(90vh - 120px)" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar
                  src={photoUrl}
                  alt={staff_Name}
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <Typography variant="h5" component="div">
                  {staff_Name}
                </Typography>
                <Typography color="text.secondary">{designation}</Typography>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                }}
              >
                <DetailItem label="Staff Code" value={staff_Code} />
                <DetailItem label="Status" value={status} />
                <DetailItem label="Branch" value={branch} />
                <DetailItem label="Joining Date" value={joining_Date} />
                <DetailItem label="Sub Status" value={sub_Status} />
                <DetailItem label="Department" value={department} />
                <DetailItem
                  label="Employee Category"
                  value={employee_Category}
                />
                <DetailItem label="Nationality" value={nationality} />
                <DetailItem label="UAE Mobile No" value={uaE_Mobile_No} />
                <DetailItem label="Personal Email" value={personal_Email} />
                <DetailItem label="Official Email" value={official_Email} />
                <DetailItem label="Arabic Name" value={arabic_Name} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default EmployeeDetailModal;
