import { RootState } from '../store';

// Selectors for Dashboard data
export const selectStatisticsCards = (state: RootState) => state.dashboard.statisticsCards;
export const selectExpiredDocuments = (state: RootState) => state.dashboard.expiredDocuments;
export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

// Selector to get a specific statistic card by title
export const selectStatisticByTitle = (state: RootState, title: string) =>
  state.dashboard.statisticsCards.find(card => card.title === title);

// Selector to get critical documents
export const selectCriticalDocuments = (state: RootState) =>
  state.dashboard.expiredDocuments.filter(doc => doc.status === 'Critical');

// Selector to get count of documents by status
export const selectDocumentCountByStatus = (state: RootState, status: 'Critical' | 'Expiring Soon' | 'Normal') =>
  state.dashboard.expiredDocuments.filter(doc => doc.status === status).length;
