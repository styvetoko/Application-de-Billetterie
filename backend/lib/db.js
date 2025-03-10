import { Pool } from 'pg';

// Crée une nouvelle instance de Pool avec la chaîne de connexion PostgreSQL
const pool = new Pool({
    connectionString: process.env.POSTGRESQL_URI,
});

let cachedClient = null;

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    // Si un client est déjà mis en cache, le retourner
    if (cachedClient) {
        return cachedClient;
    }
    try {
        // Tente de se connecter à la base de données et met en cache le client
        cachedClient = await pool.connect();
        console.log('Connected to the database');
        return cachedClient;
    } catch (error) {
        // En cas d'erreur, afficher un message d'erreur et relancer l'exception
        console.error('Failed to connect to the database', error);
        throw error;
    }
}

// Fonction pour se déconnecter de la base de données
async function disconnectFromDatabase() {
    if (cachedClient) {
        await cachedClient.release();
        cachedClient = null;
        console.log('Disconnected from the database');
    }
}

// Exporter les fonctions de connexion et de déconnexion à la base de données
export { connectToDatabase, disconnectFromDatabase };
