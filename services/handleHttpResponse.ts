import cookie from 'cookie';
import { API_BASE_URL, API_BASE_URL_EU, API_CLIENT, API_KEY_ADMIN, API_KEY_ADMIN_EU } from '../settings/base.config';

const isEurope = typeof window !== 'undefined' ? window.location.host.includes('eu-accounts') || window.location.host.includes('eu.accounts') : false;

const apiKey = isEurope ? API_KEY_ADMIN_EU : API_KEY_ADMIN;
const apiUrl = isEurope ? API_BASE_URL_EU : API_BASE_URL;

type CompanyCookie = {
  id: number;
  name: string;
  code: string;
};

type UserCookie = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  file_id: string;
  locked: boolean;
  verified: boolean;
  active: boolean;
  deleted: boolean;
  is_system: boolean;
  locations: {
    id: number;
    groups: {
      name: string;
    }[];
  }[];
};

type Session = {
  user: UserCookie;
  company: CompanyCookie;
  token: string;
};

type SessionCookies = Record<keyof Session, string>;

const handleHttpResponse = () => {
  const invalidSessionMessages = ['Invalid User Token', 'Missing UserToken'];
  const invalideSessionCodes = [401];

  const getSession = () => {
    if (typeof window === 'undefined') {
      return {};
    }
    const cookies: SessionCookies = cookie.parse(document.cookie) || {};
    const company: CompanyCookie = cookies.company && JSON.parse(cookies.company);

    const authorization = 'Basic ' + Buffer.from(API_CLIENT + ':' + apiKey).toString('base64');
    const baseURL = company ? `${apiUrl}/admin/${String(company?.code || '')}/process.api` : `${apiUrl}/admin/process.api`;
    const token = cookies.token || '';

    return {
      authorization,
      baseURL,
      token,
    };
  };

  const errorSession = async (code: number, message: string): Promise<{ error: boolean; message: string }> => {
    return new Promise((resolve) => {
      if (invalidSessionMessages.includes(message) || invalideSessionCodes.includes(code)) {
        clearSession(code);
        return setTimeout(() => {
          resolve({ error: true, message });
        }, 500);
      }
      return resolve({ error: false, message });
    });
  };

  const hasSession = () => {
    const cookies: Partial<SessionCookies> = cookie.parse(document.cookie) || {};
    if (!cookies.token || !cookies.company || !cookies.user) {
      clearSession(401);
      return false;
    }
    return true;
  };

  const clearSession = async (code: number) => {
    return new Promise((resolve) => {
      document.cookie = cookie.serialize('user', null, { expires: new Date(1900, 1, 1) });
      document.cookie = cookie.serialize('company', null, { expires: new Date(1900, 1, 1) });
      document.cookie = cookie.serialize('token', null, { expires: new Date(1900, 1, 1) });
      const lastPage = window.sessionStorage.getItem('lastPage');
      window.localStorage.clear();
      window.sessionStorage.clear();
      lastPage && window.sessionStorage.setItem('lastPage', lastPage);
      return setTimeout(() => {
        return resolve({ ok: true });
      }, 1000);
    });
  };

  const setSession = async ({ token, company, user }) => {
    return new Promise((resolve) => {
      document.cookie = cookie.serialize('company', JSON.stringify(company), { maxAge: 3600 });
      document.cookie = cookie.serialize('token', token, { maxAge: 3600 });
      document.cookie = cookie.serialize('user', JSON.stringify(user), { maxAge: 3600 });

      return setTimeout(() => {
        return resolve({ ok: true });
      }, 1000);
    });
  };

  return {
    setSession,
    clearSession,
    hasSession,
    errorSession,
    getSession,
  };
};

export default handleHttpResponse;
