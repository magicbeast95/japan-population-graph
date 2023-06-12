// RESAS-API からのエラー
export type ResasError = {
  statusCode: string
  message: string
  description: string
}

export const isResasError = (error: unknown): error is ResasError =>
  !!(error as ResasError).statusCode

export const isResasErrorUnrecoverable = (error: ResasError): boolean => {
  const status = error.statusCode
  return status === '400' || status === '403' || status === '404'
}

// RESAS-API 呼び出しの結果
export type ResasResult<T> = Pick<ResasError, 'message'> & {
  result?: T
}

// RESAS-API からのレスポンス
export type ResasResponse<T> = ResasError | ResasResult<T>
