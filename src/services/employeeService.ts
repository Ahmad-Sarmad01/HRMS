import { EmployeeFormData } from "../types/employee";

const API_BASE_URL = "/mechriapi";

export const employeeService = {
  async createEmployee(data: EmployeeFormData): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/postemployee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },
};
