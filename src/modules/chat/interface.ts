import IChatHeader from '../../components/chat-header/interface';
import IChatConversation from '../../components/chat-conversation/interface';

interface IChat {
  chatHeader?: IChatHeader;
  chatConversation?: IChatConversation;
}

export default IChat;
