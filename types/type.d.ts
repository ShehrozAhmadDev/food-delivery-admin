export interface IMessage {
    senderId: string | null;
    text: string;
    conversationId: string | null;
}