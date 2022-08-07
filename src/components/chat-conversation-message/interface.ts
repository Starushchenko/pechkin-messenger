interface IChatConversationMessage {
  time?: string;
  asset?: HTMLImageElement | string | boolean;
  isMine?: boolean;
  text?: string;
  read?: boolean;
  delivered?: boolean;
}

export default IChatConversationMessage;
