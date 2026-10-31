// The privacy policy and support page exist in English and Arabic; App Store Connect links to the English URLs.
export const CONTACT = "haythamasalama@gmail.com";
const mail = `<a href="mailto:${CONTACT}" dir="ltr">${CONTACT}</a>`;

export interface LegalPage {
  title: string;
  description: string;
  h1: string;
  date?: string;
  lead: string;
  summary?: { icon: string; t: string; b: string }[];
  toc: string;
  sections: { id: string; h2: string; html: string }[];
}

export const LEGAL: Record<"en" | "ar", { privacy: LegalPage; support: LegalPage }> = {
  en: {
    privacy: {
      title: "Privacy policy | EasyShoot",
      description: "EasyShoot collects no personal data. Screenshots stay on your Mac: no account, no analytics, no uploads.",
      h1: "Privacy policy",
      date: "Effective 1 November 2026",
      lead: "EasyShoot collects no personal data. Your screenshots stay on your Mac.",
      summary: [
        { icon: "user", t: "No account", b: "Nothing to sign up for." },
        { icon: "cloud", t: "Nothing uploaded", b: "Screenshots never leave your Mac." },
        { icon: "eye", t: "No tracking", b: "No analytics and no ads, in the app or on this site." },
        { icon: "font", t: "One exception", b: "Fonts you download come from Google Fonts." },
      ],
      toc: "On this page",
      sections: [
        { id: "collect", h2: "What EasyShoot collects", html: "<p>Nothing. EasyShoot has no account, no analytics, no advertising and no tracking. We don’t run servers that receive your data, and we don’t sell or share any data with anyone.</p>" },
        { id: "screenshots", h2: "Your screenshots", html: "<ul><li>Screenshots and edits are processed on your Mac and never uploaded.</li><li>They are saved only to the folder you choose, and copied to the clipboard only when you ask.</li><li>Your settings, shortcuts and presets are stored on your Mac in the app’s preferences.</li></ul>" },
        { id: "permissions", h2: "Permissions", html: "<ul><li><strong>Screen Recording</strong> lets EasyShoot capture your screen. It is used only when you take a screenshot.</li></ul>" },
        { id: "online", h2: "When EasyShoot goes online", html: "<ul><li><strong>Fonts.</strong> When you download a font in the editor, EasyShoot fetches it from Google Fonts (fonts.google.com, fonts.googleapis.com, fonts.gstatic.com). Like any web request, Google receives your IP address; see <a href=\"https://policies.google.com/privacy\">Google’s Privacy Policy</a>. Nothing about you or your screenshots is sent.</li></ul><p>EasyShoot makes no other network requests.</p>" },
        { id: "website", h2: "This website", html: "<ul><li>The site has no cookies, analytics or ads.</li><li>It is hosted on GitHub Pages, which, like any web host, receives your IP address when you visit; see <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement\">GitHub’s Privacy Statement</a>.</li><li>It loads fonts from Google Fonts, so Google receives your IP address.</li><li>If you choose light or dark mode, that choice is saved only in your browser.</li></ul>" },
        { id: "children", h2: "Children", html: "<p>EasyShoot collects no data from anyone, including children.</p>" },
        { id: "contact", h2: "Changes and contact", html: `<p>If this policy changes, the new version will be posted on this page with a new date. Questions: email ${mail} or see the <a href=\"/support.html\">support page</a>.</p>` },
      ],
    },
    support: {
      title: "Support | EasyShoot",
      description: "Help with EasyShoot for Mac: where to find it, Screen Recording permission, shortcuts, where screenshots are saved and how to uninstall.",
      h1: "Support",
      lead: `Questions, problems or ideas: email ${mail}.`,
      summary: [
        { icon: "mac", t: "macOS 14 or later", b: "On Apple silicon or Intel." },
        { icon: "mail", t: "Email us", b: CONTACT },
      ],
      toc: "On this page",
      sections: [
        { id: "where", h2: "Where is EasyShoot after I open it?", html: "<p>It lives in the menu bar at the top of the screen, not in the Dock. If the notch hides the icon, use the shortcuts below. Opening EasyShoot again from Applications shows the Welcome window.</p>" },
        { id: "permission", h2: "It doesn’t take screenshots", html: "<p>EasyShoot needs <strong>Screen Recording</strong> permission. Open System Settings → Privacy &amp; Security → Screen &amp; System Audio Recording and turn on EasyShoot. macOS applies the change after a restart: choose <strong>Welcome &amp; Permissions…</strong> in the menu bar icon and click <strong>Restart</strong>.</p>" },
        { id: "shortcuts", h2: "Shortcuts", html: "<table><tbody><tr><th scope=\"row\">Capture Area</th><td><kbd dir=\"ltr\">⌥⇧⌘4</kbd></td></tr><tr><th scope=\"row\">Capture Window</th><td><kbd dir=\"ltr\">⌥⇧⌘5</kbd></td></tr><tr><th scope=\"row\">Capture Fullscreen</th><td><kbd dir=\"ltr\">⌥⇧⌘3</kbd></td></tr><tr><th scope=\"row\">Scrolling Capture</th><td><kbd dir=\"ltr\">⌥⇧⌘6</kbd></td></tr></tbody></table><p>Change them in Settings → Shortcuts.</p>" },
        { id: "saved", h2: "Where are my screenshots saved?", html: "<p>The first time you save without a dialog, EasyShoot asks which folder to use and remembers it. Change it any time in Settings → General → Save location. <strong>Save As…</strong> in the editor lets you pick a place each time.</p>" },
        { id: "uninstall", h2: "How do I uninstall it?", html: "<p>Choose <strong>Quit EasyShoot</strong> in the menu bar icon, then move EasyShoot from Applications to the Trash.</p>" },
        { id: "privacy", h2: "Privacy", html: "<p>EasyShoot collects no personal data and never uploads your screenshots. Read the <a href=\"/privacy.html\">privacy policy</a>.</p>" },
      ],
    },
  },
  ar: {
    privacy: {
      title: "سياسة الخصوصية | EasyShoot",
      description: "لا يجمع EasyShoot أي بيانات شخصية. لقطاتك تبقى على جهازك: بلا حساب ولا تحليلات ولا رفع.",
      h1: "سياسة الخصوصية",
      date: "سارية من 1 نوفمبر 2026",
      lead: "لا يجمع EasyShoot أي بيانات شخصية. لقطاتك تبقى على جهازك.",
      summary: [
        { icon: "user", t: "بلا حساب", b: "لا يوجد ما تسجّل فيه." },
        { icon: "cloud", t: "لا يُرفع شيء", b: "اللقطات لا تغادر جهازك أبدًا." },
        { icon: "eye", t: "بلا تتبّع", b: "لا تحليلات ولا إعلانات، في التطبيق ولا في هذا الموقع." },
        { icon: "font", t: "استثناء واحد", b: "الخطوط التي تنزّلها تأتي من Google Fonts." },
      ],
      toc: "في هذه الصفحة",
      sections: [
        { id: "collect", h2: "ما الذي يجمعه EasyShoot", html: "<p>لا شيء. لا حساب ولا تحليلات ولا إعلانات ولا تتبّع. ليست لدينا خوادم تستقبل بياناتك، ولا نبيع أي بيانات أو نشاركها مع أحد.</p>" },
        { id: "screenshots", h2: "لقطاتك", html: "<ul><li>تُعالَج اللقطات والتعديلات على جهازك ولا تُرفع إلى أي مكان.</li><li>تُحفظ فقط في المجلد الذي تختاره، ولا تُنسخ إلى الحافظة إلا عندما تطلب ذلك.</li><li>إعداداتك واختصاراتك وإعداداتك المحفوظة مخزّنة على جهازك في تفضيلات التطبيق.</li></ul>" },
        { id: "permissions", h2: "الأذونات", html: "<ul><li><strong>تسجيل الشاشة</strong>: يسمح لـ EasyShoot بالتقاط شاشتك، ويُستخدم فقط عندما تلتقط صورة.</li></ul>" },
        { id: "online", h2: "متى يتصل EasyShoot بالإنترنت", html: "<ul><li><strong>الخطوط.</strong> عندما تنزّل خطًا من المحرر، يجلبه EasyShoot من Google Fonts. ومثل أي طلب على الويب، يصل عنوان IP الخاص بك إلى Google؛ راجع <a href=\"https://policies.google.com/privacy?hl=ar\">سياسة خصوصية Google</a>. لا يُرسَل أي شيء عنك أو عن لقطاتك.</li></ul><p>لا يجري EasyShoot أي اتصالات أخرى بالشبكة.</p>" },
        { id: "website", h2: "هذا الموقع", html: "<ul><li>لا يستخدم الموقع ملفات تعريف الارتباط (الكوكيز) ولا تحليلات ولا إعلانات.</li><li>الموقع مستضاف على GitHub Pages، ومثل أي استضافة يصلها عنوان IP الخاص بك عند الزيارة؛ راجع <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement\">بيان خصوصية GitHub</a>.</li><li>يحمّل الموقع الخطوط من Google Fonts، فيصل عنوان IP الخاص بك إلى Google.</li><li>إن اخترت الوضع الفاتح أو الداكن، يُحفظ اختيارك في متصفحك فقط.</li></ul>" },
        { id: "children", h2: "الأطفال", html: "<p>لا يجمع EasyShoot بيانات من أي أحد، ومن ذلك الأطفال.</p>" },
        { id: "contact", h2: "التغييرات والتواصل", html: `<p>إذا تغيّرت هذه السياسة، ستُنشر النسخة الجديدة في هذه الصفحة بتاريخ جديد. للأسئلة: راسلنا على ${mail} أو زر <a href=\"/ar/support.html\">صفحة الدعم</a>.</p>` },
      ],
    },
    support: {
      title: "الدعم | EasyShoot",
      description: "مساعدة في EasyShoot للماك: أين تجده، وإذن تسجيل الشاشة، والاختصارات، وأين تُحفظ اللقطات، وطريقة حذفه.",
      h1: "الدعم",
      lead: `للأسئلة أو المشاكل أو الأفكار: راسلنا على ${mail}.`,
      summary: [
        { icon: "mac", t: "macOS 14 أو أحدث", b: "على معالجات Apple أو Intel." },
        { icon: "mail", t: "راسلنا", b: CONTACT },
      ],
      toc: "في هذه الصفحة",
      sections: [
        { id: "where", h2: "أين EasyShoot بعد أن أفتحه؟", html: "<p>يعيش في شريط القوائم أعلى الشاشة، وليس في الـ Dock. إذا أخفت الكاميرا العلوية الأيقونة، استخدم الاختصارات في الأسفل. وعندما تفتح EasyShoot من مجلد التطبيقات تظهر نافذة الترحيب.</p>" },
        { id: "permission", h2: "لا يلتقط صورًا للشاشة", html: "<p>يحتاج EasyShoot إلى <strong>إذن تسجيل الشاشة</strong>. افتح إعدادات النظام ← الخصوصية والأمان ← تسجيل الشاشة وصوت النظام، وفعّل EasyShoot. يطبّق macOS التغيير بعد إعادة التشغيل: اختر <strong>الترحيب والأذونات…</strong> من أيقونة شريط القوائم، ثم اضغط <strong>إعادة التشغيل</strong>.</p>" },
        { id: "shortcuts", h2: "الاختصارات", html: "<table><tbody><tr><th scope=\"row\">التقاط منطقة</th><td><kbd dir=\"ltr\">⌥⇧⌘4</kbd></td></tr><tr><th scope=\"row\">التقاط نافذة</th><td><kbd dir=\"ltr\">⌥⇧⌘5</kbd></td></tr><tr><th scope=\"row\">التقاط الشاشة كاملة</th><td><kbd dir=\"ltr\">⌥⇧⌘3</kbd></td></tr><tr><th scope=\"row\">التقاط مع التمرير</th><td><kbd dir=\"ltr\">⌥⇧⌘6</kbd></td></tr></tbody></table><p>غيّرها من الإعدادات ← الاختصارات.</p>" },
        { id: "saved", h2: "أين تُحفظ لقطاتي؟", html: "<p>أول مرة تحفظ فيها بدون نافذة حفظ، يسألك EasyShoot عن المجلد ويتذكّره. غيّره متى شئت من الإعدادات ← عام ← مكان الحفظ. وخيار <strong>حفظ باسم…</strong> في المحرر يتيح لك اختيار المكان في كل مرة.</p>" },
        { id: "uninstall", h2: "كيف أحذفه؟", html: "<p>اختر <strong>إنهاء EasyShoot</strong> من أيقونة شريط القوائم، ثم انقل EasyShoot من مجلد التطبيقات إلى سلة المهملات.</p>" },
        { id: "privacy", h2: "الخصوصية", html: "<p>لا يجمع EasyShoot أي بيانات شخصية ولا يرفع لقطاتك أبدًا. اقرأ <a href=\"/ar/privacy.html\">سياسة الخصوصية</a>.</p>" },
      ],
    },
  },
};
