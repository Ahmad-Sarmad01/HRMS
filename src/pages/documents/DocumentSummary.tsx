import { FC } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const DocumentSummary: FC = () => {
  // Sample data for the table and chart
  const documentData = [
    { type: "Emirates ID", count: 4 },
    { type: "Insurance", count: 23 },
    { type: "Passport", count: 7 },
  ];

  // Transform data for the chart
  const chartData = documentData.map((item) => ({
    name: item.type,
    count: item.count,
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          color: "var(--primary)",
        }}
      >
        Document Summary
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side - Table */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
              height: "100%",
              border: "1px solid #E5E7EB",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#011527",
              }}
            >
              Expired Documents Summary
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #E5E7EB",
                      }}
                    >
                      Document Type
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        borderBottom: "2px solid #E5E7EB",
                      }}
                    >
                      Count
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {documentData.map((row) => (
                    <TableRow
                      key={row.type}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#FAFAFA",
                        },
                      }}
                    >
                      <TableCell sx={{ borderBottom: "1px solid #E5E7EB" }}>
                        {row.type}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ borderBottom: "1px solid #E5E7EB" }}
                      >
                        {row.count}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                1 of 1 pages (3 items)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Right Side - Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            sx={{
              p: 2,
              height: "100%",
              border: "1px solid #E5E7EB",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#011527",
                textAlign: "center",
              }}
            >
              Expired Document Analysis
            </Typography>

            <Box sx={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <YAxis
                    label={{
                      value: "Count",
                      angle: -90,
                      position: "insideLeft",
                      style: { textAnchor: "middle" },
                    }}
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: "#E5E7EB" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.name === "Emirates ID"
                            ? "#E91E63" // Pink
                            : entry.name === "Insurance"
                            ? "#2196F3" // Blue
                            : "#FFEB3B" // Yellow
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentSummary;
