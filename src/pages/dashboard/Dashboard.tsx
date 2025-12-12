import { FC, ReactElement, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddIcon from "@mui/icons-material/Add";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "../../store/hooks";
import DetailTable from "../../component/dashboardDetails/DetailTable";
import { CardType, getCardData } from "../../data/dashboardData";

const Dashboard: FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // State for selected card
  const [selectedCard, setSelectedCard] = useState<CardType | null>(
    "Documents Expiring Soon"
  );

  // Get data from Redux store
  const { statisticsCards } = useAppSelector((state) => state.dashboard);

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Map icon names to actual icon components
  const iconMap: Record<string, ReactElement> = {
    PeopleIcon: <PeopleIcon />,
    WarningIcon: <WarningIcon />,
    CreditCardIcon: <CreditCardIcon />,
    RequestQuoteIcon: <RequestQuoteIcon />,
    MonetizationOnIcon: <MonetizationOnIcon />,
    InsertDriveFileIcon: <InsertDriveFileIcon />,
  };

  // Handle card click
  const handleCardClick = (cardTitle: string) => {
    setSelectedCard(cardTitle as CardType);
  };

  // Get data for selected card
  const selectedCardData = selectedCard ? getCardData(selectedCard) : [];

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
          {`Welcome to HRMS Dashboard • ${currentDate}`}
        </Typography>
      </Box>

      {/* Statistics Cards Grid - Fully Responsive */}
      <Grid
        container
        spacing={{ xs: 1.5, sm: 2, md: 2.5 }}
        sx={{ mb: { xs: 3, sm: 4, md: 4 } }}
      >
        {statisticsCards.map((card, index) => (
          <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={index}>
            <Card
              onClick={() => handleCardClick(card.title)}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow:
                  selectedCard === card.title
                    ? "0 8px 16px rgba(217, 196, 140, 0.3)"
                    : "0 2px 8px rgba(0, 0, 0, 0.08)",
                border:
                  selectedCard === card.title
                    ? "2px solid #D9C48C"
                    : "2px solid transparent",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: isMobile
                    ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                    : "0 8px 16px rgba(0, 0, 0, 0.12)",
                  transform: isMobile ? "translateY(-2px)" : "translateY(-4px)",
                },
                backgroundColor: "#FFFFFF",
              }}
            >
              <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
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
                    <Box
                      sx={{
                        fontSize: { xs: 32, sm: 36, md: 40 },
                        color: card.color,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
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

      {/* Detail Table Section - Dynamic based on selected card */}
      {selectedCard && (
        <Card
          sx={{
            mb: { xs: 3, sm: 4, md: 4 },
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            backgroundColor: "#FFFFFF",
          }}
        >
          <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 2.5 } }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: { xs: 1.5, sm: 2 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#011527",
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                }}
              >
                {selectedCard}
              </Typography>
              <IconButton
                onClick={() => setSelectedCard(null)}
                size="small"
                sx={{
                  color: "#86764e",
                  "&:hover": {
                    backgroundColor: "rgba(217, 196, 140, 0.1)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <DetailTable cardType={selectedCard} data={selectedCardData} />
          </CardContent>
        </Card>
      )}

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
