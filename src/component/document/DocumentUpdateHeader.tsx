import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import SearchIcon from "@mui/icons-material/Search";

interface DocumentUpdateHeaderProps {
  onExportExcel: () => void;
  onExportPDF: () => void;
  onClearFilter: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

const DocumentUpdateHeader: React.FC<DocumentUpdateHeaderProps> = ({
  onExportExcel,
  onExportPDF,
  onClearFilter,
  searchQuery,
  onSearchChange,
  onSearch,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
        gap: 2,
        mb: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: "#011527",
          mb: { xs: 2, md: 0 },
        }}
      >
        Document Update
      </Typography>

      <Box
        sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}
      >
        <TextField
          size="small"
          placeholder="Search by Staff Code, Name, or Document Number..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyPress={handleKeyPress}
          sx={{
            width: { xs: "100%", sm: 300 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#FFFFFF",
              "& fieldset": {
                borderColor: "#D9C48C",
              },
              "&:hover fieldset": {
                borderColor: "#B8A361",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#D9C48C",
                borderWidth: 2,
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" onClick={onSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="outlined"
          startIcon={<TableChartIcon />}
          onClick={onExportExcel}
          sx={{
            borderColor: "#D9C48C",
            color: "#011527",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#B8A361",
              backgroundColor: "rgba(217, 196, 140, 0.08)",
            },
          }}
        >
          Excel
        </Button>
        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          onClick={onExportPDF}
          sx={{
            borderColor: "#D9C48C",
            color: "#011527",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#B8A361",
              backgroundColor: "rgba(217, 196, 140, 0.08)",
            },
          }}
        >
          PDF
        </Button>
        <Button
          variant="outlined"
          onClick={onClearFilter}
          sx={{
            borderColor: "#D9C48C",
            color: "#011527",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              borderColor: "#B8A361",
              backgroundColor: "rgba(217, 196, 140, 0.08)",
            },
          }}
        >
          <FilterListOffIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default DocumentUpdateHeader;
