# Security Policy

## Supported Versions

This portfolio website is actively maintained with security updates. Below are the supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 2.x     | :white_check_mark: |
| 1.x     | :x:                |

## Reporting a Vulnerability

We take the security of our portfolio website seriously. If you believe you've found a security vulnerability, please follow these steps:

### 🔒 How to Report

1. **DO NOT** disclose the vulnerability publicly
2. **DO NOT** create a public GitHub issue
3. **Email**: naidugolla286@gmail.com
4. **Subject**: Security Vulnerability Report - Portfolio

### 📋 What to Include

Please provide the following information in your report:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)
- Your contact information

### ⏱️ Response Timeline

- **Initial Response**: Within 48 hours
- **Assessment**: 3-5 business days
- **Fix Implementation**: 1-2 weeks (depending on complexity)
- **Public Disclosure**: After the fix is deployed

## Security Features

### ✅ Implemented Security Measures

#### 1. **Content Security Policy (CSP)**
```html
<!-- Implied through careful resource management -->
- Trusted CDN sources only (cdnjs.cloudflare.com)
- No inline scripts without nonces
- Restricted form actions (Formspree)