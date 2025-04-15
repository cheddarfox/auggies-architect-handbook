# Implementing the ARCHitect-in-the-IDE with JetBrains IDEs

This guide provides specific instructions for integrating the ARCHitect-in-the-IDE approach with JetBrains IDEs (IntelliJ IDEA, WebStorm, PyCharm, etc.). It covers the setup, configuration, and best practices for optimizing JetBrains IDEs to support your AI ARCHitect workflow.

## Prerequisites

- JetBrains IDE installed (IntelliJ IDEA, WebStorm, PyCharm, etc.)
- An AI assistant configured (Augment Code, GitHub Copilot, etc.)
- Basic understanding of the ARCHitect Handbook principles

## Implementation Steps

### 1. JetBrains Plugins

Install these essential plugins to support your ARCHitect-in-the-IDE workflow:

1. **AI Assistant Plugins**:
   - GitHub Copilot
   - Augment Code Plugin
   - Or other AI coding assistant

2. **Architecture Visualization**:
   - PlantUML Integration
   - Diagrams.net Integration
   - Mermaid

3. **Code Quality**:
   - SonarLint
   - Architecture Linter
   - SpotBugs/FindBugs

4. **Documentation**:
   - AsciiDoc
   - Markdown
   - JavaDoc/KDoc/JSDoc Support

5. **Collaboration**:
   - Code With Me
   - Git Integration
   - Space/YouTrack Integration

### 2. IDE Settings

Configure JetBrains IDE settings to optimize for architectural work:

1. **Create a Project Settings File**:
   Create `.idea/architecture-settings.xml`:
   ```xml
   <component name="ArchitectureSettings">
     <option name="principles">
       <list>
         <Principle>
           <option name="name" value="Separation of Concerns" />
           <option name="description" value="Each component should have a single responsibility" />
         </Principle>
         <Principle>
           <option name="name" value="Clean Interfaces" />
           <option name="description" value="Components interact through well-defined interfaces" />
         </Principle>
         <Principle>
           <option name="name" value="Security by Design" />
           <option name="description" value="Security considerations at every layer" />
         </Principle>
         <Principle>
           <option name="name" value="Performance Awareness" />
           <option name="description" value="Performance implications considered for all changes" />
         </Principle>
         <Principle>
           <option name="name" value="Maintainability First" />
           <option name="description" value="Code should be maintainable over the long term" />
         </Principle>
       </list>
     </option>
   </component>
   ```

2. **Configure Code Style**:
   - Go to Settings/Preferences → Editor → Code Style
   - Enable "Formatter Control" to respect architectural comments
   - Create a shared code style XML file for the project

3. **Set Up File Templates**:
   - Go to Settings/Preferences → Editor → File and Code Templates
   - Create templates for architectural components and documentation

### 3. Live Templates

Create custom live templates for architectural documentation:

1. **Architectural Decision Record**:
   - Abbreviation: `adr`
   - Template:
   ```
   # ADR-$NUMBER$: $TITLE$

   ## Status

   $STATUS$

   ## Context

   $CONTEXT$

   ## Decision

   $DECISION$

   ## Consequences

   $CONSEQUENCES$

   ## Alternatives Considered

   $ALTERNATIVES$
   ```

2. **Architectural Component**:
   - Abbreviation: `arch-component`
   - Template:
   ```
   /**
    * @component $COMPONENT_NAME$
    * @description $DESCRIPTION$
    * 
    * ARCHITECTURAL CONSTRAINTS:
    * - $CONSTRAINT1$
    * - $CONSTRAINT2$
    * 
    * INTEGRATION POINTS:
    * - $INTEGRATION_POINT1$
    */

   public class $COMPONENT_NAME$ {
       $END$
   }
   ```

3. **Architectural Concern**:
   - Abbreviation: `arch-concern`
   - Template:
   ```
   /**
    * ARCHITECTURAL CONCERN:
    * $DESCRIPTION$
    * 
    * PRINCIPLES VIOLATED:
    * - $PRINCIPLE1$
    * 
    * RECOMMENDED APPROACH:
    * $RECOMMENDATION$
    */
   ```

### 4. Run Configurations

Create custom run configurations for architectural tasks:

1. **Architecture Validation**:
   - Create a run configuration for architecture linting
   - Configure it to run before commits

2. **Generate Architecture Documentation**:
   - Create a run configuration to generate architecture diagrams
   - Set up automatic documentation generation

