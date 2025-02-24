import { E2E_SMOKE_NAME_PREFIX } from "./global-helpers";

export const MOCK_SEO = {
  metaTitle: "Челябинский зоопарк",
  metaDescription: "Описание челябинского зоопарка, приглашаем взрослых и детей, у нас много животных!",
}

export const MOCK_HERO = {
  __component: "shared.hero",
  title: `${E2E_SMOKE_NAME_PREFIX} Челябинский зоопарк`,
  infoCard: {
    title: '29 октября зоопарк не работает',
    description: 'Каждый последний понедельник месяца санитарный день.'
  },
  scheduleCard: {
    title: 'График работы',
    timetable: [{
      days: 'Понедельник - четверг',
      time: '10:00-18:00',
      ticketsOfficeTime: '(вход и касса 10:00-17:00)'
    }]
  },
  filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`
};

export const MOCK_TEXT_AND_MEDIA = {
  __component: "shared.text-and-media",
  title: `${E2E_SMOKE_NAME_PREFIX} В зоопарке 141 вид животных`,
  description: `Снежные барсы, ленивцы, росомахи, гепард и другие редкие животные, которые вас удивят.`,
  contentOrder: `Текст слева`,
  viewFootsteps: false,
  filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-text-and-media-video.mp4`
};

export const MOCK_HOME_SERVICES = {
  __component: "home.services",
  email: `${E2E_SMOKE_NAME_PREFIX} test@test.ru`,
  phone: '+9 (999) 999-99-99',
  cards: {
    title: "Наши услуги",
    cards: [
      {
        title: "Услуга 1",
        description: "Описание услуги 1",
        link: 'ссылка',
        labels: [
          {
            text: "от 5 человек"
          }
        ]
      }
    ]
  },
  filePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`
};

export const MOCK_HOME_MAP_CARD = {
  __component: "home.map-card",
  note: "Единственный государственный зоопарк на Южном Урале",
  title: `${E2E_SMOKE_NAME_PREFIX} Челябинск, ул. Труда 191`,
  description: `Мы находимся в центре Челябинска (остановка «Зоопарк»), до нас легко добраться как на транспорте, так и пешком.`,
  imagePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`,
};

export const MOCK_IMAGE_WITH_BUTTON_GRID = {
  __component: "shared.image-with-button-grid",
  title: `${E2E_SMOKE_NAME_PREFIX} Один из первых и самых больших контактных зоопарков`,
  description: `В этой части зоопарка вы почувствуете себя вдали от городской суеты в компании кур, гусей, коз и многих других животных. `,
  link: `#`,
  label: `Подробнее`,
  largeImagePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`,
  smallImagePath: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`,
};