# WTFB Deployment Process SOP

## Purpose
This document establishes standard procedures for deploying WTFB applications to ensure consistent, reliable, and secure releases across all environments.

## Scope
This SOP covers the entire deployment lifecycle, including environment management, build processes, deployment procedures, verification, and rollback strategies. It applies to all WTFB applications and services.

## Roles & Responsibilities
- **Developers:** Create release-ready code, assist with deployment verification
- **DevOps Engineers:** Maintain deployment infrastructure and scripts
- **ARCHitects (including Auggie):** Review architectural implications of deployments
- **Project Leads:** Approve production deployments, coordinate release timing
- **QA Engineers:** Verify deployments in staging environments

## Prerequisites
- Access to deployment environments and tools
- Understanding of the application architecture
- Familiarity with CI/CD pipelines
- Knowledge of monitoring and alerting systems

## Procedure

### 1. Environment Management

#### 1.1 Environment Hierarchy
1. **Development:**
   - Purpose: Active development and initial testing
   - Deployment Frequency: Continuous (on push to development branches)
   - Stability Expectation: Experimental, may have issues

2. **Staging:**
   - Purpose: Pre-production testing and verification
   - Deployment Frequency: After feature completion, before production
   - Stability Expectation: Near-production quality

3. **Production:**
   - Purpose: Live user-facing environment
   - Deployment Frequency: Scheduled releases
   - Stability Expectation: Highly stable and reliable

#### 1.2 Environment Configuration
1. **Configuration Management:**
   - Store environment-specific configuration in environment variables
   - Use `.env` files for local development
   - Use environment secrets in CI/CD for deployment

2. **Configuration Validation:**
   - Validate required configuration before deployment
   - Audit sensitive configuration regularly
   - Document all configuration options

### 2. Build Process

#### 2.1 Build Pipeline
1. **Build Steps:**
   - Install dependencies
   - Run linting and type checking
   - Run unit and integration tests
   - Build production assets
   - Create deployment package

2. **Build Artifacts:**
   - Production-optimized JavaScript bundles
   - Static assets (CSS, images, etc.)
   - Server-side code (if applicable)
   - Deployment configuration

#### 2.2 Build Versioning
1. **Version Scheme:**
   - Follow Semantic Versioning (SemVer): `MAJOR.MINOR.PATCH`
   - Increment appropriately based on changes

2. **Build Identification:**
   - Tag builds with Git commit hash
   - Include build timestamp
   - Associate with release version

### 3. Deployment Preparation

#### 3.1 Release Planning
1. **Release Schedule:**
   - Regular release cadence (e.g., bi-weekly)
   - Emergency hotfix process for critical issues

2. **Release Notes:**
   - Document all changes in the release
   - Highlight new features, improvements, and bug fixes
   - Note any breaking changes or required actions

#### 3.2 Pre-Deployment Checklist
1. **Code Readiness:**
   - All PRs for the release are merged
   - Release branch is created (if applicable)
   - Version numbers are updated

2. **Testing Verification:**
   - All tests pass in CI/CD
   - QA has completed testing in staging
   - Performance testing shows no regressions

3. **Documentation:**
   - User documentation is updated
   - API documentation reflects current state
   - Release notes are prepared

4. **Operational Readiness:**
   - Monitoring is configured for new features
   - Database migrations are prepared
   - Rollback plan is documented

### 4. Deployment Process

#### 4.1 Staging Deployment
1. **Process:**
   - Deploy to staging environment
   - Run automated smoke tests
   - Perform manual verification
   - Address any issues before proceeding

2. **Staging Verification Checklist:**
   - Application loads and functions correctly
   - New features work as expected
   - No regressions in existing functionality
   - Performance is acceptable

#### 4.2 Production Deployment
1. **Deployment Window:**
   - Schedule deployment during low-traffic periods
   - Communicate deployment timing to stakeholders
   - Ensure support team is available during deployment

2. **Deployment Steps:**
   ```bash
   # Example deployment script
   # 1. Announce deployment start
   # 2. Scale down application (if applicable)
   # 3. Apply database migrations
   # 4. Deploy new application version
   # 5. Verify deployment
   # 6. Scale up application (if applicable)
   # 7. Announce deployment completion
   ```

3. **Deployment Strategies:**
   - **Blue-Green Deployment:**
     - Deploy to parallel environment
     - Switch traffic when verified
     - Keep old environment for potential rollback

   - **Canary Deployment:**
     - Deploy to subset of infrastructure
     - Route percentage of traffic to new version
     - Gradually increase traffic as confidence builds

   - **Rolling Deployment:**
     - Update instances one by one
     - Maintain service availability throughout

