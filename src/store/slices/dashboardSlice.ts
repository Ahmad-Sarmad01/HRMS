import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StatisticsCard {
  title: string;
  value: string;
  icon: string;
  color: string;
}

export interface ExpiredDocument {
  id: number;
  docName: string;
  employee: string;
  expiryDate: string;
  status: 'Critical' | 'Expiring Soon' | 'Normal';
}

export interface DashboardState {
  statisticsCards: StatisticsCard[];
  expiredDocuments: ExpiredDocument[];
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  statisticsCards: [
    {
      title: "Total Employees",
      value: "248",
      icon: "PeopleIcon",
      color: "#D9C48C",
    },
    {
      title: "Documents Expiring Soon",
      value: "12",
      icon: "WarningIcon",
      color: "#F59E0B",
    },
    {
      title: "Visa Expiry This Month",
      value: "5",
      icon: "CreditCardIcon",
      color: "#EF4444",
    },
    {
      title: "Pending Leave Requests",
      value: "18",
      icon: "RequestQuoteIcon",
      color: "#3B82F6",
    },
    {
      title: "Payroll Pending",
      value: "3",
      icon: "MonetizationOnIcon",
      color: "#10B981",
    },
    {
      title: "WPS Pending Files",
      value: "7",
      icon: "InsertDriveFileIcon",
      color: "#8B5CF6",
    },
  ],
  expiredDocuments: [
    {
      id: 1,
      docName: "Passport",
      employee: "John Doe",
      expiryDate: "2025-02-15",
      status: "Expiring Soon",
    },
    {
      id: 2,
      docName: "Work Visa",
      employee: "Jane Smith",
      expiryDate: "2025-01-20",
      status: "Critical",
    },
    {
      id: 3,
      docName: "Medical Certificate",
      employee: "Ahmed Hassan",
      expiryDate: "2025-03-10",
      status: "Expiring Soon",
    },
    {
      id: 4,
      docName: "Emirates ID",
      employee: "Sarah Wilson",
      expiryDate: "2025-02-28",
      status: "Expiring Soon",
    },
    {
      id: 5,
      docName: "Travel Permit",
      employee: "Michael Brown",
      expiryDate: "2025-01-15",
      status: "Critical",
    },
  ],
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStatisticsCards: (state, action: PayloadAction<StatisticsCard[]>) => {
      state.statisticsCards = action.payload;
    },
    updateStatisticCard: (state, action: PayloadAction<{ index: number; value: string }>) => {
      const { index, value } = action.payload;
      if (state.statisticsCards[index]) {
        state.statisticsCards[index].value = value;
      }
    },
    setExpiredDocuments: (state, action: PayloadAction<ExpiredDocument[]>) => {
      state.expiredDocuments = action.payload;
    },
    addExpiredDocument: (state, action: PayloadAction<ExpiredDocument>) => {
      state.expiredDocuments.push(action.payload);
    },
    removeExpiredDocument: (state, action: PayloadAction<number>) => {
      state.expiredDocuments = state.expiredDocuments.filter(doc => doc.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setStatisticsCards,
  updateStatisticCard,
  setExpiredDocuments,
  addExpiredDocument,
  removeExpiredDocument,
  setLoading,
  setError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
