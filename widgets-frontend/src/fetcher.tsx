import { Fetcher } from 'openapi-typescript-fetch';
import { paths } from './openapi-schema';


const fetcher = Fetcher.for<paths>()

// global configuration
fetcher.configure({
  baseUrl: 'http://localhost:8000',  // TODO: Load from environment variable on transpile
})


const api = {
  listWidgets: fetcher.path('/api/v1/widgets').method('get').create(),
  createWidget: fetcher.path('/api/v1/widgets').method('post').create(),
  updateWidget: fetcher.path('/api/v1/widgets/{id}').method('put').create(),
  deleteWidget: fetcher.path('/api/v1/widgets/{id}').method('delete').create(),
}

export default api