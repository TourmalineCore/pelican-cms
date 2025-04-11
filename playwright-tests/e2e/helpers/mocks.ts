import { E2E_SMOKE_NAME_PREFIX } from "./global-helpers";

export const MOCK_SEO = {
  metaTitle: "Челябинский зоопарк",
  metaDescription: "Описание челябинского зоопарка, приглашаем взрослых и детей, у нас много животных!",
  keywords: 'Ключевые слова'
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

export const MOCK_HOME_TICKETS = {
  __component: "home.tickets",
  generalTicketsTitle: `${E2E_SMOKE_NAME_PREFIX} Входные билеты`,
  generalTickets: [
    {
      category: `Взрослые, дети от 14 лет`,
      description: `Требуется подтверждающий документ.`,
      price: `400  ₽ / чел`,
      frequency: `1 раз в месяц`,
    },
  ],
  generalTicketsLink: `https://widget.afisha.yandex.ru/w/sessions/ticketsteam-803@37605507?clientKey=3bc42fbd-a832-49aa-a269-79188e18d9e1&regionId=56`,
  subsidizedTicketsTitle: `Льготные билеты`,
  subsidizedTicketsDescription: `Купить льготный билет можно только на кассе зоопарка.`,
  subsidizedTickets: [
    {
      category: `Многодетные семьи`,
      description: `Требуется подтверждающий документ.`,
      price: `Бесплатно`,
      frequency: `1 раз в месяц`,
    },
  ],
  subsidizedTicketsLink: `https://vk.com/topic-71671982_48253263`,
};

export const MOCK_TICKETS = {
  __component: "shared.tickets",
  title: `Билеты`,
  description: `Купить билет можно только на\u00A0кассе контактного зоопарка.`,
  tickets: [
    {
      category: `Многодетные семьи`,
      description: `Требуется подтверждающий документ.`,
      price: `Бесплатно`,
      frequency: `1 раз в месяц`,
    },
  ],
  link: `https://widget.afisha.yandex.ru/w/sessions/ticketsteam-803@37605507?clientKey=3bc42fbd-a832-49aa-a269-79188e18d9e1&regionId=56`,
  note: `Билет контактного зоопарка приобретается дополнительно ко\u00A0входному билету зоопарка`,
};

export const MOCK_TICKETS_POPUP = {
  generalTicketsLink: `https://widget.afisha.yandex.ru/w/sessions/ticketsteam-803@37605507?clientKey=3bc42fbd-a832-49aa-a269-79188e18d9e1&regionId=56`,
  generalTickets: [
    {
      id: 0,
      category: `Взрослые,\nдети от 14 лет`,
      price: `400  ₽ / чел`,
    },
  ],
  subsidizedTicket: {
    category: `Льготный`,
    description: `Требуется подтверждающий льготу оригинал документа, покупка только на кассе`,
    categories: [
      {
        id: 0,
        category: `Студенты`,
        price: `200  ₽ / чел`,
      },
    ],
    button: {
      label: `Остальные льготные категории`,
    },
  },
  visitingRulesAccordion: {
    images: [
      {
        url: `./playwright-tests/e2e/fixtures/[E2E-SMOKE]-tiger.png`,
        alternativeText: `Нельзя кормить животных`,
      },
    ],
    button: {
      label: `Подробнее о правилах посещения`,
      link: `http://chelzoo.ru/media/articles/2022/05/06/prikaz-221-ot-050522-o-pravilah-posescheniya-2.pdf`,
    },
  },
  ticketRefundAccordion: {
    refundHead: `Возврат билета осуществляется в следующих случаях:`,
    refundBody: [
      {
        id: 0,
        refundReason: `отмены, замены либо переноса оказания услуги по инициативе Зоопарка;`,
      },
    ],
    button: {
      label: `Подробнее о возврате билетов`,
      link: `http://chelzoo.ru/articles/prikaz-ob-utverzhdenii-pravil-prodazhi-i-vozvrata-/`,
    },
  },
  buyTicketsButton: {
    label: `Купить билет`,
    link: `https://widget.afisha.yandex.ru/w/sessions/ticketsteam-803@37605507?clientKey=3bc42fbd-a832-49aa-a269-79188e18d9e1&regionId=56`,
  },
  note: `Покупая билет, вы соглашаетесь с правилами посещения`,
};
