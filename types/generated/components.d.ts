import type { Schema, Struct } from '@strapi/strapi';

export interface ButtonButton extends Struct.ComponentSchema {
  collectionName: 'components_button_buttons';
  info: {
    displayName: 'Button';
    icon: 'cube';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardCard extends Struct.ComponentSchema {
  collectionName: 'components_card_cards';
  info: {
    description: '';
    displayName: 'card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    labels: Schema.Attribute.Component<'card.label', true>;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardLabel extends Struct.ComponentSchema {
  collectionName: 'components_card_labels';
  info: {
    description: '';
    displayName: 'label';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeroInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_hero_info_cards';
  info: {
    description: '';
    displayName: 'InfoCard';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String;
  };
}

export interface HeroScheduleCard extends Struct.ComponentSchema {
  collectionName: 'components_hero_schedule_cards';
  info: {
    description: '';
    displayName: 'ScheduleCard';
  };
  attributes: {
    timetable: Schema.Attribute.Component<'schedule-card.timetable', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeMapCard extends Struct.ComponentSchema {
  collectionName: 'components_home_map_cards';
  info: {
    description: '';
    displayName: 'MapCard';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    note: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeServices extends Struct.ComponentSchema {
  collectionName: 'components_home_services';
  info: {
    displayName: 'Services';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.cards', false> &
      Schema.Attribute.Required;
    email: Schema.Attribute.Text & Schema.Attribute.Required;
    phone: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeTickets extends Struct.ComponentSchema {
  collectionName: 'components_home_tickets';
  info: {
    description: '';
    displayName: 'Tickets';
    icon: 'cube';
  };
  attributes: {
    generalTickets: Schema.Attribute.Component<'tickets.ticket', true> &
      Schema.Attribute.Required;
    generalTicketsLink: Schema.Attribute.String & Schema.Attribute.Required;
    subsidizedTickets: Schema.Attribute.Component<'tickets.tickets', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ScheduleCardTimetable extends Struct.ComponentSchema {
  collectionName: 'components_shedule_card_timetables';
  info: {
    description: '';
    displayName: 'Timetable';
  };
  attributes: {
    days: Schema.Attribute.String & Schema.Attribute.Required;
    ticketsOfficeTime: Schema.Attribute.String;
    time: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCards extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    description: '';
    displayName: 'Cards';
  };
  attributes: {
    cards: Schema.Attribute.Component<'card.card', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    infoCard: Schema.Attribute.Component<'hero.info-card', false> &
      Schema.Attribute.Required;
    scheduleCard: Schema.Attribute.Component<'hero.schedule-card', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedImageWithButtonGrid extends Struct.ComponentSchema {
  collectionName: 'components_shared_image_with_button_grids';
  info: {
    description: '';
    displayName: 'ImageWithButtonGrid';
    icon: 'cube';
  };
  attributes: {
    button: Schema.Attribute.Component<'button.button', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    largeImage: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    smallImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
        minLength: 50;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedTextAndMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_and_medias';
  info: {
    description: '';
    displayName: 'TextAndMedia';
    icon: 'cube';
  };
  attributes: {
    contentOrder: Schema.Attribute.Enumeration<
      [
        '\u0422\u0435\u043A\u0441\u0442 \u0441\u043B\u0435\u0432\u0430',
        '\u0422\u0435\u043A\u0441\u0442 \u0441\u043F\u0440\u0430\u0432\u0430',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u0422\u0435\u043A\u0441\u0442 \u0441\u043B\u0435\u0432\u0430'>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    media: Schema.Attribute.Media<'images' | 'videos'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
    viewFootsteps: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
  };
}

export interface SharedTickets extends Struct.ComponentSchema {
  collectionName: 'components_shared_tickets';
  info: {
    description: '';
    displayName: 'Tickets';
    icon: 'cube';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    note: Schema.Attribute.Text;
    subsidizedTickets: Schema.Attribute.Component<'tickets.ticket', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TicketsTicket extends Struct.ComponentSchema {
  collectionName: 'components_ticket_tickets';
  info: {
    description: '';
    displayName: 'Ticket';
    icon: 'cube';
  };
  attributes: {
    category: Schema.Attribute.Text & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    frequency: Schema.Attribute.String;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    theme: Schema.Attribute.Enumeration<
      [
        '\u0417\u0435\u043B\u0451\u043D\u044B\u0439',
        '\u041A\u043E\u0440\u0438\u0447\u043D\u0435\u0432\u044B\u0439',
      ]
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'\u0417\u0435\u043B\u0451\u043D\u044B\u0439'>;
  };
}

export interface TicketsTickets extends Struct.ComponentSchema {
  collectionName: 'components_tickets_tickets';
  info: {
    description: '';
    displayName: 'Tickets';
    icon: 'cube';
  };
  attributes: {
    description: Schema.Attribute.Text;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    ticketsList: Schema.Attribute.Component<'tickets.ticket', true> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'button.button': ButtonButton;
      'card.card': CardCard;
      'card.label': CardLabel;
      'hero.info-card': HeroInfoCard;
      'hero.schedule-card': HeroScheduleCard;
      'home.map-card': HomeMapCard;
      'home.services': HomeServices;
      'home.tickets': HomeTickets;
      'schedule-card.timetable': ScheduleCardTimetable;
      'shared.cards': SharedCards;
      'shared.hero': SharedHero;
      'shared.image-with-button-grid': SharedImageWithButtonGrid;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'shared.text-and-media': SharedTextAndMedia;
      'shared.tickets': SharedTickets;
      'tickets.ticket': TicketsTicket;
      'tickets.tickets': TicketsTickets;
    }
  }
}
