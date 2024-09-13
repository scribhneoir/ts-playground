interface BaseResult {
  success: boolean;
  message?: string;
  context?: Record<string, any>;
}

interface SuccessResult<T> extends BaseResult {
  success: true;
  data: T;
}

interface FailureResult extends BaseResult {
  success: false;
  data?: never;
}

export type Result<T = any> = SuccessResult<T> | FailureResult;
