
## Contract Security Measures

### SWC-119 Shadowing State Variables
Storage variables reviewed to ensure there are `no naming ambiguities`.

### SWC-131 Presence of Unused variables
The contract is checked to ensure `no unused variables are present`.

### SWC-103 Floating Pragma
Specific compiler pragma is used in TokenVines to avoid accidental bug inclusion through `outdated compiler versions`.

### Pull over Push
Contract functions `modify state based on receiving calls` rather than making contract calls

### Modifiers used for Validation
Data is validated throughout the contract with `require` statements