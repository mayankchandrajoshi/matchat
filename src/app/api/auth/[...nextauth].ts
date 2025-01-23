import NextAuth from 'next-auth';

export default NextAuth({
    providers: [
        
    ],
    callbacks: {
        async session({ session, token }) {
        return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
