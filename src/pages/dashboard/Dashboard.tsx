import { FC, ReactElement, cloneElement } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddIcon from "@mui/icons-material/Add";
import ReceiptIcon from "@mui/icons-material/Receipt";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useAppSelector } from "../../store/hooks";

const Dashboard: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Get data from Redux store
  const { statisticsCards, expiredDocuments, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  // Map icon names to actual icon components
  const iconMap: Record<string, ReactElement> = {
    PeopleIcon: <PeopleIcon />,
    WarningIcon: <WarningIcon />,
    CreditCardIcon: <CreditCardIcon />,
    RequestQuoteIcon: <RequestQuoteIcon />,
    MonetizationOnIcon: <MonetizationOnIcon />,
    InsertDriveFileIcon: <InsertDriveFileIcon />,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "error";
      case "Expiring Soon":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* Page Header with Responsive Typography */}
      <Box sx={{ mb: { xs: 3, sm: 4, md: 4 } }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 700, 
            color: "#011527", 
            mb: { xs: 0.5, sm: 1 },
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          Dashboard
        </Typography>
        <Typography 
          variant="body2"
          sx={{ 
            color: "#86764e",
            fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
          }}
        >
          Welcome to HRMS Dashboard • November 30, 2025
        </Typography>
      </Box>

      {/* Statistics Cards Grid - Fully Responsive */}
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }} sx={{ mb: { xs: 3, sm: 4, md: 4 } }}>
        {statisticsCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
                "&:hover": {
                  boxShadow: isMobile ? "0 4px 12px rgba(0, 0, 0, 0.1)" : "0 8px 16px rgba(0, 0, 0, 0.12)",
                  transform: isMobile ? "translateY(-2px)" : "translateY(-4px)",
                },
                backgroundColor: "#FFFFFF",
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                  <Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "#86764e", 
                        fontWeight: 500, 
                        mb: 0.75,
                        fontSize: { xs: "0.8rem", sm: "0.85rem", md: "0.9rem" },
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      sx={{ 
                        fontWeight: 700, 
                        color: "#011527",
                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                      }}
                    >
                      {card.value}
                    </Typography>
                  </Box>
                  <Box sx={{ opacity: 0.8 }}>
                    <Box sx={{ fontSize: { xs: 32, sm: 36, md: 40 }, color: card.color, display: "flex", alignItems: "center" }}>
                      {iconMap[card.icon] || <PeopleIcon />}
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    height: "3px",
                    backgroundColor: card.color,
                    borderRadius: "2px",
                    width: "100%",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Documents Expiring Soon Section - Fully Responsive */}
      <Card
        sx={{
          mb: { xs: 3, sm: 4, md: 4 },
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: "#011527", 
              mb: { xs: 1.5, sm: 2 },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            Documents Expiring Soon
          </Typography>
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
              <TableHead>
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
              </TableHead>
              <TableBody>
                {expiredDocuments.map((row) => (
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Quick Actions Section - Fully Responsive */}
      <Card
        sx={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          backgroundColor: "#FFFFFF",
        }}
      >
        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: "#011527", 
              mb: { xs: 1.5, sm: 2, md: 2.5 },
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
            }}
          >
            Quick Actions
          </Typography>
          <Grid container spacing={{ xs: 1, sm: 1.5, md: 2 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#D9C48C",
                  color: "#011527",
                  fontWeight: 600,
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  "&:hover": {
                    backgroundColor: "#B8A361",
                  },
                }}
              >
                Add New Employee
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  backgroundColor: "#D9C48C",
                  color: "#011527",
                  fontWeight: 600,
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  "&:hover": {
                    backgroundColor: "#B8A361",
                  },
                }}
              >
                Add New Document
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<MonetizationOnIcon />}
                sx={{
                  backgroundColor: "#D9C48C",
                  color: "#011527",
                  fontWeight: 600,
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  "&:hover": {
                    backgroundColor: "#B8A361",
                  },
                }}
              >
                View Payroll
              </Button>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<QueryBuilderIcon />}
                sx={{
                  backgroundColor: "#D9C48C",
                  color: "#011527",
                  fontWeight: 600,
                  py: { xs: 1, sm: 1.25, md: 1.5 },
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  "&:hover": {
                    backgroundColor: "#B8A361",
                  },
                }}
              >
                View Timesheet
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
