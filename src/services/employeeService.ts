import { Employee } from "../types/employee";
import apiClient from "../config/api";
import axios from "axios";

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
};
