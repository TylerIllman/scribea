# 📝 Scribea
Scribea is a user-friendly platform that lets you interact with PDF documents in a chat-like interface. It simplifies information retrieval by providing direct responses from the document content to your questions.

<p align="center">
<img width="70%" alt="Scribea Home Page" src="https://github.com/TylerIllman/scribea/assets/124550621/25216eae-d553-4096-8651-2fbe6134b8be">
</p>

# Features
### User Dashboard
The platform allows each user to have their own dashboard. Here, all the documents they've created are displayed. This personal space serves as a hub for their writing projects and collaborations.

<p align="center">
  <img width="70%" alt="Screenshot 2024-01-16 at 12 16 26 pm" src="https://github.com/TylerIllman/scribea/assets/124550621/b9408a03-8370-4e69-9205-d432ee6a8603">
</p>

### Document Chat Page
At the core of Scribea is the document chat page, this page allows you to chat directly with the document as well as a document viewer.

<p align="center">
  <img width="70%" alt="Screenshot 2024-01-16 at 12 18 19 pm" src="https://github.com/TylerIllman/scribea/assets/124550621/ae26173b-7630-4c39-bdf5-af4d2fc869b4">
</p>

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

### PDF Indexing and Search
Scribea uses Pinecone to index PDF documents, this allows Scribea to search the document for the most relative information and then provide this as context for the chat completion API.

### Stripe Payments Integration
Scribea uses Stripe to facilitate payments for the pro plan. Pro Scribea memebers are able to send larger documents.
