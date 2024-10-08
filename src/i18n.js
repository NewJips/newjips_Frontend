import { createI18n } from 'vue-i18n';

function loadLocaleMessages() {
  const locales = import.meta.glob('./locales/**/[a-z]*.json', { eager: true });
  const messages = {};
  
  for (const path in locales) {
    const matched = path.match(/locales\/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\.json$/);
    if (matched && matched.length > 2) {
      const locale = matched[1]; // e.g., 'ko' or 'vn'
      const namespace = matched[2]; // e.g., 'common' or 'message'

      console.log(`Locale: ${locale}, Namespace: ${namespace}`);

      // Initialize locale and namespace if not already
      messages[locale] = messages[locale] || {};
      messages[locale][namespace] = locales[path];
    }
  }
  
  return messages;
}

const i18n = createI18n({
  locale: 'ko', // 기본 언어
  fallbackLocale: 'ko', // fallback 언어
  messages: loadLocaleMessages(),
});

export default i18n;