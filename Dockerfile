ARG REGISTRY_HOSTNAME
ARG NODE_VERSION

ARG ARTIFACTORY_REGISTRY_USERNAME
ARG ARTIFACTORY_REGISTRY_PASSWORD
ARG ARTIFACTORY_NPM_REGISTRY_AUTHURL
ARG NPM_TOKEN_SANOFI_ELEMENTS

FROM ${REGISTRY_HOSTNAME}/node:${NODE_VERSION}-slim AS base

ENV CYPRESS_INSTALL_BINARY 0
# ENV NO_PROXY cloud.local,sanofi.com,docker
# ENV HTTP_PROXY http://emea-aws-webproxy.service.cloud.local:3128
# ENV HTTPS_PROXY http://emea-aws-webproxy.service.cloud.local:3128
# RUN npm config set proxy http://emea-aws-webproxy.service.cloud.local:3128
RUN npm config set @sanofi:registry https://sanofi.jfrog.io/sanofi/api/npm/npm-iadc-local/
COPY --from=sanofi-docker-innersource-local.jfrog.io/debian:bookworm /etc/ssl/certs/ca-certificates.crt /app/certs/ca
ENV NODE_EXTRA_CA_CERTS /app/certs/ca
ENV CURL_CA_BUNDLE /app/certs/ca

RUN apt-get update && apt-get install curl python3 python3-dev python3-pip build-essential libffi-dev libssl-dev libc-dev libseccomp-dev -y

FROM base AS deps

ARG ARTIFACTORY_REGISTRY_USERNAME
ARG ARTIFACTORY_REGISTRY_PASSWORD
ARG ARTIFACTORY_NPM_REGISTRY_AUTHURL

WORKDIR /app

COPY --from=sanofi-docker-innersource-local.jfrog.io/debian:bookworm /etc/ssl/certs/ca-certificates.crt /app/certs/ca
ENV NODE_EXTRA_CA_CERTS /app/certs/ca
ENV CURL_CA_BUNDLE /app/certs/ca
RUN curl -u "${ARTIFACTORY_REGISTRY_USERNAME}:${ARTIFACTORY_REGISTRY_PASSWORD}" ${ARTIFACTORY_NPM_REGISTRY_AUTHURL} >> ~/.npmrc

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

COPY --from=sanofi-docker-innersource-local.jfrog.io/debian:bookworm /etc/ssl/certs/ca-certificates.crt /app/certs/ca
ENV NODE_EXTRA_CA_CERTS /app/certs/ca
ENV CURL_CA_BUNDLE /app/certs/ca
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs


# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next
RUN chmod 775 /app
RUN chown nextjs:nodejs /app
RUN npm config set cache /app/.npm --global

COPY --from=builder --chown=nextjs:nodejs /app/next.config.mjs ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./
COPY --from=builder --chown=nextjs:nodejs /app/entrypoint.sh ./entrypoint.sh
COPY --from=builder --chown=nextjs:nodejs /app/env.sh ./env.sh

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
Copy --from=builder --chown=nextjs:nodejs /app/start.sh ./start.sh
COPY --from=builder --chown=nextjs:nodejs /app/certs/ca ./certs/ca

USER nextjs
EXPOSE 3000
ENV PORT 3000

RUN chmod +x ./entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
CMD ["/bin/bash", "/app/start.sh"]
