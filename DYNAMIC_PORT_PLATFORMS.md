# Platforms with Dynamic Ports vs Fixed Ports

This document lists hosting platforms and whether they use **dynamic ports** (require PORT environment variable) or **fixed ports**.

## 🔄 Platforms with Dynamic Ports

These platforms assign a random port at runtime and require your application to listen on the `PORT` environment variable.

### 1. **Railway** ✅
- **Port Variable:** `PORT`
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes
- **Notes:** Automatically sets PORT, requires Dockerfile to use it
- **Website:** https://railway.app

### 2. **Render** ✅
- **Port Variable:** `PORT`
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes
- **Notes:** Sets PORT automatically for Docker containers
- **Website:** https://render.com

### 3. **Fly.io** ✅
- **Port Variable:** `PORT` (or can use `$PORT`)
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes
- **Notes:** Uses dynamic ports, can also configure in fly.toml
- **Website:** https://fly.io

### 4. **Heroku** ✅
- **Port Variable:** `PORT`
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes (via Container Registry)
- **Notes:** Classic platform, requires PORT env var
- **Website:** https://www.heroku.com

### 5. **Northflank** ✅
- **Port Variable:** `PORT`
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes
- **Notes:** Similar to Railway, uses dynamic ports
- **Website:** https://northflank.com

### 6. **DigitalOcean App Platform** ✅
- **Port Variable:** `PORT`
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes
- **Notes:** Automatically sets PORT for containers
- **Website:** https://www.digitalocean.com/products/app-platform

### 7. **Google Cloud Run** ✅
- **Port Variable:** `PORT`
- **Default Port:** 8080 (default, but can be overridden)
- **Docker Support:** ✅ Yes
- **Notes:** Uses PORT env var, defaults to 8080 if not set
- **Website:** https://cloud.google.com/run

### 8. **AWS App Runner** ✅
- **Port Variable:** `PORT`
- **Default Port:** 8080 (default, but can be overridden)
- **Docker Support:** ✅ Yes
- **Notes:** Uses PORT env var for containerized apps
- **Website:** https://aws.amazon.com/apprunner/

### 9. **Azure Container Instances** ✅
- **Port Variable:** `PORT` (or custom)
- **Default Port:** Configurable
- **Docker Support:** ✅ Yes
- **Notes:** Can use dynamic ports or fixed ports
- **Website:** https://azure.microsoft.com/services/container-instances/

### 10. **Kubernetes (K8s)** ✅
- **Port Variable:** Configurable (often `PORT` or service-specific)
- **Default Port:** Service-dependent
- **Docker Support:** ✅ Yes
- **Notes:** Ports configured via Service/Deployment manifests
- **Website:** https://kubernetes.io

### 11. **Docker Swarm** ✅
- **Port Variable:** Configurable
- **Default Port:** Service-dependent
- **Docker Support:** ✅ Yes
- **Notes:** Uses service discovery, ports can be dynamic
- **Website:** https://docs.docker.com/engine/swarm/

### 12. **Koyeb** ✅
- **Port Variable:** `PORT`
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes
- **Notes:** Serverless platform with dynamic ports
- **Website:** https://www.koyeb.com

### 13. **Zeabur** ✅
- **Port Variable:** `PORT`
- **Default Port:** Random (assigned at runtime)
- **Docker Support:** ✅ Yes
- **Notes:** Similar to Railway/Vercel, uses dynamic ports
- **Website:** https://zeabur.com

### 14. **Coolify** ✅
- **Port Variable:** `PORT` (or configurable)
- **Default Port:** Configurable
- **Docker Support:** ✅ Yes
- **Notes:** Self-hosted platform, supports dynamic ports
- **Website:** https://coolify.io

## 🔒 Platforms with Fixed Ports

These platforms use fixed ports (usually 80/443 or a specific port you configure).

### 1. **Vercel**
- **Port:** Not applicable (serverless)
- **Docker Support:** ❌ No (uses native build system)
- **Notes:** Serverless platform, doesn't use traditional ports
- **Website:** https://vercel.com

### 2. **Netlify**
- **Port:** Not applicable (serverless)
- **Docker Support:** ❌ Limited (only for build, not runtime)
- **Notes:** Serverless platform, static hosting
- **Website:** https://www.netlify.com

