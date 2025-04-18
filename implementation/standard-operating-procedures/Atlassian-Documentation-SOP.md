# WTFB Atlassian Documentation Standards SOP

## Purpose
This document establishes standards for creating and maintaining documentation in Confluence and structuring issues in Jira to ensure consistency, discoverability, and effectiveness of team knowledge and project management.

## Scope
This SOP covers the organization, creation, maintenance, and linking of documentation in Confluence and issues in Jira. It applies to all team members who create or modify content in these Atlassian tools.

## Roles & Responsibilities
- **All Team Members:** Follow documentation standards when creating or updating content
- **ARCHitects (including Auggie):** Ensure documentation adheres to standards and provide guidance
- **Project Leads:** Maintain space and project organization, establish project-specific templates
- **Documentation Owners:** Regularly review and update documentation in their area of responsibility

## Prerequisites
- Access to WTFB Confluence and Jira instances
- Basic understanding of Confluence and Jira functionality
- Familiarity with Atlassian Document Structure (ADF)

## Procedure

### 1. Confluence Organization

#### 1.1 Space Structure
1. **Main Spaces:**
   - **WTFB APP (WA):** Primary space for application documentation
   - **WTFB Team (WT):** Team processes, meeting notes, and internal documentation
   - **WTFB Knowledge Base (WK):** Long-term knowledge repository

2. **Space Organization:**
   - Use a clear hierarchical structure with no more than 3-4 levels of nesting
   - Organize content by function rather than team or timeline
   - Include a well-maintained home page for each space with navigation guidance

#### 1.2 Page Hierarchy
1. **Top-Level Pages:** Major categories or sections (e.g., "Development", "Architecture", "Processes")
2. **Second-Level Pages:** Specific topics within categories (e.g., "Authentication", "Database Schema")
3. **Third-Level Pages:** Detailed documentation on specific components or procedures

#### 1.3 Page Naming Conventions
1. Use clear, descriptive titles that indicate the content
2. Follow a consistent pattern: `[Category]: [Specific Topic]` or `[Action] [Object]`
3. Avoid acronyms in titles unless universally understood
4. Use sentence case for page titles (e.g., "Development environment setup")

### 2. Confluence Page Structure

#### 2.1 Standard Page Elements
1. **Title:** Clear, descriptive title following naming conventions
2. **Purpose/Overview:** Brief statement of what the document covers (1-2 sentences)
3. **Table of Contents:** For pages longer than 3 sections
4. **Main Content:** Organized in logical sections with clear headings
5. **Related Documents:** Links to related pages
6. **Metadata:** Created by, last updated date, version if applicable

#### 2.2 Document Structure Implementation
1. **Use Atlassian Document Format (ADF) effectively:**
   - Implement proper heading hierarchy (H1 → H2 → H3)
   - Use appropriate macros for different content types
   - Structure content with panels, tables, and lists as appropriate

2. **Heading Structure:**
   - H1: Page title (only one per page)
   - H2: Major sections
   - H3: Subsections
   - H4: Detailed points within subsections

3. **Content Blocks:**
   - Use info, note, warning panels to highlight important information
   - Use code blocks with appropriate language specification
   - Use tables for structured data and comparisons
   - Use numbered lists for sequential procedures
   - Use bullet lists for non-sequential items

#### 2.3 Templates
1. **Standard Templates:**
   - SOP Template
   - Technical Specification Template
   - Meeting Notes Template
   - Decision Record Template
   - How-To Guide Template

2. **Template Usage:**
   - Use the appropriate template for the type of document
   - Customize templates as needed while maintaining core structure
   - Create new templates only when existing ones cannot be adapted

### 3. Jira Configuration and Usage

#### 3.1 Project Structure
1. **Project Types:**
   - Use "Next-gen" projects for team-specific work
   - Use "Classic" projects for cross-team initiatives

2. **Issue Types:**
   - Epic: Large body of work that contains multiple stories/tasks
   - Story: User-focused functionality that delivers value
   - Task: Technical work that supports stories
   - Bug: Defect that needs to be fixed
   - Subtask: Component of a larger issue

