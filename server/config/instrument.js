// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://79adea3746ffe15962e232ea4d21705e@o4509691545714688.ingest.us.sentry.io/4509719128506368",
 integrations: [Sentry.mongooseIntegration()],
     
  
 

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
 
});