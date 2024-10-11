import api from '@/api';

const BASE_URL = '/api/member';
const headers = { 'Content-Type': 'multipart/form-data' };

export default {
  //////////////  회원 정보（ａｕｔｈ） 조회   ///////////////////////

  //   async getList(params) {
  //       const { data } = await api.get(BASE_URL, { params });
  //     console.log('AUTH GET LIST: ', data);
  //     return data;
  //   },

  ///////////////  회원 id중복 체크   ////////////////////////

  async checkId(userId) {
    const { data } = await api.get(`${BASE_URL}/checkid/${userId}`);
    console.log('AUTH GET CHECK ID', data);
    return data;
  },

  ///////////////  회원 정보 조회（ｕｓｅｒｎａｍｅ ＝＝ ｉｄ） ////////////////////////
  async get(userId) {
    const { data } = await api.get(`${BASE_URL}/${userId}`);
    console.log('AUTH GET', data);
    return data;
  },

  ///////////////// 회원 정보 가입 //////////////////////////
  async create(member) {
    const formData = new FormData();
    // formData.append('uno', member.uno);
    formData.append('userId', member.userId);
    formData.append('password', member.password);
    formData.append('name', member.name);
    formData.append('nickname', member.nickname);
    formData.append('gender', member.gender);
    // if (member.avatar) {
    //   formData.append('avatar', member.avatar);
    // }

    // --------> 회원 정보 post방식 전송  //////////////////////////
    const { data } = await api.post(BASE_URL, formData, headers);
    console.log('AUTH POST: ', data);

    // 데이터에는 토큰이 포함되어 있어야 함
    return data; // 로그인 시 사용하기 위한 토큰 또는 사용자 정보를 반환
  },
  /////////////// 회원 정보 수정 ///////////////////////////////

  async update(formdata) {
    console.log('update : ', formdata);
    const { data } = await api.put(BASE_URL, formdata, headers);
    return data;
  },

  /////////////// 회원 탈퇴 ///////////////////////////////

  async delete(userId) {
    const { data } = await api.delete(`${BASE_URL}/${userId}`);
    console.log('AUTH DELETE: ', data);
    return data;
  },

  /////////////// 회원 암호 수정 ///////////////////////////////

  async changePassword(formData) {
    const { data } = await api.put(`${BASE_URL}/changepassword`, formData);
    return data;
  },

  /////////////// 버디즈 회원 조회 /////////////////////////////
  async findBuddiz(uno) {
    const { data } = await api.get(`${BASE_URL}/buddiz/${uno}`);
    return data;
  },
};
