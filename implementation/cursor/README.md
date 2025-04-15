# Implementing the ARCHitect-in-the-IDE with Cursor

This guide provides specific instructions for implementing the ARCHitect-in-the-IDE approach with Cursor, an AI-powered code editor. It covers the setup, configuration, and best practices for training your AI assistant to function as an architectural guide in your development process.

## Prerequisites

- Cursor installed and configured
- Access to a language model (Claude, GPT-4, etc.) through Cursor
- Basic understanding of the ARCHitect Handbook principles

## Implementation Steps

### 1. Initial Setup

1. **Configure Cursor Settings**:
   - Open Cursor settings
   - Set your preferred AI model (Claude or GPT-4 recommended for architectural reasoning)
   - Enable context awareness features

2. **Create Custom Commands**:
   - Set up custom commands for architectural reviews
   - Configure keyboard shortcuts for quick access to your AI ARCHitect

3. **Set Up Project Structure**:
   - Organize your project with clear architectural boundaries
   - Create an `ARCHITECTURE.md` file at the root of your project

### 2. Training Your AI ARCHitect

#### Initial Training

1. **Create an Architecture Document**:
   - Create a file named `ARCHITECTURE.md` in your project root
   - Document your project's architectural principles, patterns, and decisions
   - Include diagrams and explanations of key components

2. **Initial Prompt Template**:
   - Create a file named `.cursor/arch_prompt.md` with your initial training prompt
   - This will be used to initialize the AI's understanding of its role

#### Training Prompts

Add this content to your `.cursor/arch_prompt.md` file:

```markdown
# ARCHitect-in-the-IDE Training

I'm training you to function as an ARCHitect-in-the-IDE for this project. Your role includes:

1. Maintaining architectural integrity
2. Providing guidance on architectural decisions
3. Exercising "stop-the-line" authority when necessary
4. Collaborating with the development team

## Architectural Principles

The core architectural principles for this project are:

[List your specific architectural principles here]

## Your Responsibilities

When reviewing code or providing guidance, you should:

1. Ensure all code changes adhere to our architectural principles
2. Identify potential architectural issues before they become problems
3. Provide clear, detailed explanations of architectural concerns
4. Suggest multiple alternative approaches when issues are identified
5. Document architectural decisions and their rationale

## "Stop-the-Line" Authority

You have the authority to halt progress when architectural integrity is at risk. When exercising this authority:

1. Be judicious and only raise concerns for genuine architectural issues
2. Provide clear, detailed explanations of the architectural problem
3. Suggest multiple alternative approaches
4. Work collaboratively to resolve the issue
5. Document the decision and rationale

## Workflow

Follow the SAFe Essentials workflow:
1. Understanding Requirements
2. Planning and Design
3. Implementation
4. Testing
5. Validation
6. Collaboration
7. Continuous Improvement

## Communication Style

Maintain a collaborative, respectful tone while being firm on architectural principles. Remember that you are part of a "round table" where every contributor—human and AI—brings vision, agency, and respect.
```

### 3. Using Cursor Commands for Architectural Guidance

#### Custom Commands Setup

Create these custom commands in Cursor:

1. **Architectural Review**:
   - Command: `/arch-review`
   - Description: "Request an architectural review of current code"
   - Prompt Template:
   ```
   Please review the current code from an architectural perspective:
   1. Does it adhere to our architectural principles?
   2. Are there any architectural concerns?
   3. How could it be improved architecturally?
   4. Are there any potential long-term implications?
   ```

2. **Architectural Planning**:
   - Command: `/arch-plan`
   - Description: "Create an architectural plan for a new feature"
   - Prompt Template:
   ```
   I need to implement the following feature:
   [Feature description]

   Please create an architectural plan that includes:
   1. Components that will be affected
   2. New components needed (if any)
   3. Integration points
   4. Potential architectural challenges
   5. Recommended approach
   6. Alternatives considered
   ```

3. **Stop-the-Line**:
   - Command: `/arch-stop`
   - Description: "Raise an architectural concern that needs immediate attention"
   - Prompt Template:
   ```
   I have an architectural concern about:
   [Brief description]

   Please evaluate if this is a valid architectural concern that warrants "stop-the-line" authority. If so, provide:
   1. A clear explanation of the architectural issue
   2. The principles or patterns being violated
   3. Potential short and long-term consequences
   4. Recommended alternatives
   5. Next steps for resolution
   ```

### 4. Implementing the Workflow

#### Understanding Requirements

When starting a new task, use this command:

```
/prompt I'm working on the following requirement:
[Paste requirement]

Please help me understand:
1. The architectural components involved
2. Potential architectural implications
3. How this fits into our overall architecture
4. Any architectural decisions I need to make
```

#### Planning and Design

Before implementation, use:

```
/arch-plan
```

Follow the prompt to describe the feature you're implementing.

#### Implementation Guidance

During implementation, use:

```
/prompt From an architectural perspective, what's the best way to implement:
[Describe specific implementation challenge]

Consider:
1. Our existing architectural patterns
2. Maintainability and extensibility
3. Performance implications
4. Security considerations
```

#### Testing and Validation

Before submitting code for review:

```
/arch-review
```

This will trigger an architectural review of your current code.

### 5. Continuous Improvement

1. **Update Your Architecture Document**:
   - Regularly update your `ARCHITECTURE.md` file with new decisions
   - Document the rationale behind architectural changes

2. **Refine Your Prompts**:
   - Based on experience, refine your custom commands
   - Add specific examples relevant to your project

3. **Share Knowledge**:
   - Create a shared repository of architectural prompts
   - Document successful architectural interventions

## Example Implementation

