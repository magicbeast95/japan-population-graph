import customAxios from './customAxios'
import { ResasError } from '@/types/ResasResponse'

/* RESAS-API のエラーはレスポンス本文の
 * ステータスコードで表現されるため、
 * 手動で例外を発生させる必要がある
 */
const fetcher = <T>(url: string): Promise<T> =>
  customAxios.get(url).then((res) => {
    // RESAS-API の謎仕様…
    // 400番だけ JSON ではなく文字列になっている
    if (res.data === '400')
      // ResasError に変換し、例外を発生させる
      throw {
        statusCode: '400',
        message: 'Bad Request',
        description: '',
      } as ResasError

    // RESAS-API 呼び出しに失敗した場合
    if ((res.data as ResasError)?.statusCode) {
      throw res.data as ResasError
    }
    return res.data
  })

export { fetcher }
