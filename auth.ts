import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next";
import type { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import { env } from "./lib/env";

export const authOptions: NextAuthOptions = {
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
};

// Use it in server contexts
export function auth(
  ...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []
) {
  return getServerSession(...args, authOptions);
}
