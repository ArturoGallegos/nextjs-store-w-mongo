import axios from 'axios';
import { SWRConfig } from 'swr';

const fetcher = (url: string) => axios.get(`http://localhost:3000/api${url}`).then(res => res.data);

const SwrConfig: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 100,
        fetcher
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrConfig;
