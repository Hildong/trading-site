import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Home from './Pages/Home';

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
        <ReactQueryDevtools />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
