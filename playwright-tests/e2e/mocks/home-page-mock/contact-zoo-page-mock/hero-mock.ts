import { E2E_SMOKE_NAME_PREFIX } from "../../../consts";

export const SHARED_HERO_CONTACT_ZOO_DATA = {
  title: `${E2E_SMOKE_NAME_PREFIX} Контактный зоопарк`,
  infoCard: {
    title: 'Погодные условия',
    description: 'При дожде, снегопаде, граде, метели детский контактный зоопарк временно закрывается для безопасности животных',
  },
  scheduleCard: {
    title: 'График работы',
    timetable: [{
      days: 'Понедельник - четверг',
      time: 'Выходной',
      ticketsOfficeTime: '(вход и касса 10:00-17:00)'
    }],
  },
}