import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { env } from "./lib/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/db";
import * as schema from "@/db/schema";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    sessionsTable: schema.sessions,
    verificationTokensTable: schema.verificationTokens,
  }),
  providers: [
    {
      id: "gumroad",
      name: "Gumroad",
      type: "oauth",
      version: "2.0",
      token: "https://api.gumroad.com/oauth/token",
      authorization: {
        url: "https://gumroad.com/oauth/authorize",
        params: {
          scope: "view_profile edit_products",
        },
      },
      userinfo: "https://api.gumroad.com/v2/user",
      clientId: env.GUMROAD_OAUTH_CLIENT_ID,
      clientSecret: env.GUMROAD_OAUTH_CLIENT_SECRET,
      profile: async (profileData: { user: { id: string; name: string; email: string } }) => {
        return {
          id: profileData.user.id,
          name: profileData.user.name,
          email: profileData.user.email,
        };
      },
    },
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.user.id = user.id;
      return session;
    },
  },
};

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
