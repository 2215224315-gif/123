FROM node:22-alpine
WORKDIR /app
COPY apps/api/package.json ./package.json
RUN npm install --omit=dev
COPY apps/api/src ./src
ENV NODE_ENV=production
EXPOSE 4000
CMD ["npm", "start"]
