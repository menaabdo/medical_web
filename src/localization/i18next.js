import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./en";
import { ge } from "./ge";

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en, direction: "ltr" },
		ge: { translation: ge, direction: "ltr" },
	},
	interpolation: { escapeValue: false },
	react: {
		useSuspense: true,
	},
});

export default i18n;
