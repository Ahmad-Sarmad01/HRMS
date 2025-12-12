# React Hook Form Integration - Quick Start Guide

## ✅ What Was Implemented

### 1. Installed Dependencies

```bash
npm install react-hook-form
```

### 2. Created Files

**Type Definitions:**

- `src/types/employee.ts` - Employee form data interface

**Services:**

- `src/services/employeeService.ts` - API service for backend communication

**Utilities:**

- `src/utils/fieldMapping.ts` - Field name mapping and data conversion

**Documentation:**

- `IMPLEMENTATION.md` - Detailed implementation guide

### 3. Updated Files

**Form Input Components** (All support React Hook Form now):

- `src/component/formFields/TextInput.tsx`
- `src/component/formFields/SelectInput.tsx`
- `src/component/formFields/DateInput.tsx`
- `src/component/formFields/FileInput.tsx`
- `src/component/formFields/ImageInput.tsx`
- `src/component/formFields/CheckboxInput.tsx`
- `src/component/formFields/FormFieldSelector.tsx`
- `src/component/formFields/FormGrid.tsx`

**Form Sections:**

- `src/component/employeeForms/PrimaryForm.tsx`
- `src/component/employeeForms/OfficialForm.tsx`
- `src/component/employeeForms/PersonalForm.tsx`
- `src/component/employeeForms/FinanceForm.tsx`
- `src/component/employeeForms/PayrollForm.tsx`
- `src/component/employeeForms/OthersForm.tsx`
- `src/component/employeeForms/LeaveForm.tsx`
- `src/component/employeeForms/DocumentsForm.tsx`
- `src/component/employeeForms/GeneralForm.tsx`
- `src/component/employeeForms/DependantForm.tsx`

**Main Component:**

- `src/pages/employee/Registration.tsx` - Main form with submission logic

## 🚀 How It Works

### 1. Form Initialization

```tsx
const { control, handleSubmit, reset } = useForm({
  defaultValues: getDefaultFormValues(),
  mode: "onBlur",
});
```

### 2. Form Submission

When the user clicks "Submit Employee":

1. Form validates all required fields
2. Data is converted from camelCase to snake_case
3. POST request sent to: `https://mechrisoft.com/mechriapi/postemployee`
4. Success/error notification displayed
5. Form reset on success

### 3. Field Validation

- Required fields show asterisk (\*)
- Validation errors appear below fields
- Validates on blur (when field loses focus)

## 📋 Backend API

**Endpoint:** `https://mechrisoft.com/mechriapi/postemployee`

**Method:** POST

**Content-Type:** application/json

**Sample Payload:**

```json
{
  "staff_Code": "EMP001",
  "staff_Name": "John Doe",
  "branch": "Main Branch",
  "department": "IT",
  "personal_Email": "john@example.com",
  "joining_Date": "2025-12-05",
  "employee_Category": "Full-Time",
  "official_Email": "john.doe@company.com",
  "status": "Active",
  "nationality": "USA",
  "uaE_Mobile_No": "0501234567"
}
```

## 🎯 Key Features

✅ **Type-Safe**: Full TypeScript support with generics
✅ **Validated**: Required field validation with error messages  
✅ **Responsive**: Works on all screen sizes
✅ **User-Friendly**: Loading states, success/error notifications
✅ **Maintainable**: Clean separation of concerns
✅ **Extensible**: Easy to add new fields or validation rules

## 🧪 Testing the Form

1. **Start the development server:**

   ```bash
   npm start
   ```

2. **Navigate to Employee Registration page**

3. **Fill in required fields** (marked with \*)

4. **Click "Submit Employee"**

5. **Watch for:**
   - Loading spinner on submit button
   - Success notification (green) or error notification (red)
   - Form reset on success
   - Console logs for debugging

## 🔧 Customization

### Add a New Field

1. **Add to type definition** (`src/types/employee.ts`):

   ```typescript
   export interface EmployeeFormData {
     // ... existing fields
     new_Field: string;
   }
   ```

2. **Add to field mapping** (`src/utils/fieldMapping.ts`):

   ```typescript
   export const fieldNameMapping = {
     // ... existing mappings
     newField: "new_Field",
   };
   ```

3. **Add to form** (e.g., `PrimaryForm.tsx`):
   ```typescript
   const fields = [
     // ... existing fields
     {
       name: "newField",
       label: "New Field",
       type: "text",
       required: true,
     },
   ];
   ```

### Change Validation Mode

In `Registration.tsx`:

```typescript
const { control } = useForm({
  defaultValues: getDefaultFormValues(),
  mode: "onChange", // or "onSubmit", "onTouched", "all"
});
```

### Add Custom Validation

```typescript
{
  name: "email",
  label: "Email",
  type: "email",
  required: true,
  rules: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address"
    }
  }
}
```

## 📝 Notes

- The `control` prop is optional in FormGrid for backward compatibility
- Some forms (Documents, General, Dependant) maintain separate state for DataGrids
- All date fields expect format: YYYY-MM-DD
- File uploads store filename only (actual upload needs to be implemented separately)

## 🐛 Troubleshooting

**Form not submitting?**

- Check browser console for errors
- Verify all required fields are filled
- Check network tab for API response

**Fields not validating?**

- Ensure `control` prop is passed to form components
- Check field names match between form and mapping

**API errors?**

- Verify backend URL is accessible
- Check payload format matches backend expectations
- Review CORS settings if needed

## 📚 Learn More

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Material-UI Documentation](https://mui.com/)
- See `IMPLEMENTATION.md` for detailed architecture
