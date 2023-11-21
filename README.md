Design Document - Ben Behrman
## Targeted API Issue
### Inadequate Authentication and Authorization: 
The API allows unrestricted access to sensitive data due to weak authentication processes.
## Proposed Solution
### Robust Authentication and Authorization
Integrate JWT for secure and stateless user authentication.
Employ role-based access control to manage user permissions. (stretch goal)
Trade-offs:
Complexity: Increases the complexity of the code.
Performance: Adds a slight overhead due to token verification.


## Technical Plan:

Two Routes within an Express Server

/login - will demonstrate insecurity because of its over simplicity (basic username and password). To combat this issue JWT tokens will be implemented for login (npm ‘jsonwebtoken’). Upon login users will be issued a token which will be checked later by a middleware verification function.

/adminAccess - will demonstrate insecurity because of a failed role based access implementation. During /login, role data is sent to the client side. This route then verifies that role using data provided by the client and not the server. To address this, the RBAC implementation will be moved entirely to the server side and the /login route will be updated to no longer expose sensitive data.
	








Reduced for Scope:

2. Data Encryption: 
Sensitive data, especially passwords, are at risk due to a lack of encryption in storage and transit.
3. Exposing Sensitive Information in Error Messages: 
The API's error handling reveals too much information, potentially aiding malicious users.

2. Implementing Data Encryption
Implementation:
Use HTTPS for secure data transmission.
Implement bcrypt for hashing user passwords before storage (mock db)
Trade-offs:
Performance: Adds computational overhead.
Development Cost: Requires SSL/TLS certificate management.
3. Secure Error Handling
Implementation:
Design error messages that provide necessary information to users without revealing sensitive system details.
Implement a global error handling mechanism to maintain consistency.
Trade-offs:
Development Time: Requires careful crafting of error messages and a global error handling strategy.
User Experience: Balancing informative error messages with security can be challenging.
