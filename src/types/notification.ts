export interface Notification {
  id: string;
  data: {
    title: string;
    type: string;
    message: {
      chat_id: string;
      created_at: string;
    };
    image: string | null;
  };
  read_at: string | null;
  created_at: string;
}