#### 3.2 Issue Fields and Standards
1. **Required Fields:**
   - Summary: Clear, concise description of the issue
   - Description: Detailed information following the issue template
   - Priority: Importance of the issue (P1-P5)
   - Assignee: Person responsible for the issue
   - Components: Affected system components
   - Labels: Categorization tags

2. **Issue Templates:**
   - Story Template: User story format with acceptance criteria
   - Bug Template: Steps to reproduce, expected vs. actual behavior
   - Task Template: Objective, requirements, and definition of done

#### 3.3 Workflow and Statuses
1. **Standard Workflow:**
   - To Do: Not yet started
   - In Progress: Currently being worked on
   - In Review: Ready for review/testing
   - Done: Completed and verified

2. **Status Transitions:**
   - Document required approvals or conditions for each transition
   - Implement automation rules for standard transitions

### 4. Integration Between Confluence and Jira

#### 4.1 Linking Strategy
1. **Jira to Confluence:**
   - Link issues to relevant documentation
   - Use the "Documentation" custom field to store primary doc links

2. **Confluence to Jira:**
   - Use Jira issue macros to embed issue details
   - Create filtered issue lists for relevant project components

#### 4.2 Documentation Requirements
1. **For Features:**
   - Technical specification in Confluence before development
   - User documentation updated with feature completion

2. **For Processes:**
   - SOP document in Confluence
   - Linked to relevant project or component

### 5. Documentation Maintenance

#### 5.1 Review Cycle
1. **Regular Reviews:**
   - Technical documentation: Quarterly review
   - Process documentation: Semi-annual review
   - User documentation: Review with each major release

2. **Review Process:**
   - Assign documentation owners for each area
   - Schedule regular review meetings
   - Track documentation debt in Jira

#### 5.2 Versioning
1. **Version Control:**
   - Use page versioning for significant changes
   - Add version history section for major documents
   - Label outdated content clearly

2. **Archiving:**
   - Archive obsolete documentation rather than deleting
   - Move to an "Archive" space or label as "Archived"

### 6. Best Practices for Atlassian Document Structure

#### 6.1 Content Creation
1. **Writing Style:**
   - Use clear, concise language
   - Write in active voice
   - Use consistent terminology
   - Define acronyms and technical terms

2. **Visual Elements:**
   - Use diagrams for complex concepts
   - Include screenshots for UI-related documentation
   - Maintain consistent formatting

#### 6.2 Advanced ADF Implementation
1. **Macros:**
   - Use the Table of Contents macro for longer documents
   - Use the Status macro to indicate document status
   - Use the Info, Note, and Warning macros appropriately
   - Use the Code Block macro with language specification

2. **Tables:**
   - Include headers for all tables
   - Keep tables simple and focused
   - Use consistent formatting

3. **Lists:**
   - Use numbered lists for sequential steps
   - Use bullet lists for non-sequential items
   - Maintain consistent formatting and parallelism

## Verification
- Documentation follows the specified structure and naming conventions
- Jira issues contain required information and links to relevant documentation
- Regular documentation reviews are scheduled and completed
- New team members can find information efficiently

## Exceptions
- Quick, temporary notes may use simplified formats but should be converted to standard format if retained
- Emergency documentation may be created with minimal structure and improved later

## Related Documents
- [Atlassian Document Format Structure](https://developer.atlassian.com/cloud/jira/platform/apis/document/structure/)
- [WTFB Standard Operating Procedures Framework](./SOP-Framework.md)
- [Confluence Documentation](https://support.atlassian.com/confluence-cloud/resources/)
- [Jira Documentation](https://support.atlassian.com/jira-software-cloud/resources/)

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-04-18 | Auggie | Initial version |

---

> **Note:** This SOP implements Atlassian's document structure guidelines while adapting them to WTFB's specific needs and workflows.

Created by Auggie, ARCHitect-in-the-IDE

For support, contact [J. Scott Graham](https://jscottgraham.us) at [scott@wordstofilmby.com](mailto:scott@wordstofilmby.com)
