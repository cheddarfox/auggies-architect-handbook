# WTFB Testing Standards and Procedures SOP

## Purpose
This document establishes standard procedures for testing in WTFB projects to ensure code reliability, prevent regressions, and maintain high-quality software across all environments.

## Scope
This SOP covers all aspects of testing, including unit tests, integration tests, end-to-end tests, and manual testing procedures. It applies to all code changes in WTFB repositories and all team members involved in development.

## Roles & Responsibilities
- **Developers:** Write and maintain tests for their code, run tests before submitting PRs
- **QA Engineers:** Design test strategies, create end-to-end tests, perform exploratory testing
- **ARCHitects (including Auggie):** Ensure testing standards are followed, review test coverage
- **Project Leads:** Allocate time for testing in sprint planning, address testing debt

## Prerequisites
- Understanding of WTFB codebase and architecture
- Familiarity with testing frameworks and tools
- Access to development and testing environments

## Procedure

### 1. Testing Philosophy and Approach

#### 1.1 Testing Pyramid
1. **Unit Tests:**
   - Highest quantity, fastest execution
   - Test individual functions and components in isolation
   - Mock external dependencies

2. **Integration Tests:**
   - Test interactions between components
   - Verify correct communication between services
   - Limited mocking of critical dependencies

3. **End-to-End Tests:**
   - Test complete user flows
   - Verify system behavior from user perspective
   - Minimal mocking, use test environments

#### 1.2 Test-Driven Development (TDD)
1. **Recommended Approach:**
   - Write tests before implementation when possible
   - Follow the Red-Green-Refactor cycle:
     - Red: Write a failing test
     - Green: Write minimal code to make the test pass
     - Refactor: Improve the code while keeping tests passing

2. **Benefits:**
   - Ensures testable code design
   - Provides clear acceptance criteria
   - Prevents regressions during refactoring

#### 1.3 Coverage Requirements
1. **Minimum Coverage Targets:**
   - Unit tests: 80% line coverage
   - Integration tests: Cover all critical paths
   - E2E tests: Cover all main user flows

2. **Strategic Coverage:**
   - Focus on business-critical functionality
   - Prioritize complex logic and error-prone areas
   - Balance coverage with maintenance cost

### 2. Unit Testing

#### 2.1 Framework and Tools
1. **Primary Testing Framework:**
   - Jest for JavaScript/TypeScript
   - React Testing Library for React components

2. **Configuration:**
   - Tests located in `__tests__` directories or alongside source files with `.test.ts` or `.spec.ts` extension
   - Jest configuration in `jest.config.js`

#### 2.2 Unit Test Structure
1. **Test Organization:**
   ```typescript
   describe('ComponentName', () => {
     describe('functionName', () => {
       it('should do something when condition', () => {
         // Test code
       });
       
       it('should handle error case', () => {
         // Test code
       });
     });
   });
   ```

2. **Naming Conventions:**
   - Test descriptions should clearly state expected behavior
   - Use "should" statements to describe outcomes
   - Include the condition being tested

3. **Arrange-Act-Assert Pattern:**
   ```typescript
   it('should update user profile when valid data is provided', () => {
     // Arrange
     const initialUser = { name: 'John' };
     const updatedData = { name: 'John Doe' };
     
     // Act
     const result = updateUserProfile(initialUser, updatedData);
     
     // Assert
     expect(result.name).toBe('John Doe');
   });
   ```

#### 2.3 Mocking
1. **When to Mock:**
   - External services and APIs
   - Database interactions
   - Complex dependencies not under test
   - Time-dependent functionality

2. **Mocking Techniques:**
   - Jest mock functions: `jest.fn()`
   - Module mocks: `jest.mock()`
   - Manual mocks in `__mocks__` directory

3. **Example:**
   ```typescript
   // Mock a service
   jest.mock('../services/userService', () => ({
     getUserById: jest.fn().mockResolvedValue({ id: '123', name: 'Test User' }),
     updateUser: jest.fn().mockResolvedValue(true)
   }));
   ```

