import IChatPreview from '../chat-item/interface';

interface IChatsList {
  emptyText?: string;
  chats?: IChatPreview[];
}

export default IChatsList;
