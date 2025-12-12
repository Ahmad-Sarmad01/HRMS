# Employee Registration Form - React Hook Form Integration

This implementation integrates React Hook Form with the Employee Registration system and connects it to the backend API.

## Features

✅ React Hook Form integration for all form fields
✅ Form validation with error messages
✅ Backend API integration
✅ Field name mapping (camelCase to snake_case)
✅ Loading states and success/error notifications
✅ Form reset functionality
✅ Type-safe implementation with TypeScript

## Installation

The following package was installed:

```bash
npm install react-hook-form
```

## Architecture

### 1. **Type Definitions** (`src/types/employee.ts`)

Defines the `EmployeeFormData` interface matching the backend API payload structure.

### 2. **API Service** (`src/services/employeeService.ts`)

Handles communication with the backend API:

- Endpoint: `https://mechrisoft.com/mechriapi/postemployee`
- Method: POST
- Content-Type: application/json

### 3. **Field Mapping Utility** (`src/utils/fieldMapping.ts`)

- Maps form field names (camelCase) to API field names (snake_case)
- Provides default form values
- Converts form data to API format

### 4. **Form Components**

All form input components have been updated to work with React Hook Form:

#### Updated Components:

- `TextInput` - Text and email inputs with validation
- `SelectInput` - Dropdown selections with validation
- `DateInput` - Date picker with validation
- `FileInput` - File upload with validation
- `ImageInput` - Image upload with preview
- `CheckboxInput` - Checkbox with validation
- `FormFieldSelector` - Dynamic field renderer
- `FormGrid` - Grid layout for form fields

#### Form Sections:

- `PrimaryForm` - Basic employee information
- `OfficialForm` - Official details (DOB, visa, etc.)
- `PersonalForm` - Address and personal information
- `DocumentsForm` - Document management (separate state)
- `GeneralForm` - Qualifications and experience (separate state)
- `DependantForm` - Dependant information (separate state)
- `LeaveForm` - Leave details with form fields
- `FinanceForm` - Financial information
- `PayrollForm` - Salary and payroll details (mixed implementation)
- `OthersForm` - Additional employee details

### 5. **Main Registration Component** (`src/pages/employee/Registration.tsx`)

The main component that:

- Initializes React Hook Form with `useForm` hook
- Manages form submission
- Handles loading and error states
- Shows success/error notifications via Snackbar
- Passes `control` prop to all form sections

## Usage

### Form Submission Flow

1. User fills out the form across multiple tabs
2. User clicks "Submit Employee" button
3. Form data is validated
4. Data is converted from camelCase to snake_case
5. POST request is sent to the backend API
6. Success/error notification is displayed
7. Form is reset on success

### Code Example

```tsx
import { useForm } from "react-hook-form";
import {
  getDefaultFormValues,
  convertToAPIFormat,
} from "../../utils/fieldMapping";
import { employeeService } from "../../services/employeeService";

const { control, handleSubmit, reset } = useForm({
  defaultValues: getDefaultFormValues(),
  mode: "onBlur",
});

const onSubmit = async (data: any) => {
  const apiData = convertToAPIFormat(data);
  const response = await employeeService.createEmployee(apiData);
  reset(); // Reset form on success
};

<form onSubmit={handleSubmit(onSubmit)}>
  <PrimaryForm control={control} />
  <OfficialForm control={control} />
  {/* Other form sections */}
</form>;
```

## Field Name Mapping

The form uses camelCase field names for better JavaScript/TypeScript conventions, which are automatically converted to snake_case for the API:

| Form Field       | API Field         |
| ---------------- | ----------------- |
| staffCode        | staff_Code        |
| staffName        | staff_Name        |
| joiningDate      | joining_Date      |
| employeeCategory | employee_Category |
| uaeMobileNo      | uaE_Mobile_No     |
| dateOfBirth      | date_Of_Birth     |
| emiratesIdNo     | emiratesID_No     |
| ...              | ...               |

## Validation

- Required fields are marked with a red asterisk (\*)
- Validation errors appear below the input fields
- Form cannot be submitted until all required fields are filled
- Validation mode: `onBlur` (validates when field loses focus)

## API Payload Example

```json
{
  "staff_Code": "EMP001",
  "staff_Name": "John Doe",
  "branch": "Dubai Branch",
  "department": "IT",
  "personal_Email": "john@email.com",
  "joining_Date": "2025-12-05",
  "status": "Active",
  "nationality": "USA",
  "uaE_Mobile_No": "0501234567"
}
```

## User Experience

### Success State

- ✅ Green success message appears at top-right
- ✅ Form is automatically reset
- ✅ User is returned to first tab

### Error State

- ❌ Red error message appears at top-right
- ❌ Form data is preserved
- ❌ User can correct and resubmit

### Loading State

- ⏳ Submit button shows loading spinner
- ⏳ Submit button is disabled
- ⏳ "Submitting..." text is displayed

## Future Enhancements

1. **Add field-level async validation** (e.g., check if staff code exists)
2. **Implement autosave functionality** (save draft to localStorage)
3. **Add confirmation dialog** before form submission
4. **Implement file upload** to cloud storage for photos and documents
5. **Add form progress indicator** showing completion percentage
6. **Implement conditional fields** based on employee type
7. **Add export/import functionality** for bulk employee upload

## Notes

- Some forms (DocumentsForm, GeneralForm, DependantForm) maintain their own state for DataGrid components
- PayrollForm has mixed implementation with both React Hook Form and local state
- The forms support responsive design and work across all screen sizes
- All components are type-safe with TypeScript generics