#### 2.4 Testing React Components
1. **Component Testing Principles:**
   - Test behavior, not implementation
   - Focus on user interactions
   - Verify rendered output

2. **Example Component Test:**
   ```typescript
   import { render, screen, fireEvent } from '@testing-library/react';
   import UserProfileForm from './UserProfileForm';

   describe('UserProfileForm', () => {
     it('should call onSubmit with updated data when form is submitted', () => {
       // Arrange
       const mockOnSubmit = jest.fn();
       render(<UserProfileForm user={{ name: 'John' }} onSubmit={mockOnSubmit} />);
       
       // Act
       fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
       fireEvent.click(screen.getByRole('button', { name: /save/i }));
       
       // Assert
       expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'John Doe' });
     });
   });
   ```

### 3. Integration Testing

#### 3.1 Framework and Tools
1. **Primary Tools:**
   - Jest for test execution
   - Supertest for API testing
   - Test database instances

2. **Configuration:**
   - Tests located in `integration` directory
   - Separate configuration for integration tests

#### 3.2 API Testing
1. **Test Structure:**
   ```typescript
   describe('User API', () => {
     describe('GET /api/users/:id', () => {
       it('should return user data when valid ID is provided', async () => {
         // Test code
       });
       
       it('should return 404 when user does not exist', async () => {
         // Test code
       });
     });
   });
   ```

2. **Example API Test:**
   ```typescript
   import request from 'supertest';
   import { app } from '../app';
   import { setupTestDatabase, teardownTestDatabase } from '../test-utils';

   describe('User API', () => {
     beforeAll(async () => {
       await setupTestDatabase();
     });

     afterAll(async () => {
       await teardownTestDatabase();
     });

     describe('GET /api/users/:id', () => {
       it('should return user data when valid ID is provided', async () => {
         const response = await request(app)
           .get('/api/users/123')
           .set('Authorization', `Bearer ${testToken}`);
         
         expect(response.status).toBe(200);
         expect(response.body).toHaveProperty('name');
       });
     });
   });
   ```

#### 3.3 Database Integration
1. **Test Database Setup:**
   - Use separate test database
   - Reset database state between test suites
   - Seed with test data

2. **Example Database Test:**
   ```typescript
   import { UserRepository } from '../repositories/userRepository';
   import { setupTestDatabase, teardownTestDatabase } from '../test-utils';

   describe('UserRepository', () => {
     beforeAll(async () => {
       await setupTestDatabase();
     });

     afterAll(async () => {
       await teardownTestDatabase();
     });

     it('should create a new user', async () => {
       const userRepo = new UserRepository();
       const newUser = await userRepo.create({ name: 'Test User', email: 'test@example.com' });
       
       expect(newUser.id).toBeDefined();
       expect(newUser.name).toBe('Test User');
     });
   });
   ```

### 4. End-to-End Testing

#### 4.1 Framework and Tools
1. **Primary Tools:**
   - Playwright for browser-based testing
   - Cypress as an alternative

2. **Configuration:**
   - Tests located in `e2e` directory
   - Configuration in `playwright.config.ts` or `cypress.json`

#### 4.2 Test Structure
1. **Organization by User Flows:**
   ```typescript
   describe('User Authentication', () => {
     test('User can sign up with valid credentials', async ({ page }) => {
       // Test code
     });
     
     test('User can log in and access protected resources', async ({ page }) => {
       // Test code
     });
   });
   ```

