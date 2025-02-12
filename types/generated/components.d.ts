import type { Schema, Attribute } from '@strapi/strapi';

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media<'images' | 'files' | 'videos'>;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedHero extends Schema.Component {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images'> & Attribute.Required;
    infoCard: Attribute.Component<'hero.info-card'> & Attribute.Required;
    scheduleCard: Attribute.Component<'hero.schedule-card'> &
      Attribute.Required;
  };
}

export interface SharedCards extends Schema.Component {
  collectionName: 'components_shared_cards';
  info: {
    displayName: 'Cards';
    description: '';
  };
  attributes: {
    cards: Attribute.Component<'card.card', true>;
  };
}

export interface ScheduleCardTimetable extends Schema.Component {
  collectionName: 'components_shedule_card_timetables';
  info: {
    displayName: 'Timetable';
    description: '';
  };
  attributes: {
    days: Attribute.String & Attribute.Required;
    time: Attribute.String & Attribute.Required;
    ticketsOfficeTime: Attribute.String;
  };
}

export interface HeroScheduleCard extends Schema.Component {
  collectionName: 'components_hero_schedule_cards';
  info: {
    displayName: 'ScheduleCard';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    timetable: Attribute.Component<'schedule-card.timetable', true> &
      Attribute.Required;
  };
}

export interface HeroInfoCard extends Schema.Component {
  collectionName: 'components_hero_info_cards';
  info: {
    displayName: 'InfoCard';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface CardLabel extends Schema.Component {
  collectionName: 'components_card_labels';
  info: {
    displayName: 'label';
    description: '';
  };
  attributes: {
    text: Attribute.String & Attribute.Required;
  };
}

export interface CardCard extends Schema.Component {
  collectionName: 'components_card_cards';
  info: {
    displayName: 'card';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    image: Attribute.Media<'images'> & Attribute.Required;
    labels: Attribute.Component<'card.label', true>;
    link: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shared.seo': SharedSeo;
      'shared.meta-social': SharedMetaSocial;
      'shared.hero': SharedHero;
      'shared.cards': SharedCards;
      'schedule-card.timetable': ScheduleCardTimetable;
      'hero.schedule-card': HeroScheduleCard;
      'hero.info-card': HeroInfoCard;
      'card.label': CardLabel;
      'card.card': CardCard;
    }
  }
}
