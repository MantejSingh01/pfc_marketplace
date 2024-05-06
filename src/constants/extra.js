import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import { axisClasses } from "@mui/x-charts";

export const pagesInfo = [
  { text: "onBoarding", icon: HandshakeOutlinedIcon, link: "onboard" },
  { text: "KYC", icon: HowToRegOutlinedIcon, link: "kyc" },
  { text: "Listing", icon: ReceiptLongOutlinedIcon, link: "listing" },
  { text: "Material Selection", icon: HandymanOutlinedIcon, link: "material" },
];
export const chartSetting = {
  xAxis: [
    {
      label: "Weekly Sales",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
export const dataset = [
  {
    sales: 300,
    expected: 500,
    day: "Monday",
  },
  {
    sales: 30,
    expected: 500,
    day: "Tuesday",
  },
  {
    sales: 900,
    expected: 500,
    day: "Wednesday",
  },
  {
    sales: 200,
    expected: 500,
    day: "Thusday",
  },
  {
    sales: 200,
    expected: 500,
    day: "Friday",
  },
  {
    sales: 70,
    expected: 500,
    day: "Saturday",
  },
  {
    sales: 90,
    expected: 500,
    day: "Sunday",
  },
];

export const pieData = [
  { value: 5, label: "On Boarded" },
  { value: 10, label: "KYC" },
  { value: 15, label: "Listing" },
  { value: 15, label: "Material Listing" },
  { value: 10, label: "Payments" },
];

export const pieSize = {
  width: 500,
  height: 280,
};

export const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject.toISOString().substring(0, 10);
};

export const fieldValuesObj = {
  user: {
    tableHeaders: ["User", "Date of Onboarding", "Email", "KYC Status"],
    tableItems: ["name", "createdAt", "email", "isKYCDone"],
    formFields: [
      { field: "Name", type: "text", dbField: "name" },
      { field: "Company Name", type: "text", dbField: "companyName" },
      { field: "Email", type: "email", dbField: "email" },
      { field: "Designation", type: "text", dbField: "designation" },

      { field: "Phone Number", type: "phoneNumber", dbField: "phoneNumber" },
      { field: "Industry Category", type: "text", dbField: "industryCategory" },

      {
        field: "Tax ID or Business Registration Number",
        type: "number",
        dbField: "taxID",
      },
      {
        field: "Document upload for business credentials",
        type: "upload",
        dbField: "businessDoc",
        class: "default",
      },
      {
        field: "Business Address",
        type: "richtext",
        dbField: "businessAddress",
      },
      {
        field: "Licences or Certifications",
        type: "upload",
        dbField: "licencesCertifications",
      },
    ],
  },
  kyc: {
    tableHeaders: [
      "Acceptance Terms",
      "Comply with Policies",
      "GST Details",
      "Aadhar Number",
      "PAN Number",
      "Emergency Contact",
      "Account Holder Name",
      "Account Number",
      "Bank Name",
      "IFSC Code",
      "Cancel Cheque",
    ],
    tableItems: [
      "userId",
      "acceptanceTerms",
      "complyWithPolicies",
      "gstDetails",
      "aadharNumber",
      "panNumber",
      "emergencyContact",
      "bankDetails.accountHolderName",
      "bankDetails.accountNumber",
      "bankDetails.bankName",
      "bankDetails.ifscCode",
      "bankDetails.cancelCheque",
    ],
    formFields: [
      { field: "GST Details", type: "text", dbField: "gstDetails" },
      {
        field: "Aadhar Number",
        type: "number",
        unique: true,
        dbField: "aadharNumber",
      },
      { field: "Pan Number", type: "text", unique: true, dbField: "panNumber" },
      {
        field: "Emergency Contact",
        type: "number",
        dbField: "emergencyContact",
      },
      {
        field: "Account Holder Name",
        type: "text",
        dbField: "bankDetails.accountHolderName",
      },
      {
        field: "Account Number",
        type: "number",
        unique: true,
        dbField: "bankDetails.accountNumber",
      },
      { field: "Bank Name", type: "text", dbField: "bankDetails.bankName" },
      { field: "Ifsc Code", type: "text", dbField: "bankDetails.ifscCode" },

      {
        field: "Acceptance Terms",
        type: "Checkbox",
        dbField: "acceptanceTerms",
      },
      {
        field: "Cancel Cheque",
        type: "upload",
        dbField: "bankDetails.cancelCheque",
      },
      {
        field: "Comply With Policies",
        type: "Checkbox",
        dbField: "complyWithPolicies",
      },
    ],
  },
  listing: {
    tableHeaders: [
      "Material Type",
      "Available Quantity",
      "Offered Price",
      "Packaging",
      "Availability Date",
    ],
    tableItems: [
      "materialType",
      "availableQuantity",
      "offeredPrice",
      "packaging",
      "availabilityDate",
    ],
    formFields: [
      { field: "Description", type: "text", dbField: "description" },
      {
        field: "Pricing Structure",
        type: "number",
        dbField: "pricingStructure",
        extra: "decimal",
      },
      {
        field: "Material Description",
        type: "text",
        dbField: "materialDescription",
      },
      {
        field: "Dimensions",
        type: "text",
        parent: "Material Specifications",
        dbField: "materialSpecifications.dimensions",
      },
      {
        field: "Weight",
        type: "text",
        dbField: "materialSpecifications.weight",
      },
      { field: "Color", type: "text", dbField: "materialSpecifications.color" },
      {
        field: "Available quantity for listing",
        type: "number",
        dbField: "availableQuantity",
        extra: "decimal",
      },
      {
        field: "Offered Price",
        type: "number",
        dbField: "offeredPrice",
        extra: "decimal",
      },
      {
        field: "Expected Cost Per Kg",
        type: "number",
        dbField: "expectedCostPerKg",
        extra: "decimal",
      },
      {
        field: "Current Stock Status",
        type: "number",
        dbField: "currentStockStatus",
        extra: "decimal",
      },

      {
        field: "Material Type",
        type: "dropdown",
        options: ["PP", "HDPE", "PET"],
        dbField: "materialType",
      },
      {
        field: "Packaging",
        type: "dropdown",
        options: ["Jumbo bags", "Gunny Bags", "Loose", "Bailed"],
        dbField: "packaging",
      },
      { field: "Availability Date", type: "date", dbField: "availabilityDate" },
      {
        field: "BulkListing Timeline",
        type: "number",
        dbField: "bulkListingTimeline",
      },
      {
        field: "Showcasing the material quality",
        type: "upload",
        dbField: "materialQualityImage",
      },
    ],
  },
  material: {
    tableHeaders: [
      "Material",
      "Price",
      "Logistics",
      "Quantity",
      "Quality Check",
      "Payment Information",
    ],
    tableItems: [
      "materialConfirmation",
      "priceConfirmation",
      "logisticsConfirmation",
      "quantityConfirmation",
      "qualityCheck",
      "paymentInformation",
    ],
    formFields: [
      {
        field: "Material Confirmation",
        type: "dropdown",
        options: ["Confirmed", "In progress", "Pending"],
        required: true,
        dbField: "materialConfirmation",
      },
      {
        field: "Price Confirmation",
        extra: "decimal",
        type: "number",
        dbField: "priceConfirmation",
      },
      {
        field: "Logistics Confirmation",
        type: "dropdown",
        options: ["Arrange by vendor", "Arrange by PFC"],
        required: true,
        dbField: "logisticsConfirmation",
      },
      {
        field: "Quantity Confirmation",
        extra: "decimal",
        type: "number",
        dbField: "quantityConfirmation",
      },
      {
        field: "Quality Check",
        type: "dropdown",
        options: ["Pass", "Fail"],
        required: true,
        dbField: "qualityCheck", 
      },
      {
        field: "Seller's Consent",
        type: "text",
        dbField: "sellersConsent", 
      },
      {
        field: "Payment Information",
        type: "dropdown",
        options: ["15 days", "immediate", "after unloading"],
        required: true,
        dbField: "paymentInformation", 
      },
    ],
  },
};
