# 📝 Scribea
Scribea is a unique platform that focuses on providing a seamless and efficient writing experience. It's a simple and engaging platform inspired by the concept of Google Docs but with a more user-friendly and intuitive approach.

<p align="center">
 <img alt="Scribea Home Page" src="https://github.com/YourUsername/scribea-app/assets/homepage.png" width="70%">
</p>

# Features
### User Dashboard
The platform allows each user to have their own dashboard. Here, all the documents they've created are displayed. This personal space serves as a hub for their writing projects and collaborations.

### Document Editor
At the core of Scribea is the document editor, which presents a clean and distraction-free writing environment. It's a space where users can focus on their writing and collaborate with others in real-time.

### PDF Indexing and Search
Scribea uses Pinecone to index PDF documents, enabling efficient and accurate search across the documents. This feature allows users to quickly find the information they need within their documents.

### Contextual Suggestions
With the integration of OpenAI, Scribea provides contextual suggestions based on the content of the documents. This feature enhances the writing experience by providing relevant suggestions and corrections.

# Technical Details
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,planetscale,tailwind,react,typescript,prisma" />
  <img src="https://trpc.io/img/logo.svg" width="48px" height="48px" />
</p>

Scribea utilises a modern tech stack and infrastructure including: Next.js, Planetscale, Tailwind, React, Typescript, Prisma, TRPC, OpenAI, and Pinecone.

### tRPC for Type Safety
Implementing tRPC, Scribea ensures robust type safety across its client-server communication. This choice greatly reduces the chances of bugs related to type mismatches, enhancing the overall stability of the application.

### Clerk for User Authentication
For user authentication, Scribea integrates Clerk. This not only streamlines the sign-in and registration processes but also fortifies the platform’s security, safeguarding user information and access rights.

### Next.js and Planetscale for Performance and Scalability
The application is built using Next.js, offering a flexible and high-performance framework for the web frontend. Planetscale supports the backend with its scalable, serverless database platform, ensuring that Scribea remains responsive and efficient as its user base grows.

### Zod for Form Validation
Zod is employed to validate forms, an essential aspect to maintain the integrity of user input. It helps in preventing erroneous or malicious data entries, thus enhancing the reliability of the platform.

### Database Management with Prisma
Prisma is used for efficient database management. Its role as an ORM tool simplifies database queries and schema management. Prisma's auto-generated types are particularly beneficial, enhancing the app’s type safety in harmony with tRPC’s capabilities.

### OpenAI for Contextual Suggestions
Scribea integrates OpenAI to provide contextual suggestions based on the content of the documents. This AI-powered feature enhances the writing experience by providing relevant suggestions and corrections.

### Pinecone for PDF Indexing and Search
Scribea uses Pinecone to index PDF documents, enabling efficient and accurate search across the documents. This feature allows users to quickly find the information they need within their documents.
