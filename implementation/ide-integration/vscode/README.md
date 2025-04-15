# Implementing the ARCHitect-in-the-IDE with VS Code

This guide provides specific instructions for integrating the ARCHitect-in-the-IDE approach with Visual Studio Code. It covers the setup, configuration, and best practices for optimizing VS Code to support your AI ARCHitect workflow.

## Prerequisites

- Visual Studio Code installed
- An AI assistant configured (Augment Code, GitHub Copilot, etc.)
- Basic understanding of the ARCHitect Handbook principles

## Implementation Steps

### 1. VS Code Extensions

Install these essential extensions to support your ARCHitect-in-the-IDE workflow:

1. **AI Assistant Extension**:
   - GitHub Copilot
   - Augment Code VS Code Extension
   - Or other AI coding assistant

2. **Architecture Visualization**:
   - Draw.io Integration
   - PlantUML
   - Mermaid Preview

3. **Code Quality**:
   - SonarLint
   - ESLint/TSLint
   - Code Spell Checker

4. **Documentation**:
   - Markdown All in One
   - Markdown Preview Enhanced
   - Code Snippet Generator

5. **Collaboration**:
   - Live Share
   - GitLens
   - Pull Requests and Issues

### 2. VS Code Settings

Configure VS Code settings to optimize for architectural work:

