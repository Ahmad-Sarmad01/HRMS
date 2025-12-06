import { EmployeeFormData } from "../types/employee";

const API_BASE_URL = "https://mechrisoft.com/mechriapi";

export const employeeService = {
  async createEmployee(data: any): Promise<any> {
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
        throw new Error(
          JSON.stringify(errorData.errors || errorData || "Unknown error")
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },
};
