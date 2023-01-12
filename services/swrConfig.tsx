import AxiosAPI from 'services/AxiosAPI';
import { SWRConfig } from 'swr';

const fetcher = (url: string) => AxiosAPI.get(url).then(res => res.data);

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
