import axios from 'axios'
import useSWR from 'swr'

function useFetch(apiUrl) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const fetcher = async () => {
    try {
      const response = await axios.get(apiUrl)
      return response.data
    } catch (err) {
      return err.message
    }
  }
  const { data, error, isLoading } = useSWR('/api/data', fetcher)

  return {
    data,
    error,
    isLoading,
  }
}

export default useFetch
