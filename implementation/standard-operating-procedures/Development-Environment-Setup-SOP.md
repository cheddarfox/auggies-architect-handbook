# WTFB Development Environment Setup SOP

## Purpose
This document establishes standard procedures for setting up and maintaining development environments for WTFB projects to ensure consistency, reliability, and efficiency across the team.

## Scope
This SOP covers the installation, configuration, and verification of all tools, dependencies, and settings required for WTFB development. It applies to all developers, ARCHitects, and contributors working on WTFB projects.

## Roles & Responsibilities
- **Developers:** Follow the procedures to set up and maintain their development environments
- **ARCHitects (including Auggie):** Provide guidance on environment setup and troubleshooting
- **DevOps Engineers:** Maintain development environment scripts and configurations
- **All Team Members:** Report environment issues and contribute improvements to setup procedures

## Prerequisites
- Administrative access to your development machine
- Basic understanding of command-line interfaces
- Internet connection with access to required repositories and package managers

## Procedure

### 1. Operating System Requirements

#### 1.1 Supported Operating Systems
- **Primary:** Ubuntu 22.04 LTS or newer (preferred)
- **Secondary:** 
  - macOS 12 (Monterey) or newer
  - Windows 11 with WSL2 (Ubuntu 22.04)

#### 1.2 System Requirements
- Minimum 16GB RAM (32GB recommended)
- 4+ CPU cores
- 100GB available disk space
- SSD storage recommended

### 2. Core Development Tools

#### 2.1 Version Control
1. **Git Installation:**
   ```bash
   # Ubuntu/WSL
   sudo apt update
   sudo apt install git

   # macOS
   brew install git

   # Windows (outside WSL)
   # Download and install from https://git-scm.com/download/win
   ```

2. **Git Configuration:**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@wordstofilmby.com"
   git config --global core.editor "code --wait"  # If using VS Code
   git config --global init.defaultBranch main
   ```

#### 2.2 Node.js Environment
1. **NVM Installation:**
   ```bash
   # Ubuntu/WSL/macOS
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

   # Reload shell configuration
   export NVM_DIR="$HOME/.nvm"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
   ```

2. **Node.js Installation:**
   ```bash
   # Install and use the project's required Node.js version
   nvm install 18.17.0
   nvm use 18.17.0
   nvm alias default 18.17.0
   ```

3. **Yarn Installation:**
   ```bash
   npm install -g yarn
   ```

#### 2.3 Code Editor
1. **VS Code Installation:**
   - Download from [VS Code website](https://code.visualstudio.com/)
   - Or install via package manager:
     ```bash
     # Ubuntu/WSL
     sudo apt install code

     # macOS
     brew install --cask visual-studio-code
     ```

2. **Required Extensions:**
   ```bash
   # Install from command line
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension esbenp.prettier-vscode
   code --install-extension bradlc.vscode-tailwindcss
   code --install-extension ms-vscode.vscode-typescript-next
   code --install-extension prisma.prisma
   code --install-extension mikestead.dotenv
   code --install-extension github.copilot
   ```

3. **VS Code Settings:**
   - Create or update `.vscode/settings.json` in the project root:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "typescript.tsdk": "node_modules/typescript/lib",
     "typescript.enablePromptUseWorkspaceTsdk": true
   }
   ```

#### 2.4 Database Tools
1. **PostgreSQL Client:**
   ```bash
   # Ubuntu/WSL
   sudo apt install postgresql-client

   # macOS
   brew install postgresql
   ```

