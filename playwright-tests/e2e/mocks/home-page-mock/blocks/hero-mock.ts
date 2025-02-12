import { E2E_SMOKE_NAME_PREFIX } from "../../../consts";

export const SHARED_HERO_HOMEPAGE_DATA = {
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
}