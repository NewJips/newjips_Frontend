import i18n from "@/i18n";

export default {
  menus: [
    {
      title: i18n.global.t('common.map'),
      url: '/map',
    },
    {
      title: i18n.global.t('common.buddiz'),
      url: '/buddiz',
    },
    {
      title: i18n.global.t('common.notice'),
      url: '/board',
    },
    {
      title: i18n.global.t('common.chat'),
      url: '/chat',
    },
    {
      title: i18n.global.t('common.loan'),
      url: '/loanproduct',
    },
    
    {
      title: i18n.global.t('common.guide'),
      url: '/guide',
    },
    {
      title: i18n.global.t('form.guide'),
      url: '/form',
    },
  ],

  accoutMenus: {
    login: {
      url: '/auth/login',
      title:  i18n.global.t('common.login'),
    },
  },
};
