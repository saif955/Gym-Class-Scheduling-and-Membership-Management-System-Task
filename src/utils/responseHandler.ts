interface ErrorDetails {
  field?: string;
  message: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  statusCode?: number;
  errorDetails?: ErrorDetails | string;
  data?: any;
}

export const successResponse = (
  message: string,
  data: any = null,
  statusCode: number = 200
): ApiResponse => {
  return {
    success: true,
    message,
    statusCode,
    data
  };
};

export const validationErrorResponse = (
  field: string,
  message: string
): ApiResponse => {
  return {
    success: false,
    message: "Validation error occurred.",
    errorDetails: {
      field,
      message
    }
  };
};

export const unauthorizedResponse = (message: string): ApiResponse => {
  return {
    success: false,
    message: "Unauthorized access.",
    errorDetails: message
  };
};

export const limitExceededResponse = (message: string): ApiResponse => {
  return {
    success: false,
    message
  };
};

export const scheduleLimitExceededResponse = (): ApiResponse => {
  return {
    success: false,
    message: "Maximum 5 schedules per day limit exceeded."
  };
};