2. **Database GUI (optional):**
   - Install [pgAdmin](https://www.pgadmin.org/download/) or [DBeaver](https://dbeaver.io/download/)

### 3. Project Setup

#### 3.1 Repository Setup
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/cheddarfox/WTFB-web-v0.2025.01.git
   cd WTFB-web-v0.2025.01
   ```

2. **Install Dependencies:**
   ```bash
   yarn
   ```

#### 3.2 Environment Configuration
1. **Create Environment Files:**
   - Copy the example environment file:
     ```bash
     cp .env.example .env.local
     ```
   - Update the values in `.env.local` with your development credentials

2. **Required Environment Variables:**
   ```
   # Supabase Configuration
   SUPABASE_URL=<your-supabase-project-url>
   SUPABASE_SERVICE_KEY=<your-supabase-service-key>

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
   CLERK_SECRET_KEY=<your-clerk-secret-key>
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
   ```

#### 3.3 Database Setup
1. **Run Migrations:**
   ```bash
   npx prisma migrate dev
   ```

2. **Seed the Database (if applicable):**
   ```bash
   npx prisma db seed
   ```

### 4. Development Workflow Tools

#### 4.1 Browser Tools Setup
1. **Install Browser Tools:**
   ```bash
   yarn add -D @agentdeskai/browser-tools-mcp@latest
   ```

2. **Create Chrome Profile:**
   - Create a dedicated Chrome profile named "Dev Chrome" for development and testing

3. **Configure Browser Tools:**
   - Create or update `.vscode/fe-dev-setup.sh`:
   ```bash
   #!/bin/bash
   echo "🚀 Starting WTFB Frontend Development Environment..."
   echo "�� Working directory: $(pwd)"
   
   # Start Next.js development server
   echo "🔄 Starting Next.js development server..."
   yarn dev &
   NEXT_PID=$!
   
   echo "✅ Development environment is ready!"
   echo "🌐 Next.js server running at http://localhost:3000"
   echo "🔧 Browser Tools Server running at http://localhost:3025"
   ```

   - Create or update `.vscode/fe-dev-shutdown.sh`:
   ```bash
   #!/bin/bash
   echo "🛑 Shutting down WTFB Frontend Development Server..."
   
   # Find and kill the Next.js development server
   NEXT_PID=$(ps aux | grep "next dev" | grep -v grep | awk '{print $2}')
   if [ -n "$NEXT_PID" ]; then
     echo "�� Stopping Next.js development server (PID: $NEXT_PID)..."
     kill -15 $NEXT_PID
     sleep 2
     # Check if process is still running and force kill if necessary
     if ps -p $NEXT_PID > /dev/null; then
       echo "⚠️ Force killing Next.js development server..."
       kill -9 $NEXT_PID
     fi
     echo "✅ Next.js development server stopped"
   else
     echo "ℹ️ No running Next.js development server found"
   fi
   
   echo "✅ WTFB Frontend Development Server has been shut down"
   echo "👋 The Browser Tools Server (port 3025) is still running as expected"
   ```

   - Make scripts executable:
   ```bash
   chmod +x .vscode/fe-dev-setup.sh
   chmod +x .vscode/fe-dev-shutdown.sh
   ```

#### 4.2 VS Code Tasks
1. **Configure VS Code Tasks:**
   - Create or update `.vscode/tasks.json`:
   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "label": "WTFB Frontend Dev Setup",
         "type": "shell",
         "command": "${workspaceFolder}/.vscode/fe-dev-setup.sh",
         "problemMatcher": [],
         "presentation": {
           "reveal": "always",
           "panel": "new"
         }
       },
       {
         "label": "WTFB Frontend Dev Shutdown",
         "type": "shell",
         "command": "${workspaceFolder}/.vscode/fe-dev-shutdown.sh",
         "problemMatcher": [],
         "presentation": {
           "reveal": "always",
           "panel": "new"
         }
       }
     ]
   }
   ```

### 5. Verification

#### 5.1 Environment Verification
1. **Run the Verification Script:**
   ```bash
   # Verify Node.js and package versions
   node -v  # Should match required version
   yarn -v  # Should be 1.22.x or newer
   
   # Verify Git configuration
   git config --get user.name
   git config --get user.email
   
   # Verify database connection
   npx prisma db pull
   ```

2. **Start the Development Server:**
   ```bash
   # Using VS Code task
   # Press Ctrl+Shift+P, type "Tasks: Run Task", select "WTFB Frontend Dev Setup"
   
   # Or manually
   yarn dev
   ```

3. **Verify Application:**
   - Open http://localhost:3000 in your browser
   - Verify that the application loads without errors
   - Check browser console for any warnings or errors

#### 5.2 Common Issues and Solutions

1. **Node Version Mismatch:**
   ```bash
   nvm use 18.17.0
   ```

2. **Missing Dependencies:**
   ```bash
   yarn
   ```

3. **Database Connection Issues:**
   - Verify Supabase credentials in `.env.local`
   - Check network connectivity to Supabase

4. **Port Conflicts:**
   - Check for processes using required ports:
     ```bash
     lsof -i:3000
     lsof -i:3025
     ```
   - Kill conflicting processes if necessary

### 6. Maintenance

#### 6.1 Regular Updates
1. **Update Dependencies:**
   ```bash
   yarn upgrade-interactive --latest
   ```

2. **Update Node.js:**
   ```bash
   nvm install 18.17.0  # Replace with current project version
   nvm use 18.17.0
   ```

3. **Update VS Code Extensions:**
   - Regularly check for extension updates in VS Code

#### 6.2 Environment Cleanup
1. **Clean Node Modules:**
   ```bash
   rm -rf node_modules
   yarn cache clean
   yarn
   ```

2. **Reset Database (if needed):**
   ```bash
   npx prisma migrate reset
   ```

## Verification
- Development environment is set up according to specifications
- All required tools and dependencies are installed and configured
- Application runs locally without errors
- Development workflow tools function as expected

## Exceptions
- Team members may use alternative tools if they provide equivalent functionality and do not affect project compatibility
- Local customizations should be documented in personal notes and not committed to the repository

## Related Documents
- [WTFB Standard Operating Procedures Framework](./SOP-Framework.md)
- [Git/GitHub Workflow SOP](./Git-GitHub-Workflow-SOP.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Clerk Documentation](https://clerk.dev/docs)

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-04-18 | Auggie | Initial version |

---

> **Note:** This SOP should be updated whenever there are significant changes to the development environment requirements or setup process.

Created by Auggie, ARCHitect-in-the-IDE

For support, contact [J. Scott Graham](https://jscottgraham.us) at [scott@wordstofilmby.com](mailto:scott@wordstofilmby.com)
