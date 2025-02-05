import type { Schema, Attribute } from '@strapi/strapi';

export interface SheduleCardTimetable extends Schema.Component {
  collectionName: 'components_shedule_card_timetables';
  info: {
    displayName: 'Timetable';
  };
  attributes: {
    days: Attribute.String & Attribute.Required;
    time: Attribute.String & Attribute.Required;
    ticketsOfficeTime: Attribute.String;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
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
    sheduleCard: Attribute.Component<'hero.shedule-card'> & Attribute.Required;
  };
}

export interface HeroSheduleCard extends Schema.Component {
  collectionName: 'components_hero_shedule_cards';
  info: {
    displayName: 'SheduleCard';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    timetable: Attribute.Component<'shedule-card.timetable', true> &
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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'shedule-card.timetable': SheduleCardTimetable;
      'shared.seo': SharedSeo;
      'shared.meta-social': SharedMetaSocial;
      'shared.hero': SharedHero;
      'hero.shedule-card': HeroSheduleCard;
      'hero.info-card': HeroInfoCard;
    }
  }
}
