import apiClient from '../config/api';

export interface SetupOption {
  id: string | number;
  name: string;
  [key: string]: any;
}

export interface SetupOptionsResponse {
  status?: SetupOption[];
  branch?: SetupOption[];
  designation?: SetupOption[];
  subStatus?: SetupOption[];
  nationality?: SetupOption[];
  gender?: SetupOption[];
  visaType?: SetupOption[];
  section?: SetupOption[];
  visaSponsor?: SetupOption[];
  employmentType?: SetupOption[];
  lineManager?: SetupOption[];
  labourCardStatus?: SetupOption[];
  position?: SetupOption[];
  addResponsibility?: SetupOption[];
  religion?: SetupOption[];
}

class SetupService {
  async getStatus(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupStatus');
      return response.data.getSetupStatus || [];
    } catch (error) {
      console.error('Error fetching status options:', error);
      return [];
    }
  }

  async getBranches(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupBranch');
      return response.data.getSetupBranch || [];
    } catch (error) {
      console.error('Error fetching branch options:', error);
      return [];
    }
  }

  async getDesignations(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupDesignation');
      return response.data.getSetupDesignation || [];
    } catch (error) {
      console.error('Error fetching designation options:', error);
      return [];
    }
  }

  async getSubStatus(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupSubStatus');
      return response.data.getSetupSubStatus || [];
    } catch (error) {
      console.error('Error fetching sub status options:', error);
      return [];
    }
  }

  async getNationalities(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupNationality');
      return response.data.getSetupNationality || [];
    } catch (error) {
      console.error('Error fetching nationality options:', error);
      return [];
    }
  }

  async getGender(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupGender');
      return response.data.getSetupGender || [];
    } catch (error) {
      console.error('Error fetching gender options:', error);
      return [];
    }
  }

  async getVisaType(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupVisaType');
      return response.data.getSetupVisaType || [];
    } catch (error) {
      console.error('Error fetching visa type options:', error);
      return [];
    }
  }

  async getSection(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupSection');
      return response.data.getSetupSection || [];
    } catch (error) {
      console.error('Error fetching section options:', error);
      return [];
    }
  }

  async getVisaSponsor(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupVisaSponsor');
      return response.data.getSetupVisaSponsor || [];
    } catch (error) {
      console.error('Error fetching visa sponsor options:', error);
      return [];
    }
  }

  async getEmploymentType(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupEmploymentType');
      return response.data.getSetupEmploymentType || [];
    } catch (error) {
      console.error('Error fetching employment type options:', error);
      return [];
    }
  }

  async getLineManager(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupLineManager');
      return response.data.getSetupLineManager || [];
    } catch (error) {
      console.error('Error fetching line manager options:', error);
      return [];
    }
  }

  async getLabourCardStatus(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupLabourCardStatus');
      return response.data.getSetupLabourCardStatus || [];
    } catch (error) {
      console.error('Error fetching labour card status options:', error);
      return [];
    }
  }

  async getPosition(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupPosition');
      return response.data.getSetupPosition || [];
    } catch (error) {
      console.error('Error fetching position options:', error);
      return [];
    }
  }

  async getAddResponsibility(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupAddResponsibility');
      return response.data.getSetupAddResponsibility || [];
    } catch (error) {
      console.error('Error fetching additional responsibility options:', error);
      return [];
    }
  }

  async getReligion(): Promise<SetupOption[]> {
    try {
      const response = await apiClient.get('/GetSetupReligion');
      return response.data.getSetupReligion || [];
    } catch (error) {
      console.error('Error fetching religion options:', error);
      return [];
    }
  }

  async getAllSetupOptions(): Promise<SetupOptionsResponse> {
    try {
      const [
        status,
        branch,
        designation,
        subStatus,
        nationality,
        gender,
        visaType,
        section,
        visaSponsor,
        employmentType,
        lineManager,
        labourCardStatus,
        position,
        addResponsibility,
        religion,
      ] = await Promise.all([
        this.getStatus(),
        this.getBranches(),
        this.getDesignations(),
        this.getSubStatus(),
        this.getNationalities(),
        this.getGender(),
        this.getVisaType(),
        this.getSection(),
        this.getVisaSponsor(),
        this.getEmploymentType(),
        this.getLineManager(),
        this.getLabourCardStatus(),
        this.getPosition(),
        this.getAddResponsibility(),
        this.getReligion(),
      ]);

      return {
        status,
        branch,
        designation,
        subStatus,
        nationality,
        gender,
        visaType,
        section,
        visaSponsor,
        employmentType,
        lineManager,
        labourCardStatus,
        position,
        addResponsibility,
        religion,
      };
    } catch (error) {
      console.error('Error fetching all setup options:', error);
      return {};
    }
  }
}

export const setupService = new SetupService();