2. **Example E2E Test:**
   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('User Authentication', () => {
     test('User can sign up with valid credentials', async ({ page }) => {
       // Navigate to signup page
       await page.goto('/signup');
       
       // Fill the form
       await page.fill('[name="email"]', 'test@example.com');
       await page.fill('[name="password"]', 'SecurePassword123');
       await page.fill('[name="confirmPassword"]', 'SecurePassword123');
       
       // Submit the form
       await page.click('button[type="submit"]');
       
       // Verify redirect to dashboard
       await expect(page).toHaveURL(/dashboard/);
       
       // Verify welcome message
       await expect(page.locator('.welcome-message')).toContainText('Welcome');
     });
   });
   ```

#### 4.3 Test Data Management
1. **Test Users:**
   - Create dedicated test users
   - Reset user state between tests
   - Use unique identifiers for test data

2. **Environment Variables:**
   - Store environment-specific configuration
   - Use different variables for different test environments

#### 4.4 Visual Testing
1. **Screenshot Comparison:**
   - Capture screenshots of critical UI states
   - Compare against baseline images
   - Update baselines when UI changes are approved

2. **Example:**
   ```typescript
   test('Dashboard displays correctly', async ({ page }) => {
     await loginTestUser(page);
     await page.goto('/dashboard');
     
     // Wait for dashboard to load completely
     await page.waitForSelector('.dashboard-stats', { state: 'visible' });
     
     // Compare screenshot
     expect(await page.screenshot()).toMatchSnapshot('dashboard.png');
   });
   ```

### 5. Manual Testing

#### 5.1 Exploratory Testing
1. **When to Perform:**
   - Before major releases
   - For complex new features
   - When automated tests are insufficient

2. **Process:**
   - Define test charter with goals and scope
   - Document issues found during exploration
   - Create automated tests for discovered issues

#### 5.2 User Acceptance Testing (UAT)
1. **Process:**
   - Prepare test scenarios based on requirements
   - Involve stakeholders in testing
   - Document feedback and issues

2. **Acceptance Criteria:**
   - Define clear acceptance criteria for each feature
   - Verify all criteria are met before release

### 6. Test Execution

#### 6.1 Local Testing
1. **Pre-Commit Testing:**
   - Run unit tests before committing: `yarn test`
   - Run linting checks: `yarn lint`

2. **Pre-Push Testing:**
   - Run integration tests: `yarn test:integration`
   - Run type checks: `yarn typecheck`

#### 6.2 CI/CD Testing
1. **Pull Request Checks:**
   - Run all unit and integration tests
   - Verify code coverage meets requirements
   - Run linting and type checking

2. **Deployment Pipeline:**
   - Run E2E tests in staging environment
   - Run performance tests for critical paths
   - Run security scans

#### 6.3 Test Reports
1. **Coverage Reports:**
   - Generate and publish coverage reports
   - Track coverage trends over time

2. **Test Results:**
   - Store test results for historical comparison
   - Highlight flaky tests for investigation

### 7. Test Maintenance

#### 7.1 Dealing with Flaky Tests
1. **Identification:**
   - Track tests that fail intermittently
   - Analyze patterns in failures

2. **Resolution:**
   - Improve test isolation
   - Add appropriate waits and retries
   - Refactor tests to be more robust

#### 7.2 Test Refactoring
1. **When to Refactor:**
   - When tests become slow or brittle
   - When application code changes significantly
   - When testing patterns improve

2. **Refactoring Approach:**
   - Maintain same coverage during refactoring
   - Update tests incrementally
   - Review test changes as part of code review

## Verification
- All code changes include appropriate tests
- Test coverage meets or exceeds targets
- CI/CD pipeline includes all required test types
- Tests are maintained and updated with code changes

## Exceptions
- Proof-of-concept or experimental code may have reduced testing requirements
- Critical hotfixes may be deployed with minimal testing, followed by comprehensive testing
- Legacy code may temporarily have lower coverage targets with a plan to improve

## Related Documents
- [WTFB Standard Operating Procedures Framework](./SOP-Framework.md)
- [Code Review Process SOP](./Code-Review-Process-SOP.md)
- [Deployment Process SOP](./Deployment-Process-SOP.md)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)

## Revision History
| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-04-18 | Auggie | Initial version |

---

> **Note:** Testing is not just about finding bugs but about building confidence in the codebase and enabling faster, safer development.

Created by Auggie, ARCHitect-in-the-IDE

For support, contact [J. Scott Graham](https://jscottgraham.us) at [scott@wordstofilmby.com](mailto:scott@wordstofilmby.com)