#### 4.3 Post-Deployment Verification
1. **Automated Verification:**
   - Run smoke tests against production
   - Verify critical user flows
   - Check error rates and performance metrics

2. **Manual Verification:**
   - Perform manual testing of key functionality
   - Verify third-party integrations
   - Check for visual or UX issues

3. **Monitoring Period:**
   - Actively monitor for 1 hour post-deployment
   - Watch for error spikes or performance issues
   - Be prepared for immediate rollback if needed

### 5. Rollback Procedures

#### 5.1 Rollback Decision Criteria
1. **Automatic Rollback Triggers:**
   - Error rate exceeds threshold (e.g., >1%)
   - Critical functionality is broken
   - Performance degradation beyond acceptable limits

2. **Manual Rollback Considerations:**
   - Severity and impact of issues
   - Ability to quickly fix forward
   - Business impact of continued issues

#### 5.2 Rollback Process
1. **Code Rollback:**
   - Redeploy previous known-good version
   - Verify rollback was successful
   - Communicate rollback to stakeholders

2. **Database Rollback:**
   - Execute database rollback scripts if needed
   - Verify data integrity
   - Document any data changes that cannot be rolled back

3. **Post-Rollback Actions:**
   - Investigate root cause
   - Create fix for issues
   - Plan new deployment with fixes

### 6. Deployment Automation

#### 6.1 CI/CD Pipeline
1. **GitHub Actions Workflow:**
   - Triggered on push to specific branches
   - Runs tests and builds
   - Deploys to appropriate environment

2. **Example Workflow Configuration:**
   ```yaml
   name: Deploy

   on:
     push:
       branches:
         - main  # Production
         - staging
         - development

   jobs:
     test:
       # Run tests
     
     build:
       # Build application
     
     deploy:
       # Deploy to appropriate environment based on branch
   ```

#### 6.2 Deployment Tools
1. **Primary Tools:**
   - GitHub Actions for CI/CD
   - Coolify for container orchestration
   - Terraform for infrastructure as code

2. **Monitoring Tools:**
   - Grafana for metrics visualization
   - Prometheus for metrics collection
   - Sentry for error tracking

### 7. Special Deployment Types

#### 7.1 Database Migrations
1. **Migration Process:**
   - Test migrations in staging environment
   - Back up production database before migration
   - Apply migrations during deployment window
   - Verify data integrity after migration

2. **Migration Safety:**
   - Design migrations to be reversible when possible
   - Implement timeouts for long-running migrations
   - Have rollback scripts prepared

#### 7.2 Hotfix Deployments
1. **Hotfix Process:**
   - Create hotfix branch from production
   - Implement minimal fix for critical issue
   - Follow expedited review process
   - Deploy directly to staging, then production

2. **Hotfix Verification:**
   - Verify fix addresses the specific issue
   - Ensure no regressions are introduced
   - Document hotfix in release notes

### 8. Deployment Documentation

#### 8.1 Deployment Logs
1. **Required Information:**
   - Deployment timestamp
   - Version deployed
   - Deployer identity
   - Deployment status
   - Any issues encountered

2. **Log Storage:**
   - Store logs in centralized location
   - Retain logs for at least 90 days
   - Make logs searchable and filterable

#### 8.2 Release Documentation
1. **Release Notes:**
   - Publish to appropriate channels
   - Include version number and date
   - List features, improvements, and fixes
   - Note any known issues

2. **Deployment History:**
   - Maintain record of all deployments
   - Document rollbacks and reasons
   - Track deployment frequency and success rate

## Verification
- Deployments follow the established process
- Pre and post-deployment checks are completed
- Deployment documentation is maintained
- Rollback procedures are tested regularly

## Exceptions
- Critical security patches may follow expedited deployment process
- Hotfixes for production issues may skip some steps with appropriate approval
- Development and personal environments may follow simplified procedures

## Related Documents
- [WTFB Standard Operating Procedures Framework](./SOP-Framework.md)
- [Testing Standards and Procedures SOP](./Testing-Standards-SOP.md)
- [Security Protocols SOP](./Security-Protocols-SOP.md)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Coolify Documentation](https://coolify.io/docs)

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-04-18 | Auggie | Initial version |

---

> **Note:** Deployment is a critical process that directly affects user experience. Always prioritize stability and reliability over speed.

Created by Auggie, ARCHitect-in-the-IDE

For support, contact [J. Scott Graham](https://jscottgraham.us) at [scott@wordstofilmby.com](mailto:scott@wordstofilmby.com)
