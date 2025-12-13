import React, { FC, useState, useEffect } from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  clearSelectedAppointment,
  setSelectedAppointment,
} from "../../store/slices/appointmentSlice";
import {
  AppointmentActionBar,
  AppointmentSearch,
  AppointmentList,
  AppointmentFormSections,
} from "../../component/appointment";
import apiClient from "../../config/api";

interface AppointmentFormData {
  refNo: string;
  date: string;
  staffName: string;
  designation: string;
  dateOfJoining: string;
  salary: string;
  recruitmentType: string;
  status: string;
  numberOfClassesPerWeek: string;
  gradeLevelsAssigned: string;
  additionalResponsibility: string;
  currentVisaType: string;
  otherSpecify: string;
  currentVisaExpiryDate: string;
  requestedApprovalFor: string;
  documentsReceivedConfirmed: boolean;
  documentsPendingDetails: string;
}

const StaffAppointment: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedAppointment } = useSelector(
    (state: RootState) => state.appointment
  );
  const [activeBtn, setActiveBtn] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const [showSearch, setShowSearch] = useState(false);
  const [showList, setShowList] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      refNo: "0.00",
      date: new Date().toISOString().split("T")[0],
      staffName: "",
      designation: "",
      dateOfJoining: "",
      salary: "",
      recruitmentType: "",
      status: "",
      numberOfClassesPerWeek: "0.0",
      gradeLevelsAssigned: "",
      additionalResponsibility: "",
      currentVisaType: "",
      otherSpecify: "",
      currentVisaExpiryDate: "",
      requestedApprovalFor: "",
      documentsReceivedConfirmed: false,
      documentsPendingDetails: "",
    },
  });

  // Load appointment from slice on mount
  useEffect(() => {
    if (selectedAppointment) {
      const formData = convertFromAPIFormat(selectedAppointment);
      reset(formData);
    }
  }, [selectedAppointment, reset]);

  // Convert backend API data to frontend form format
  const convertFromAPIFormat = (apiData: any): AppointmentFormData => {
    return {
      refNo: apiData.reference_No || "",
      date: apiData.appointment_Date || new Date().toISOString().split("T")[0],
      staffName: apiData.staff_Name || "",
      designation: apiData.designation || "",
      dateOfJoining: apiData.date_of_Joining || "",
      salary: apiData.salary || "",
      recruitmentType: apiData.recruitment_Type || "",
      status: apiData.appointment_Status || "",
      numberOfClassesPerWeek: apiData.number_of_Classes_Per_Week || "",
      gradeLevelsAssigned: apiData.grade_Level_Assigned || "",
      additionalResponsibility: apiData.additional_Responsibilities || "",
      currentVisaType: apiData.current_Visa_Type || "",
      otherSpecify: apiData.other_Visa || "",
      currentVisaExpiryDate: apiData.visa_Expiry_Date || "",
      requestedApprovalFor: apiData.requested_Approval_For || "",
      documentsReceivedConfirmed: apiData.document_Declaration_Option === "Yes",
      documentsPendingDetails: apiData.pending_Document || "",
    };
  };

  // Convert frontend form data to backend API format
  const convertToAPIFormat = (data: AppointmentFormData) => {
    return {
      reference_No: data.refNo || "",
      appointment_Date: data.date || "",
      staff_Name: data.staffName || "",
      designation: data.designation || "",
      date_of_Joining: data.dateOfJoining || "",
      salary: data.salary || "0",
      recruitment_Type: data.recruitmentType || "",
      appointment_Status: data.status || "",
      number_of_Classes_Per_Week: data.numberOfClassesPerWeek || "",
      grade_Level_Assigned: data.gradeLevelsAssigned || "",
      additional_Responsibilities: data.additionalResponsibility || "",
      current_Visa_Type: data.currentVisaType || "",
      other_Visa: data.otherSpecify || "",
      visa_Expiry_Date: data.currentVisaExpiryDate || "",
      requested_Approval_For: data.requestedApprovalFor || "",
      document_Declaration_Option: data.documentsReceivedConfirmed
        ? "Yes"
        : "No",
      pending_Document: data.documentsPendingDetails || "",
      companyID: "1", // You may want to get this from user context or store
    };
  };

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      setIsSubmitting(true);
      const apiData = convertToAPIFormat(data);

      console.log("Submitting appointment data:", apiData);

      // Use PUT if editing existing appointment, POST if creating new
      const response = selectedAppointment
        ? await apiClient.put("/PutEmployeeAppointment", apiData)
        : await apiClient.post("/PostEmployeeAppointment", apiData);

      if (response.data?.isSuccess) {
        setSnackbar({
          open: true,
          message: selectedAppointment
            ? "Staff appointment updated successfully!"
            : "Staff appointment submitted successfully!",
          severity: "success",
        });
        reset();
        dispatch(clearSelectedAppointment());
      } else {
        throw new Error(
          response.data?.message ||
            `Failed to ${selectedAppointment ? "update" : "submit"} appointment`
        );
      }
    } catch (error: any) {
      console.error("Error submitting appointment:", error);
      setSnackbar({
        open: true,
        message:
          error.message || "Failed to submit appointment. Please try again.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handlePillButtonClick = (index: number, title?: string) => {
    setActiveBtn(index);

    if (title === "New") {
      // Clear form to new with empty default values
      reset({
        refNo: "0.00",
        date: new Date().toISOString().split("T")[0],
        staffName: "",
        designation: "",
        dateOfJoining: "",
        salary: "",
        recruitmentType: "",
        status: "",
        numberOfClassesPerWeek: "0.0",
        gradeLevelsAssigned: "",
        additionalResponsibility: "",
        currentVisaType: "",
        otherSpecify: "",
        currentVisaExpiryDate: "",
        requestedApprovalFor: "",
        documentsReceivedConfirmed: false,
        documentsPendingDetails: "",
      });
      dispatch(clearSelectedAppointment());
    } else if (title === "Save") {
      // Save/Update
      handleSubmit(onSubmit)();
    } else if (index === 2) {
      // Submit for Approval
      handleSubmit(onSubmit)();
    } else if (index === 3 && title === "Search") {
      // Toggle search
      setShowSearch(!showSearch);
    } else if (index === 4 && title === "List") {
      // Toggle list view
      setShowList(!showList);
    }
  };

  const handleSelectAppointment = (appointment: any) => {
    console.log("Selected appointment:", appointment);
    const formData = convertFromAPIFormat(appointment);
    reset(formData);
    dispatch(setSelectedAppointment(appointment));
    setShowSearch(false);
  };

  const handleSelectFromList = (appointment: any) => {
    console.log("Selected appointment from list:", appointment);
    const formData = convertFromAPIFormat(appointment);
    reset(formData);
    dispatch(setSelectedAppointment(appointment));
    setShowList(false);
  };

  const handleError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AppointmentActionBar
        activeBtn={activeBtn}
        isSubmitting={isSubmitting}
        onButtonClick={handlePillButtonClick}
        showList={showList}
      />

      {showSearch && <AppointmentSearch onSelect={handleSelectAppointment} />}

      {showList ? (
        <AppointmentList
          onSelect={handleSelectFromList}
          onError={handleError}
        />
      ) : (
        <AppointmentFormSections control={control} />
      )}

      {/* Snackbar for notifications */}
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
    </form>
  );
};

export default StaffAppointment;
