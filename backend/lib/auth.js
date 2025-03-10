import jwt from 'jsonwebtoken';
import Joi from 'joi';

const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

// Fonction pour l'inscription des utilisateurs
export async function signup(userData) {
    const { error, value } = userSchema.validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    // Remplacer par votre requête de base de données réelle
    return {id: 1, ...userData}
}

// Fonction pour la connexion des utilisateurs
export async function login(userData) {
    const { error, value } = userSchema.validate(userData);
    if (error) {
        throw new Error(error.details[0].message);
    }
    // Remplacer par votre requête de base de données réelle
    const user = {id: 1, name: 'Gaetan'};
    const token = generateToken(user.id);
    return {user, token};
}

// Fonction pour générer un jeton JWT
function generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

// Fonction pour récupérer le profil de l'utilisateur
export async function getProfile(userId) {
    // Remplacer par votre requête de base de données réelle
    return {id: userId, name: 'Gaetan'}
}

