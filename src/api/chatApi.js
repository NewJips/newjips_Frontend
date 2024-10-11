import api from '@/api';

const BASE_URL = '/api/chat';

const headers = { 'Content-Type': 'application/json' };


export default {
    // 채팅방 리스트 조회
  async getRoomList(id) {
    const { data } = await api.get(`${BASE_URL}/roomList`, { 
        params : {
            uno : id
        }
    });
    return data;
  },

  // 채팅 내역 조회
  async getChatMsgList(Roomid, uid) {
    const { data } = await api.get(BASE_URL, { 
        params : {
            room : Roomid,
            uno : uid
        }
    });
    return data;
  },

  // 채팅 보내기
  async sendMsg(obj) {
    const { data } = await api.post(`${BASE_URL}/send`, {
        content: obj.content,
        fromSender: obj.fromSender,
        roomId: obj.roomId
      }, headers);

    return data;
  },

  // 채팅방 만들기
  async createRoom(from_id, to_id) {
    const formData = {
        fromId: from_id,
        toId: to_id
    };

    const { data } = await api.post(`${BASE_URL}/room`, formData, headers);
    return data;
  },

};
