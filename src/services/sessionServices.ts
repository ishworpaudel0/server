import Session from "../models/sessionModel";

export const createSession = async (userId: string, userAgent: string, ip: string) => {
    return await Session.create({ user: userId, userAgent, ip });
};

export const findAllSessions = async (userId: string) => {
    return await Session.find({ user: userId });
};

export const deleteSession = async (sessionId: string) => {
    return await Session.findByIdAndDelete(sessionId);
};