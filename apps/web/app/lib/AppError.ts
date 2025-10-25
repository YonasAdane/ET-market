export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "AppError";
    
    // Ensure the prototype is set correctly
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, AppError.prototype);
    } else {
      (this as any).__proto__ = AppError.prototype;
    }
  }
}

export function isAppError(error: any): error is AppError {
  return error instanceof Error && error.name === "AppError";
}