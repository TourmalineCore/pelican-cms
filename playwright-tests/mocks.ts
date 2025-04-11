import { E2E_SMOKE_NAME_PREFIX } from "./helpers/global-helpers";

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
};

export const MOCK_TEXT_AND_MEDIA = {
  __component: "shared.text-and-media",
  title: `${E2E_SMOKE_NAME_PREFIX} В зоопарке 141 вид животных`,
  description: `Снежные барсы, ленивцы, росомахи, гепард и другие редкие животные, которые вас удивят.`,
  contentOrder: `Текст слева`,
  viewFootsteps: false,
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
};

export const MOCK_HOME_MAP_CARD = {
  __component: "home.map-card",
  note: "Единственный государственный зоопарк на Южном Урале",
  title: `${E2E_SMOKE_NAME_PREFIX} Челябинск, ул. Труда 191`,
  description: `Мы находимся в центре Челябинска (остановка «Зоопарк»), до нас легко добраться как на транспорте, так и пешком.`,
};

export const MOCK_IMAGE_WITH_BUTTON_GRID = {
  __component: "shared.image-with-button-grid",
  title: `${E2E_SMOKE_NAME_PREFIX} Один из первых и самых больших контактных зоопарков`,
  description: `В этой части зоопарка вы почувствуете себя вдали от городской суеты в компании кур, гусей, коз и многих других животных. `,
  button: {
    link: `#`,
    label: `Подробнее`
  },
};

export const MOCK_HOME_TICKETS = {
  __component: "home.tickets",
  title: `${E2E_SMOKE_NAME_PREFIX} Входные билеты`,
  generalTickets: [
    {
      category: `Взрослые, дети от 14 лет`,
      description: `Требуется подтверждающий документ.`,
      price: `400  ₽ / чел`,
      frequency: `1 раз в месяц`,
      theme: "Зелёный"
    }
  ],
  generalTicketsLink: "#",
  subsidizedTickets: {
    title: `Льготные билеты`,
    description: `Купить льготный билет можно только на кассе зоопарка.`,
    ticketsList: [
      {
        category: `Многодетные семьи`,
        description: `Требуется подтверждающий документ.`,
        price: `Бесплатно`,
        frequency: `1 раз в месяц`,
        theme: "Зелёный"
      }
    ],
    link: "#"
  }
}

export const MOCK_TICKETS = {
  __component: "shared.tickets",
  title: `Билеты`,
  description: `Купить билет можно только на\u00A0кассе контактного зоопарка.`,
  subsidizedTickets: [
    {
      category: `Многодетные семьи`,
      description: `Требуется подтверждающий документ.`,
      price: `Бесплатно`,
      frequency: `1 раз в месяц`,
    },
  ],
  link: `#`,
  note: `Билет контактного зоопарка приобретается дополнительно ко\u00A0входному билету зоопарка`,
};

export const MOCK_TICKETS_POPUP = {
  ticketsPopup: {
    generalTicketsLink: "#",
    generalTickets: [
      {
        category: `Взрослые,\nдети от 14 лет`,
        price: `400  ₽ / чел`,
        description: `Требуется подтверждающий документ.`
      }
    ],
    subsidizedTicket: {
      category: `Льготный`,
      description: `Требуется подтверждающий льготу оригинал документа, покупка только на кассе`,
      categories: [
        {
          category: `Студенты`,
          price: `200  ₽ / чел`,
        },
      ],
      button: {
        label: `Остальные льготные категории`,
        link: `#`,
      },
    },
    buyTicketsButton: {
      label: `Купить билет`,
      link: `#`,
    },
    note: `Покупая билет, вы соглашаетесь с правилами посещения`,
    visitingRulesAccordion: {
      button: {
        label: `Подробнее о правилах посещения`,
        link: `#`,
      },
    },
    ticketRefundAccordion: {
      refundHead: `Возврат билета осуществляется в следующих случаях:`,
      refundBody: [
        {
          refundReason: `отмены, замены либо переноса оказания услуги по инициативе Зоопарка;`,
        },
      ],
      button: {
        label: `Подробнее о возврате билетов`,
        link: `#`,
      },
    },
  },
}
