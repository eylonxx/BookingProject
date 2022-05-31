import cyber from "../2-utils/cyber";
import dal from "../2-utils/dal";
import CredentialsModel from "../4-models/credentials-model";
import { UnauthorizedError } from "../4-models/errors-model";
import Role from "../4-models/role-model";
import UserModel from "../4-models/user-model";

async function register(user: UserModel): Promise<string> { // Returns back token (JWT)

    user.email = user.email.toLowerCase();

    // Joi Validation - השלימו בזמנכם הפנוי
    
    // Get all users: 
    const users = await dal.fetchUsers();

    // Unique Email Validation - השלימו בזמנכם הפנוי

    // Generate id and role: 
    user.id = users[users.length - 1].id + 1;
    user.role = Role.User;

    // Add to users collection: 
    users.push(user);

    // Save back to file: 
    await dal.saveUsers(users);

    // Generate token: 
    const token = cyber.getNewToken(user);

    // Return the token:
    return token;
}

async function login(credentials: CredentialsModel): Promise<string> {

    credentials.email = credentials.email.toLowerCase();

    // Joi Validation - השלימו בזמנכם הפנוי

    // Get all users: 
    const users = await dal.fetchUsers();

    // Check credentials: 
    const user = users.find(u => u.email === credentials.email && u.password === credentials.password);

    // If user not exist: 
    if(!user) {
        throw new UnauthorizedError("Incorrect username or password");
    }

    // Generate token: 
    const token = cyber.getNewToken(user);

    // Return the token:
    return token;
}

export default {
    register,
    login
}