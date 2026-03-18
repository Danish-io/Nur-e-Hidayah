import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        }),
        // Simulated Mobile OTP Provider
        CredentialsProvider({
            id: "mobile-otp",
            name: "Mobile OTP",
            credentials: {
                phoneNumber: { label: "Phone Number", type: "tel", placeholder: "+1234567890" },
                otp: { label: "OTP Code (Use 1234)", type: "text", placeholder: "1234" },
            },
            async authorize(credentials) {
                // Mock Verification logic
                if (credentials?.otp === "1234" && credentials?.phoneNumber) {
                    return {
                        id: "mobile_user_" + credentials.phoneNumber,
                        name: "Mobile User " + credentials.phoneNumber.slice(-4),
                        email: credentials.phoneNumber + "@mobile.com",
                        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + credentials.phoneNumber,
                    };
                }
                return null;
            },
        }),
        // Mock Provider for Demo Account
        CredentialsProvider({
            id: "demo-account",
            name: "Demo Account",
            credentials: {
                username: { label: "Name", type: "text", placeholder: "Danish" },
            },
            async authorize(credentials) {
                // Return a mock user
                return {
                    id: "mock_user_1",
                    name: credentials?.username || "Danish",
                    email: "danish@example.com",
                    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Danish",
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            return session;
        },
    },
    // Ensure we are on the correct port if running on 3005
    // NEXTAUTH_URL should be set in .env, but we can try to infer or warn.
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