3. **Architecture Tests**:
   - Create a run configuration for architecture-specific tests
   - Include it in the CI/CD pipeline

### 5. Project Structure

Organize your JetBrains project to support architectural work:

1. **Create Architecture Directory**:
   ```
   project/
   ├── architecture/
   │   ├── decisions/       # Architectural Decision Records
   │   ├── diagrams/        # Architecture diagrams
   │   ├── principles.md    # Architectural principles
   │   └── components/      # Component documentation
   ├── src/                 # Source code
   └── .idea/               # JetBrains configuration
   ```

2. **Mark Special Directories**:
   - Mark `architecture` as Documentation in the Project view
   - Configure custom scopes for architectural files

### 6. Integrating with AI ARCHitect

Configure JetBrains IDE to work effectively with your AI ARCHitect:

1. **Create AI Prompt Macros**:
   - Go to Settings/Preferences → Tools → External Tools
   - Create new external tools for AI interactions

2. **Architectural Review Tool**:
   - Name: "AI ARCHitect: Architectural Review"
   - Program: Path to your AI integration script
   - Arguments: `review $SelectedText$`
   - Working directory: `$ProjectFileDir$`

3. **Architectural Planning Tool**:
   - Name: "AI ARCHitect: Architectural Plan"
   - Program: Path to your AI integration script
   - Arguments: `plan $SelectedText$`
   - Working directory: `$ProjectFileDir$`

4. **Stop-the-Line Tool**:
   - Name: "AI ARCHitect: Stop-the-Line"
   - Program: Path to your AI integration script
   - Arguments: `stop-the-line $SelectedText$`
   - Working directory: `$ProjectFileDir$`

### 7. Custom Inspections

Create custom inspections for architectural rules:

1. **Create Architectural Inspection Profile**:
   - Go to Settings/Preferences → Editor → Inspections
   - Create a new profile named "Architectural Rules"

2. **Add Custom Inspections**:
   - Use the Structural Search feature to create pattern-based inspections
   - Create inspections for common architectural violations

3. **Configure Severity Levels**:
   - Set appropriate severity levels for different types of violations
   - Configure automatic quick fixes where possible

## Example Workflow

### Understanding Requirements

1. Create a new file: `architecture/features/profile-image-upload.md`
2. Document the requirements and architectural implications
3. Right-click and select "AI ARCHitect: Architectural Plan"
4. Review and refine the generated plan

### Implementation

1. Create necessary files based on the architectural plan
2. Use architectural live templates to document components
3. Implement the feature following the plan
4. Use "AI ARCHitect: Architectural Review" to check your implementation

### Stop-the-Line

If you encounter a potential architectural issue:

1. Select the problematic code
2. Right-click and select "AI ARCHitect: Stop-the-Line"
3. Review the AI's analysis
4. Document the issue and resolution in an ADR

## Integration with JetBrains Space/YouTrack

If you use JetBrains Space or YouTrack for project management:

1. **Create Architectural Issue Types**:
   - Architectural Decision
   - Architectural Review
   - Architectural Concern

2. **Set Up Custom Fields**:
   - Architectural Principles Affected
   - Architectural Components Involved
   - Technical Debt Impact

3. **Create Workflows**:
   - Architectural Review Process
   - Decision Approval Process
   - Technical Debt Management

## Troubleshooting

### Common Issues

1. **Plugin Conflicts**:
   - Some plugins may conflict with AI assistants
   - Solution: Disable conflicting plugins or create a separate IDE profile

2. **Performance Issues**:
   - Running multiple AI-powered plugins can slow down the IDE
   - Solution: Optimize IDE settings and limit the number of active plugins

3. **Context Limitations**:
   - AI assistants may not have full context of your architecture
   - Solution: Provide more context in comments and documentation

## Conclusion

By configuring your JetBrains IDE with the right plugins, settings, and custom tools, you can create an optimal environment for your AI ARCHitect to function effectively. This integration enhances your development workflow, making it easier to maintain architectural integrity while leveraging the power of AI assistance.

The key to success is creating a consistent, well-documented environment that provides your AI ARCHitect with the context it needs to provide valuable architectural guidance.

---

*This implementation guide was created by Auggie, an AI assistant serving as ARCHitect-in-the-IDE at Words to Film By.*

*For support, contact J. Scott Graham at [jscottgraham.us](https://jscottgraham.us) or scott@wordstofilmby.com*
