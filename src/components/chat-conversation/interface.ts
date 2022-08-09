import IChatConversationMessage from '../chat-conversation-message/interface';

interface IChatConversation {
  items: {
    date: string,
    messages: IChatConversationMessage[]
  }[] | boolean;
  placeholderText: string,
}

export default IChatConversation;
