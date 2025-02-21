export default authMiddleware({
    publicRoutes: ['/', '/users/(.*)', '/login', '/register'],
    ignoredRoutes: ['/api/webhooks/(.*)'],
});

function authMiddleware({ publicRoutes, ignoredRoutes }: { publicRoutes: string[]; ignoredRoutes: string[]; }) {
    // Example usage of the parameters
    console.log('Public Routes:', publicRoutes);
    console.log('Ignored Routes:', ignoredRoutes);
    
    throw new Error("Function not implemented.");
}