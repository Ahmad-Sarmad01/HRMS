import { Employee, EmployeeFormData } from "../types/employee";
import apiClient from "../config/api";

export const employeeService = {
  async getEmployees(): Promise<Employee[]> {
    try {
      const response = await apiClient.get("/GetEmployee");
      return response.data.getEmployee || [];
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
      const response = await apiClient.post("/postemployee", data);
      return response.data;
    } catch (error: any) {
      console.error("Error creating employee:", error);
      const errorMessage = error.response?.data?.errors || 
                          error.response?.data || 
                          error.message || 
                          "Unknown error";
      throw new Error(JSON.stringify(errorMessage));
    }
  },
};
