export interface ErrorDetails {
    field?: string;
    message: string;
}

export interface ApiResponse {
    success: boolean;
    message: string;
    statusCode?: number;
    errorDetails?: ErrorDetails | string;
    data?: any;
}