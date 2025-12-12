import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  updateStatisticCard,
  addExpiredDocument,
  removeExpiredDocument,
} from '../../store/slices/dashboardSlice';

/**
 * Example component demonstrating how to use Redux actions
 * to update the dashboard state
 */
const DashboardActionsExample: FC = () => {
  const dispatch = useAppDispatch();
  const { statisticsCards, expiredDocuments } = useAppSelector(
    (state) => state.dashboard
  );

  const handleIncrementEmployees = () => {
    const currentValue = parseInt(statisticsCards[0].value);
    dispatch(updateStatisticCard({ index: 0, value: (currentValue + 1).toString() }));
  };

  const handleAddDocument = () => {
    const newId = Math.max(...expiredDocuments.map(doc => doc.id)) + 1;
    dispatch(
      addExpiredDocument({
        id: newId,
        docName: 'New Document',
        employee: 'New Employee',
        expiryDate: '2025-12-31',
        status: 'Expiring Soon',
      })
    );
  };

  const handleRemoveFirstDocument = () => {
    if (expiredDocuments.length > 0) {
      dispatch(removeExpiredDocument(expiredDocuments[0].id));
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Dashboard Actions Example
      </Typography>
      <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
        Click the buttons below to see Redux actions in action:
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          onClick={handleIncrementEmployees}
          sx={{ backgroundColor: '#D9C48C', '&:hover': { backgroundColor: '#B8A361' } }}
        >
          Increment Employees
        </Button>
        <Button
          variant="contained"
          onClick={handleAddDocument}
          sx={{ backgroundColor: '#3B82F6', '&:hover': { backgroundColor: '#2563EB' } }}
        >
          Add Document
        </Button>
        <Button
          variant="contained"
          onClick={handleRemoveFirstDocument}
          disabled={expiredDocuments.length === 0}
          sx={{ backgroundColor: '#EF4444', '&:hover': { backgroundColor: '#DC2626' } }}
        >
          Remove First Document
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Current Employees: <strong>{statisticsCards[0]?.value}</strong>
        </Typography>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Total Documents: <strong>{expiredDocuments.length}</strong>
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardActionsExample;