### 3. **AWS EC2 / Lightsail**
- **Port:** Fixed (you configure)
- **Docker Support:** ✅ Yes
- **Notes:** You control the port configuration
- **Website:** https://aws.amazon.com

### 4. **DigitalOcean Droplets**
- **Port:** Fixed (you configure)
- **Docker Support:** ✅ Yes
- **Notes:** You control the port configuration
- **Website:** https://www.digitalocean.com

### 5. **Linode / Akamai**
- **Port:** Fixed (you configure)
- **Docker Support:** ✅ Yes
- **Notes:** You control the port configuration
- **Website:** https://www.linode.com

### 6. **Hetzner Cloud**
- **Port:** Fixed (you configure)
- **Docker Support:** ✅ Yes
- **Notes:** You control the port configuration
- **Website:** https://www.hetzner.com

### 7. **Vultr**
- **Port:** Fixed (you configure)
- **Docker Support:** ✅ Yes
- **Notes:** You control the port configuration
- **Website:** https://www.vultr.com

### 8. **Scaleway**
- **Port:** Fixed (you configure)
- **Docker Support:** ✅ Yes
- **Notes:** You control the port configuration
- **Website:** https://www.scaleway.com

## 📊 Comparison Table

| Platform | Dynamic Port | PORT Variable | Docker Support | Best For |
|----------|--------------|---------------|----------------|----------|
| Railway | ✅ Yes | `PORT` | ✅ Yes | Full-stack apps |
| Render | ✅ Yes | `PORT` | ✅ Yes | Full-stack apps |
| Fly.io | ✅ Yes | `PORT` | ✅ Yes | Global apps |
| Heroku | ✅ Yes | `PORT` | ✅ Yes | Traditional PaaS |
| Northflank | ✅ Yes | `PORT` | ✅ Yes | Microservices |
| Google Cloud Run | ✅ Yes | `PORT` | ✅ Yes | Serverless containers |
| AWS App Runner | ✅ Yes | `PORT` | ✅ Yes | Containerized apps |
| Vercel | ❌ No | N/A | ❌ No | Frontend/Serverless |
| Netlify | ❌ No | N/A | ❌ No | Static sites |
| EC2/Droplets | ❌ No | Custom | ✅ Yes | Full control |

## 🔧 Configuration Requirements

### For Dynamic Port Platforms

Your Dockerfile needs to:
1. Accept `PORT` environment variable
2. Use it in the application/server configuration
3. Default to a sensible port (usually 80 or 8080) if not set

**Example Dockerfile pattern:**
```dockerfile
# Use template for nginx
COPY nginx.conf.template /etc/nginx/templates/
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
```

**Example entrypoint script:**
```bash
#!/bin/sh
PORT=${PORT:-80}
envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
exec nginx -g 'daemon off;'
```

### For Fixed Port Platforms

You can:
- Hardcode the port (e.g., `EXPOSE 80`)
- Use environment variables for flexibility
- Configure in platform settings

## 🎯 Recommendations

### Use Dynamic Port Setup If:
- ✅ Deploying to Railway, Render, Fly.io, Heroku, etc.
- ✅ Want maximum portability
- ✅ Using container orchestration (K8s, Docker Swarm)

### Use Fixed Port Setup If:
- ✅ Deploying to VPS (EC2, Droplets, etc.)
- ✅ Have full control over infrastructure
- ✅ Using reverse proxy (nginx, Traefik, etc.)

### Best Practice:
**Support both!** Use environment variable with sensible default:
```dockerfile
ENV PORT=80
# Then use ${PORT} in your config
```

## 📝 Quick Reference

**Platforms requiring PORT env var:**
- Railway ✅
- Render ✅
- Fly.io ✅
- Heroku ✅
- Northflank ✅
- Google Cloud Run ✅
- AWS App Runner ✅
- DigitalOcean App Platform ✅
- Koyeb ✅
- Zeabur ✅

**Platforms NOT requiring PORT:**
- Vercel (serverless)
- Netlify (serverless/static)
- Traditional VPS (you configure)

## 🔗 Additional Resources

- [Railway Port Documentation](https://docs.railway.app/deploy/builds#port)
- [Render Port Documentation](https://render.com/docs/port)
- [Fly.io Port Configuration](https://fly.io/docs/reference/configuration/#services-ports)
- [Heroku Port Documentation](https://devcenter.heroku.com/articles/dynos#local-environment-variables)

