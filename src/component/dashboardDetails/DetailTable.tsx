import { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  CardType,
  Employee,
  ExpiredDocument,
  VisaExpiry,
  LeaveRequest,
  PayrollPending,
  WPSFile,
} from "../../data/dashboardData";

interface DetailTableProps {
  cardType: CardType;
  data: any[];
}

const DetailTable: FC<DetailTableProps> = ({ cardType, data }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "error";
      case "Expiring Soon":
        return "warning";
      case "Pending":
        return "warning";
      case "Active":
        return "success";
      case "Processing":
        return "info";
      case "Submitted":
      case "Completed":
      case "Approved":
        return "success";
      case "Rejected":
      case "Inactive":
        return "error";
      case "On Leave":
        return "default";
      default:
        return "default";
    }
  };

  const renderTableHeaders = () => {
    switch (cardType) {
      case "Total Employees":
        return (
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Department
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Position
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              Join Date
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Status
            </TableCell>
          </TableRow>
        );
      case "Documents Expiring Soon":
        return (
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Document
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Employee
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Expiry
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Status
            </TableCell>
          </TableRow>
        );
      case "Visa Expiry This Month":
        return (
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Employee
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Visa Type
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              Issue Date
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Expiry Date
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Status
            </TableCell>
          </TableRow>
        );
      case "Pending Leave Requests":
        return (
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Employee
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Leave Type
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              From - To
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              Days
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Status
            </TableCell>
          </TableRow>
        );
      case "Payroll Pending":
        return (
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Employee
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Department
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Amount
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              Month
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Status
            </TableCell>
          </TableRow>
        );
      case "WPS Pending Files":
        return (
          <TableRow sx={{ backgroundColor: "#FAFAFA" }}>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              File Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              Month
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              Employees
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Total Amount
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 600,
                color: "#011527",
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              Status
            </TableCell>
          </TableRow>
        );
      default:
        return null;
    }
  };

  const renderTableRows = () => {
    switch (cardType) {
      case "Total Employees":
        return (data as Employee[]).map((row) => (
          <TableRow
            key={row.id}
            sx={{
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.05)" },
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <TableCell
              sx={{
                color: "#011527",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.name}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              {row.department}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.position}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              {row.joinDate}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              <Chip
                label={row.status}
                color={getStatusColor(row.status)}
                size={isMobile ? "small" : "medium"}
                sx={{
                  fontWeight: 600,
                  "& .MuiChip-label": { px: { xs: 0.5, sm: 1 } },
                }}
              />
            </TableCell>
          </TableRow>
        ));
      case "Documents Expiring Soon":
        return (data as ExpiredDocument[]).map((row) => (
          <TableRow
            key={row.id}
            sx={{
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.05)" },
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <TableCell
              sx={{
                color: "#011527",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.docName}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              {row.employee}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.expiryDate}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              <Chip
                label={row.status}
                color={getStatusColor(row.status)}
                size={isMobile ? "small" : "medium"}
                sx={{
                  fontWeight: 600,
                  "& .MuiChip-label": { px: { xs: 0.5, sm: 1 } },
                }}
              />
            </TableCell>
          </TableRow>
        ));
      case "Visa Expiry This Month":
        return (data as VisaExpiry[]).map((row) => (
          <TableRow
            key={row.id}
            sx={{
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.05)" },
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <TableCell
              sx={{
                color: "#011527",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.employee}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              {row.visaType}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              {row.issueDate}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.expiryDate}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              <Chip
                label={row.status}
                color={getStatusColor(row.status)}
                size={isMobile ? "small" : "medium"}
                sx={{
                  fontWeight: 600,
                  "& .MuiChip-label": { px: { xs: 0.5, sm: 1 } },
                }}
              />
            </TableCell>
          </TableRow>
        ));
      case "Pending Leave Requests":
        return (data as LeaveRequest[]).map((row) => (
          <TableRow
            key={row.id}
            sx={{
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.05)" },
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <TableCell
              sx={{
                color: "#011527",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.employee}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              {row.leaveType}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >{`${row.fromDate} to ${row.toDate}`}</TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              {row.days}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              <Chip
                label={row.status}
                color={getStatusColor(row.status)}
                size={isMobile ? "small" : "medium"}
                sx={{
                  fontWeight: 600,
                  "& .MuiChip-label": { px: { xs: 0.5, sm: 1 } },
                }}
              />
            </TableCell>
          </TableRow>
        ));
      case "Payroll Pending":
        return (data as PayrollPending[]).map((row) => (
          <TableRow
            key={row.id}
            sx={{
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.05)" },
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <TableCell
              sx={{
                color: "#011527",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.employee}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              {row.department}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.amount}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              {row.month}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              <Chip
                label={row.status}
                color={getStatusColor(row.status)}
                size={isMobile ? "small" : "medium"}
                sx={{
                  fontWeight: 600,
                  "& .MuiChip-label": { px: { xs: 0.5, sm: 1 } },
                }}
              />
            </TableCell>
          </TableRow>
        ));
      case "WPS Pending Files":
        return (data as WPSFile[]).map((row) => (
          <TableRow
            key={row.id}
            sx={{
              "&:hover": { backgroundColor: "rgba(217, 196, 140, 0.05)" },
              borderBottom: "1px solid #E5E7EB",
            }}
          >
            <TableCell
              sx={{
                color: "#011527",
                fontWeight: 500,
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.fileName}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", sm: "table-cell" },
              }}
            >
              {row.month}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
                display: { xs: "none", md: "table-cell" },
              }}
            >
              {row.employees}
            </TableCell>
            <TableCell
              sx={{
                color: "#011527",
                fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              {row.totalAmount}
            </TableCell>
            <TableCell
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.85rem", md: "0.95rem" },
                p: { xs: 1, sm: 1.5, md: 2 },
              }}
            >
              <Chip
                label={row.status}
                color={getStatusColor(row.status)}
                size={isMobile ? "small" : "medium"}
                sx={{
                  fontWeight: 600,
                  "& .MuiChip-label": { px: { xs: 0.5, sm: 1 } },
                }}
              />
            </TableCell>
          </TableRow>
        ));
      default:
        return null;
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: "none",
        border: "1px solid #E5E7EB",
        overflowX: { xs: "auto", md: "hidden" },
        "&::-webkit-scrollbar": {
          height: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#F0F0F0",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#D9C48C",
          borderRadius: "3px",
        },
      }}
    >
      <Table size={isMobile ? "small" : "medium"}>
        <TableHead>{renderTableHeaders()}</TableHead>
        <TableBody>{renderTableRows()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default DetailTable;
