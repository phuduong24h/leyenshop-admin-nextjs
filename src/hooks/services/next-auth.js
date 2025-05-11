import CredentialsProvider from 'next-auth/providers/credentials';

import { API } from 'constants/common';
import { Routes } from 'routes';
import { Fetcher } from 'utils';

const login = async body => {
  try {
    const response = await Fetcher().post(API.AUTH.LOGIN, body);
    return response;
  } catch (error) {
    return error;
  }
};

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  cookies: {
    pkceCodeVerifier: {
      name: 'next-auth.pkce.code_verifier',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  },
  providers: [
    CredentialsProvider({
      name: 'Le Yen Shop',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'john.doe@example.com'
        },
        phone: {
          label: 'Phone',
          type: 'text',
          placeholder: '09123123123'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Your super secure password'
        }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('INTERNAL_SERVER_ERROR');
        }

        const { email, phone, password } = credentials || {};
        const response = await login({ email, phone, password });

        if (response?.success) {
          const { fullName } = response?.data?.user || {};
          return {
            token: response?.data?.token,
            name: fullName,
            ...(response?.data?.user || {})
          };
        }

        throw new Error(JSON.stringify(response));
      }
    })
  ],
  callbacks: {
    async signIn(response) {
      return response;
    },
    jwt: async ({ token, user, account, session }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    }
  },
  pages: {
    error: Routes.TRANG_CHU
  }
};
