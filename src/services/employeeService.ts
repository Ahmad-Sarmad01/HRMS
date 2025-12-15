import { Employee } from "../types/employee";
import apiClient from "../config/api";
import axios from "axios";

export interface LeaveType {
  id: string;
  name: string;
}

export interface EmployeeLeave {
  staff_Code: string;
  from_Date: string;
  to_Date: string;
  leave_Type: string;
  duration: string;
  effective_Days: string;
  status: string;
  companyID: string;
}

export interface PostEmployeeLeaveRequest {
  staff_Code: string;
  from_Date: string;
  to_Date: string;
  leave_Type: string;
  duration: string;
  effective_Days: string;
  status: string;
  companyID: string;
}

export interface GetEmployeeLeaveResponse {
  isSuccess: boolean;
  message: string;
  employeeLeave: EmployeeLeave[];
}

export interface GetLeaveTypeResponse {
  isSuccess: boolean;
  message: string;
  getSetupLeaveType: LeaveType[];
}

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    try {
      const response = await apiClient.get("/GetEmployee");
      return response.data.employeeRegistration || [];
    } catch (error: any) {
      console.error("Error fetching employees:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async createEmployee(data: any): Promise<any> {
    try {
      let uploadedFileName = data.upload_Photo_Name;

      // Check if there's an image file to upload
      if (data.uploadPhotoFile && data.uploadPhotoFile instanceof File) {
        const imageFile = data.uploadPhotoFile;
        const fileExtension = imageFile.name.split(".").pop();
        const uniqueFileName = `${
          data.staff_Code || "employee"
        }_${Date.now()}.${fileExtension}`;

        // Upload file to FTP via API
        const formData = new FormData();
        formData.append("file", imageFile, uniqueFileName);

        const uploadResponse = await axios.post(
          "https://mechrisoft.com/mechriapi/uploadfiletoftp",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Image upload response:", uploadResponse.data);

        // Update filename with the uploaded file name
        uploadedFileName = uniqueFileName;
      }

      // Prepare employee data without the file object
      const apiData = { ...data, upload_Photo_Name: uploadedFileName };
      delete apiData.uploadPhotoFile;

      // Send employee data
      const response = await apiClient.post("/postemployee", apiData);
      return response.data;
    } catch (error: any) {
      console.error("Error creating employee:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async updateEmployee(data: any): Promise<any> {
    try {
      let uploadedFileName = data.upload_Photo_Name;

      // Check if there's an image file to upload
      if (data.uploadPhotoFile && data.uploadPhotoFile instanceof File) {
        const imageFile = data.uploadPhotoFile;
        const fileExtension = imageFile.name.split(".").pop();
        const uniqueFileName = `${
          data.staff_Code || "employee"
        }_${Date.now()}.${fileExtension}`;

        // Upload file to FTP via API
        const formData = new FormData();
        formData.append("file", imageFile, uniqueFileName);

        const uploadResponse = await axios.post(
          "https://mechrisoft.com/mechriapi/uploadfiletoftp",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Image upload response:", uploadResponse.data);

        // Update filename with the uploaded file name
        uploadedFileName = uniqueFileName;
      }

      // Prepare employee data without the file object
      const apiData = { ...data, upload_Photo_Name: uploadedFileName };
      delete apiData.uploadPhotoFile;

      // Send employee data
      const response = await apiClient.put("/putemployee", apiData);
      return response.data;
    } catch (error: any) {
      console.error("Error updating employee:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async searchEmployees(query: string): Promise<any[]> {
    try {
      const response = await apiClient.get(
        `/GetEmployee_search?search=${encodeURIComponent(query)}`
      );
      return response.data.getEmployee || [];
    } catch (error: any) {
      console.error("Error searching employees:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async postEmployeeQualification(data: {
    staff_Code: string;
    action: string;
    level: string;
    qualification: string;
    specialisation: string;
    year: string;
    duration: string;
    mode: string;
    university_Institution: string;
    companyID: string;
  }): Promise<any> {
    try {
      const response = await apiClient.post("/PostEmployeeQualification", data);
      return response.data;
    } catch (error: any) {
      console.error("Error posting employee qualification:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async getEmployeeQualifications(search: string): Promise<any> {
    try {
      const response = await apiClient.get(
        `/GetEmployeeQualification_search?search=${encodeURIComponent(search)}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching employee qualifications:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async postEmployeeExperience(data: {
    staff_Code: string;
    action: string;
    company_Name: string;
    designation: string;
    from_Date: string;
    to_Date: string;
    experience: string;
    companyID: string;
  }): Promise<any> {
    try {
      const response = await apiClient.post("/PostEmployeeExperience", data);
      return response.data;
    } catch (error: any) {
      console.error("Error posting employee experience:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async getEmployeeExperiences(search: string): Promise<any> {
    try {
      const response = await apiClient.get(
        `/GetEmployeeExperience_search?search=${encodeURIComponent(search)}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching employee experiences:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async postEmployeeDependant(data: {
    staff_Code: string;
    name: string;
    relationship: string;
    date_Of_Birth: string;
    marital_Status: string;
    medical: string;
    status: string;
    remarks: string;
    upload_Photo_Name: string;
    companyID: string;
  }): Promise<any> {
    try {
      const response = await apiClient.post("/PostEmployeeDependant", data);
      return response.data;
    } catch (error: any) {
      console.error("Error posting employee dependant:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async getEmployeeDependants(search: string): Promise<any> {
    try {
      const response = await apiClient.get(
        `/GetEmployeeDependant_search?search=${encodeURIComponent(search)}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching employee dependants:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async postEmployeeAllowance(data: {
    staff_Code: string;
    allowance_Type: string;
    allowance_Amount: string;
    companyID: string;
  }): Promise<any> {
    try {
      const response = await apiClient.post("/PostEmployeeAllowance", data);
      return response.data;
    } catch (error: any) {
      console.error("Error posting employee allowance:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  async getEmployeeAllowances(search: string): Promise<any> {
    try {
      const response = await apiClient.get(
        `/GetEmployeeAllowance_search?search=${encodeURIComponent(search)}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching employee allowances:", error);
      const errorMessage =
        error.response?.data?.errors ||
        error.response?.data ||
        error.message ||
        "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  // Post Employee Leave
  async postEmployeeLeave(data: PostEmployeeLeaveRequest): Promise<any> {
    try {
      const response = await apiClient.post("/PostEmployeeLeave", data);
      return response.data;
    } catch (error: any) {
      console.error("Error posting employee leave:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to post employee leave";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  // Get Employee Leave by search
  async getEmployeeLeave(
    search: string = ""
  ): Promise<GetEmployeeLeaveResponse> {
    try {
      const response = await apiClient.get(
        `/GetEmployeeLeave_search?search=${search}`
      );
      return response.data;
    } catch (error: any) {
      console.error("Error fetching employee leave:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to fetch employee leave";
      throw new Error(JSON.stringify(errorMessage));
    }
  },

  // Get Leave Types
  async getLeaveTypes(): Promise<GetLeaveTypeResponse> {
    try {
      const response = await apiClient.get("/GetSetupLeaveType");
      return response.data;
    } catch (error: any) {
      console.error("Error fetching leave types:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Failed to fetch leave types";
      throw new Error(JSON.stringify(errorMessage));
    }
  },
};
