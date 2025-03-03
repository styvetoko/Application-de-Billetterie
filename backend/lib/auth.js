import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/authMiddleware';

export async function signup(userData) {
    //Replace with your actual database query
    return {id: 1, ...userData}
}

export async function login(userData) {
    //Replace with your actual database query
    const user = {id: 1, name: 'Gaetan'};
    const token = generateToken(user.id);
    return {user, token};
}

function generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

export async function getEvents() {
    // Replace with your actual database query
    const events = [
        { id: 1, title: 'Event 1', date: '2024-05-01' },
        { id: 2, title: 'Event 2', date: '2024-05-08' },
    ];
    return events;
}

export async function getEventById(id) {
    // Replace with your actual database query
    const event = { id: id, title: 'Event ' + id, date: '2024-05-0' + id };
    return event;
}

export async function createEvent(data) {
    //Replace with your actual database query
    return {id: 3, ...data}
}

export async function getTicketsByUserId(userId) {
    // Replace with your actual database query
    const tickets = [
        { id: 1, eventId: 1, userId: userId },
        { id: 2, eventId: 2, userId: userId },
    ];
    return tickets;
}

export async function buyTicket(eventId, userId) {
    //Replace with your actual database query
    return {id: 3, eventId: eventId, userId: userId}
}

export async function getProfile(userId) {
    //Replace with your actual database query
    return {id: userId, name: 'Gaetan'}
}