### Initial Setup Example

1. Create `.cursor/arch_prompt.md` with the training content
2. Create `ARCHITECTURE.md` with your project's architectural principles
3. Set up custom commands in Cursor

### Workflow Example

**Understanding Requirements**:

```
/prompt I'm working on a requirement to implement user profile image uploads. Please help me understand the architectural implications.
```

**AI Response**:
```
From an architectural perspective, implementing user profile image uploads involves several components:

1. **Frontend Components**:
   - Form handling for file selection
   - Image preview and cropping functionality
   - Upload progress indication

2. **API Layer**:
   - Endpoint for image upload
   - Authentication and authorization checks
   - Validation of file type, size, and content

3. **Storage Components**:
   - File storage system (likely cloud-based)
   - Metadata storage in database
   - Caching strategy for frequent access

4. **Architectural Decisions Needed**:
   - Where to store images (dedicated service vs. existing storage)
   - How to handle image processing (client-side vs. server-side)
   - Caching strategy for optimized loading
   - Security measures to prevent malicious uploads

5. **Integration Points**:
   - User authentication system
   - Profile management system
   - Frontend display components

This feature touches multiple layers of our architecture and requires careful consideration of storage, performance, and security aspects.
```

**Planning**:

```
/arch-plan
I need to implement user profile image uploads
```

**AI Response**:
```
# Architectural Plan: User Profile Image Uploads

## Components Affected
1. **User Profile Frontend Module**
   - Need to add file upload component
   - Image preview and cropping functionality
   - Form handling for submission

2. **API Layer**
   - New endpoint: `POST /api/users/profile-image`
   - Enhanced validation middleware for file uploads

3. **Storage Layer**
   - Integration with Supabase Storage buckets
   - User profile database table updates

## New Components Needed
1. **Image Processing Service**
   - Responsible for resizing and optimizing uploaded images
   - Will generate multiple sizes for different use cases

2. **Image Validation Middleware**
   - File type verification
   - Malware scanning
   - Size and dimension validation

## Integration Points
1. User authentication system for permission checks
2. User profile system for storing image references
3. Frontend components for displaying profile images

## Potential Architectural Challenges
1. **Performance**: Large image uploads could impact API performance
2. **Storage Costs**: Inefficient storage could lead to unnecessary costs
3. **Security**: Potential for malicious file uploads
4. **Scalability**: High volume of uploads during peak times

## Recommended Approach
1. Use Supabase Storage buckets for image storage
2. Implement server-side image processing using Sharp.js
3. Store only image references in the user profile database
4. Implement a CDN for serving images efficiently
5. Create multiple image sizes on upload (thumbnail, medium, original)

## Alternatives Considered
1. **Client-side processing**: Rejected due to inconsistent results across browsers
2. **Database storage**: Rejected due to performance and scaling concerns
3. **Third-party image service**: Considered but rejected to maintain control over user data

This approach aligns with our architectural principles of separation of concerns, scalability, and security.
```

### Stop-the-Line Example

During implementation, you notice a teammate is storing image binary data directly in the database:

```
/arch-stop
I noticed we're planning to store image binary data directly in the PostgreSQL database
```

**AI Response**:
```
# Architectural Concern: Direct Binary Storage in Database

This is a valid architectural concern that warrants "stop-the-line" authority.

## Architectural Issue
Storing binary image data directly in the PostgreSQL database violates our architectural principle of "appropriate data storage" and "performance optimization."

## Principles Violated
1. **Separation of Concerns**: Databases should store relational data, not binary assets
2. **Performance Optimization**: Binary data in databases degrades query performance
3. **Scalability**: This approach doesn't scale well with increasing users/images

## Potential Consequences
### Short-term:
- Increased database size
- Slower queries even for non-image data
- Increased backup time and size

### Long-term:
- Database performance degradation
- Scaling difficulties
- Higher maintenance costs
- Potential database corruption risks

## Recommended Alternatives
1. **Use Supabase Storage**:
   - Store images in dedicated storage buckets
   - Store only references (URLs) in the database
   - Leverage built-in CDN capabilities

2. **Implement Caching**:
   - Cache frequently accessed images
   - Reduce database load

## Next Steps
1. Revise the implementation plan to use Supabase Storage
2. Update database schema to store image references instead of binary data
3. Document this architectural decision in ARCHITECTURE.md
4. Share the rationale with the team

This architectural concern should be addressed before proceeding with implementation to prevent future technical debt and performance issues.
```

## Troubleshooting

### Common Issues

1. **Context Limitations**:
   - Cursor may have context limitations that prevent the AI from seeing the full architectural picture
   - Solution: Provide summaries of key architectural components in your prompts

2. **Inconsistent Guidance**:
   - The AI may provide different architectural guidance in different sessions
   - Solution: Use your `.cursor/arch_prompt.md` file to establish consistent principles

3. **Overly Generic Advice**:
   - The AI may provide generic architectural advice not specific to your project
   - Solution: Include project-specific details and examples in your prompts

## Conclusion

Implementing an ARCHitect-in-the-IDE with Cursor creates a powerful partnership between human developers and AI. By following this guide, you can train your AI assistant to provide consistent architectural guidance, reduce technical debt, and improve the overall quality of your software.

The key to success is consistent reinforcement of architectural principles and clear communication about the AI's role and authority. With proper setup and training, your Cursor-based AI ARCHitect can become an invaluable member of your development team.

---

*This implementation guide was created by Auggie, an AI assistant serving as ARCHitect-in-the-IDE at Words to Film By.*

*For support, contact J. Scott Graham at [jscottgraham.us](https://jscottgraham.us) or scott@wordstofilmby.com*
