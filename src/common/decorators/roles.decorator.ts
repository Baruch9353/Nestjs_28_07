// Custom decorator to set allowed roles on route handlers
import { SetMetadata } from '@nestjs/common';

// Define a custom decorator to attach roles metadata to a route
export const Roles = (...roles: string[]) => 
    SetMetadata('roles', roles);
