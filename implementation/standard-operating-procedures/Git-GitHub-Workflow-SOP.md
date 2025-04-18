# WTFB Git/GitHub Workflow SOP

## Purpose
This document outlines the standard operating procedures for Git and GitHub usage in WTFB projects to ensure consistency, quality, and efficient collaboration across the team.

## Scope
This SOP covers branch management, commit processes, pull request workflows, and branch cleanup procedures for all WTFB repositories. It applies to all developers, ARCHitects, and contributors working on WTFB projects.

## Roles & Responsibilities
- **Developers:** Follow the procedures for branch creation, commits, and PRs
- **ARCHitects (including Auggie):** Review PRs, enforce standards, and provide guidance
- **Project Leads:** Approve and merge PRs, maintain repository health
- **All Team Members:** Adhere to the workflow, suggest improvements

## Prerequisites
- Git installed and configured on local machine
- GitHub account with access to WTFB repositories
- Basic understanding of Git commands and concepts

## Procedure

### 1. Branch Management

#### 1.1 For New Work
1. **Always Create a New Branch**
   - For new features: `WTFB-XX-feature-description`
   - For bug fixes: `WTFB-XX-fix-description`
   - For chores/maintenance: `WTFB-XX-chore-description`

2. **Branch Naming Convention**
   - Always start with the Jira/ticket number (e.g., `WTFB-XX`)
   - Use kebab-case (lowercase with hyphens)
   - Be descriptive but concise

3. **Branch Creation Process**
   ```bash
   # Ensure master is up to date
   git checkout master
   git pull origin master

   # Create new branch
   git checkout -b WTFB-XX-description-of-work
   ```

#### 1.2 For Existing Work
1. **Check if a branch already exists**
   ```bash
   git branch -a | grep "WTFB-XX"
   ```

2. **If branch exists and you need to continue work**
   ```bash
   git checkout WTFB-XX-description-of-work
   git pull origin WTFB-XX-description-of-work
   ```

3. **If branch exists but is stale/outdated**
   ```bash
   git checkout WTFB-XX-description-of-work
   git pull origin WTFB-XX-description-of-work
   git rebase master  # Only if appropriate and not shared with others
   ```

### 2. Commit Process

1. Make small, focused commits
2. Use descriptive commit messages prefixed with type:
   - `feat: add new feature`
   - `fix: resolve issue with X`
   - `chore: update dependencies`
   - `docs: update documentation`

3. Example of a good commit message:
   ```
   fix: resolve authentication issues with Clerk provider

   Replaced custom AuthWrapper with official ClerkProvider to fix
   the error: SignedIn can only be used within ClerkProvider
   ```

### 3. Pull Request Process

1. Push branch to remote:
   ```bash
   git push -u origin WTFB-XX-description-of-work
   ```

2. Create PR through GitHub interface or API

3. Use PR template with Description, Changes, Testing sections

4. Link to relevant Jira ticket

5. Example PR description:
   ```markdown
   ## Description
   This PR fixes the Clerk authentication issues that were occurring in production.

   ## Changes
   - Replaced custom AuthWrapper with official ClerkProvider
   - Updated client components to use proper Clerk hooks
   - Added proper client-side rendering with mounted state

   ## Testing
   - Tested authentication flow in development environment
   - Verified users can sign in and access protected routes

   ## Related Issues
   Fixes WTFB-XX
   ```

### 4. After PR Approval

1. Merge using GitHub's merge button (not locally)
2. Delete branch after merging

### 5. Branch Cleanup

1. **Regular cleanup of merged branches**
   ```bash
   # Update local references
   git fetch -p

   # List merged branches
   git branch --merged master

   # Delete local branches that have been merged
   git branch -d branch-name
   ```

2. **Delete remote branches after merging PRs**
   - This should be done automatically through GitHub when merging PRs
   - If needed manually: `git push origin --delete branch-name`

## Verification
- Branch names follow the convention `WTFB-XX-description`
- Commit messages follow the typed prefix format
- PRs include proper descriptions, changes, and testing sections
- Branches are deleted after merging

## Exceptions
- For Auggie's ARCHitect Handbook repository, commits can be made directly to the appropriate branch without the PR process
- Hotfixes for critical production issues may follow an expedited process with post-implementation review

## Related Documents
- [WTFB Standard Operating Procedures Framework](./SOP-Framework.md)
- [GitHub Documentation](https://docs.github.com/en)

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-04-18 | Auggie | Initial version |

---

> **Note:** Remember that new features or work should always be done in a new branch or an existing branch rather than directly on master.

Created by Auggie, ARCHitect-in-the-IDE

For support, contact [J. Scott Graham](https://jscottgraham.us) at [scott@wordstofilmby.com](mailto:scott@wordstofilmby.com)
