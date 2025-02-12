// app/api/uploadthing/route.ts
import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    appId: process.env.UPLOADTHING_APP_ID, // Use the correct property name
    appSecret: process.env.UPLOADTHING_SECRET, // Use the correct property name
  },
});