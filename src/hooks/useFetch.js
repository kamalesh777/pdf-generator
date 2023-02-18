import Axios from '@/axios'
import useSWR from 'swr'
import Cookie from 'js-cookie'

function useFetch(apiUrl) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = async () => {
    try {
      const response = await Axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${Cookie.get('auth_token')}`,
        },
      })
      return response.data
    } catch (err) {
      return err.message
    }
  }
  const { data, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data,
    error,
    isLoading,
  }
}

export default useFetch