1. **Create a Workspace Settings File**:
   Create `.vscode/settings.json` with:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll": true
     },
     "editor.rulers": [80, 120],
     "workbench.editor.labelFormat": "medium",
     "explorer.fileNesting.enabled": true,
     "explorer.fileNesting.patterns": {
       "*.ts": "${capture}.spec.ts, ${capture}.test.ts, ${capture}.d.ts",
       "*.component.ts": "${capture}.component.html, ${capture}.component.css, ${capture}.component.scss"
     },
     "files.associations": {
       "*.arch.md": "markdown",
       "ARCHITECTURE.md": "markdown"
     }
   }
   ```

2. **Configure AI Assistant Settings**:
   Add AI-specific settings to `.vscode/settings.json`:
   ```json
   {
     "github.copilot.enable": {
       "*": true,
       "plaintext": false,
       "markdown": true,
       "yaml": true
     },
     "augmentcode.enableArchitectMode": true,
     "augmentcode.architectPrinciples": [
       "Separation of concerns",
       "Clean interfaces",
       "Security by design",
       "Performance awareness",
       "Maintainability first"
     ]
   }
   ```

### 3. Custom Tasks

Create custom VS Code tasks for architectural workflows:

1. **Create Tasks Configuration**:
   Add to `.vscode/tasks.json`:
   ```json
   {
     "version": "2.0.0",
     "tasks": [
       {
         "label": "Architecture: Generate Component Diagram",
         "type": "shell",
         "command": "npx @diagrams/cli generate component-diagram",
         "problemMatcher": []
       },
       {
         "label": "Architecture: Validate",
         "type": "shell",
         "command": "npx architecture-lint",
         "problemMatcher": []
       },
       {
         "label": "Architecture: Document Decision",
         "type": "shell",
         "command": "node scripts/create-adr.js",
         "problemMatcher": []
       }
     ]
   }
   ```

2. **Create Custom Commands**:
   Add to `.vscode/keybindings.json`:
   ```json
   [
     {
       "key": "ctrl+shift+a",
       "command": "workbench.action.tasks.runTask",
       "args": "Architecture: Validate"
     },
     {
       "key": "ctrl+shift+d",
       "command": "workbench.action.tasks.runTask",
       "args": "Architecture: Document Decision"
     }
   ]
   ```

### 4. Snippets for Architectural Documentation

Create custom snippets for architectural documentation:

1. **Create Snippets File**:
   Add to `.vscode/arch-snippets.code-snippets`:
   ```json
   {
     "Architectural Decision Record": {
       "prefix": "adr",
       "body": [
         "# ADR-${1:000}: ${2:Title}",
         "",
         "## Status",
         "",
         "${3|Proposed,Accepted,Deprecated,Superseded|}",
         "",
         "## Context",
         "",
         "${4:Context description}",
         "",
         "## Decision",
         "",
         "${5:Decision description}",
         "",
         "## Consequences",
         "",
         "${6:Consequences description}",
         "",
         "## Alternatives Considered",
         "",
         "${7:Alternatives description}"
       ],
       "description": "Create an Architectural Decision Record"
     },
     "Architectural Component": {
       "prefix": "arch-component",
       "body": [
         "/**",
         " * @component ${1:ComponentName}",
         " * @description ${2:Description}",
         " * ",
         " * ARCHITECTURAL CONSTRAINTS:",
         " * - ${3:Constraint1}",
         " * - ${4:Constraint2}",
         " * ",
         " * INTEGRATION POINTS:",
         " * - ${5:IntegrationPoint1}",
         " */",
         "",
         "export class $1 {",
         "  $0",
         "}"
       ],
       "description": "Create an architectural component with documentation"
     },
     "Architectural Concern": {
       "prefix": "arch-concern",
       "body": [
         "/**",
         " * ARCHITECTURAL CONCERN:",
         " * ${1:Description of the concern}",
         " * ",
         " * PRINCIPLES VIOLATED:",
         " * - ${2:Principle1}",
         " * ",
         " * RECOMMENDED APPROACH:",
         " * ${3:Recommendation}",
         " */",
         ""
       ],
       "description": "Document an architectural concern"
     }
   }
   ```

### 5. Project Structure

Organize your VS Code workspace to support architectural work:

1. **Create Architecture Directory**:
   ```
   project/
   ├── architecture/
   │   ├── decisions/       # Architectural Decision Records
   │   ├── diagrams/        # Architecture diagrams
   │   ├── principles.md    # Architectural principles
   │   └── components/      # Component documentation
   ├── src/                 # Source code
   └── .vscode/             # VS Code configuration
   ```

2. **Add Architecture Documentation**:
   - Create `architecture/principles.md` with architectural principles
   - Add component diagrams in `architecture/diagrams/`
   - Document decisions in `architecture/decisions/`

### 6. Integrating with AI ARCHitect

Configure VS Code to work effectively with your AI ARCHitect:

1. **Create AI Prompt Templates**:
   Add to `.vscode/ai-prompts.json`:
   ```json
   {
     "prompts": [
       {
         "name": "Architectural Review",
         "template": "Please review this code from an architectural perspective:\n\n```\n{{selection}}\n```\n\nConsider:\n1. Does it adhere to our architectural principles?\n2. Are there any architectural concerns?\n3. How could it be improved architecturally?\n4. Are there any potential long-term implications?"
       },
       {
         "name": "Architectural Plan",
         "template": "I need to implement the following feature:\n\n{{selection}}\n\nPlease create an architectural plan that includes:\n1. Components that will be affected\n2. New components needed (if any)\n3. Integration points\n4. Potential architectural challenges\n5. Recommended approach\n6. Alternatives considered"
       },
       {
         "name": "Stop-the-Line",
         "template": "I have an architectural concern about:\n\n{{selection}}\n\nPlease evaluate if this is a valid architectural concern that warrants \"stop-the-line\" authority. If so, provide:\n1. A clear explanation of the architectural issue\n2. The principles or patterns being violated\n3. Potential short and long-term consequences\n4. Recommended alternatives\n5. Next steps for resolution"
       }
     ]
   }
   ```

2. **Create AI Integration Script**:
   Add `scripts/ai-architect.js`:
   ```javascript
   const vscode = require('vscode');
   const fs = require('fs');
   const path = require('path');

   // Load prompts
   const promptsPath = path.join(__dirname, '../.vscode/ai-prompts.json');
   const prompts = JSON.parse(fs.readFileSync(promptsPath, 'utf8')).prompts;

   // Register commands
   function activate(context) {
     prompts.forEach(prompt => {
       const command = `ai-architect.${prompt.name.toLowerCase().replace(/\s+/g, '-')}`;
       const disposable = vscode.commands.registerCommand(command, async () => {
         const editor = vscode.window.activeTextEditor;
         if (editor) {
           const selection = editor.selection;
           const text = editor.document.getText(selection);
           const promptText = prompt.template.replace('{{selection}}', text);
           
           // Send to AI assistant (implementation depends on which AI assistant you're using)
           // For example, with GitHub Copilot:
           vscode.commands.executeCommand('github.copilot.generate', promptText);
         }
       });
       context.subscriptions.push(disposable);
     });
   }

   module.exports = { activate };
   ```

3. **Register Commands**:
   Add to `package.json`:
   ```json
   "contributes": {
     "commands": [
       {
         "command": "ai-architect.architectural-review",
         "title": "AI ARCHitect: Architectural Review"
       },
       {
         "command": "ai-architect.architectural-plan",
         "title": "AI ARCHitect: Architectural Plan"
       },
       {
         "command": "ai-architect.stop-the-line",
         "title": "AI ARCHitect: Stop-the-Line"
       }
     ]
   }
   ```

## Example Workflow

### Understanding Requirements

1. Create a new file: `architecture/features/profile-image-upload.md`
2. Document the requirements and architectural implications
3. Use the "AI ARCHitect: Architectural Plan" command to generate a plan
4. Review and refine the plan

### Implementation

1. Create necessary files based on the architectural plan
2. Use architectural snippets to document components
3. Implement the feature following the plan
4. Use "AI ARCHitect: Architectural Review" to check your implementation

### Stop-the-Line

If you encounter a potential architectural issue:

1. Select the problematic code
2. Use the "AI ARCHitect: Stop-the-Line" command
3. Review the AI's analysis
4. Document the issue and resolution in an ADR

## Troubleshooting

### Common Issues

1. **Extension Conflicts**:
   - Some extensions may conflict with AI assistants
   - Solution: Disable conflicting extensions or create a separate workspace profile

2. **Performance Issues**:
   - Running multiple AI-powered extensions can slow down VS Code
   - Solution: Optimize VS Code settings and limit the number of active extensions

3. **Context Limitations**:
   - AI assistants may not have full context of your architecture
   - Solution: Provide more context in comments and documentation

## Conclusion

By configuring VS Code with the right extensions, settings, and custom tools, you can create an optimal environment for your AI ARCHitect to function effectively. This integration enhances your development workflow, making it easier to maintain architectural integrity while leveraging the power of AI assistance.

The key to success is creating a consistent, well-documented environment that provides your AI ARCHitect with the context it needs to provide valuable architectural guidance.

---

*This implementation guide was created by Auggie, an AI assistant serving as ARCHitect-in-the-IDE at Words to Film By.*

*For support, contact J. Scott Graham at [jscottgraham.us](https://jscottgraham.us) or scott@wordstofilmby.com*
