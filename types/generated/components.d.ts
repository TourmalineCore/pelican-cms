import type { Schema, Struct } from '@strapi/strapi';

export interface ButtonButton extends Struct.ComponentSchema {
  collectionName: 'components_button_buttons';
  info: {
    description: '';
    displayName: '\u041A\u043D\u043E\u043F\u043A\u0430 c \u0441\u0441\u044B\u043B\u043A\u043E\u0439';
    icon: 'cube';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ButtonButtonWithText extends Struct.ComponentSchema {
  collectionName: 'components_button_button_with_texts';
  info: {
    description: '';
    displayName: '\u041A\u043D\u043E\u043F\u043A\u0430';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardCard extends Struct.ComponentSchema {
  collectionName: 'components_card_cards';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430';
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
    displayName: '\u041C\u0435\u0442\u043A\u0430';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DiscountsBasis extends Struct.ComponentSchema {
  collectionName: 'components_discounts_bases';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043B\u044C\u0433\u043E\u0442\u044B"';
    icon: 'dashboard';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'>;
    link: Schema.Attribute.Text;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface DiscountsCategories extends Struct.ComponentSchema {
  collectionName: 'components_discounts_categories';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u043C\u0438 \u043B\u044C\u0433\u043E\u0442\u043D\u044B\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439';
    icon: 'dashboard';
  };
  attributes: {
    discountsCards: Schema.Attribute.Component<
      'discounts.discounts-card',
      true
    > &
      Schema.Attribute.Required;
    remark: Schema.Attribute.Component<'discounts.basis', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DiscountsDiscountsCard extends Struct.ComponentSchema {
  collectionName: 'components_discounts_discounts_cards';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043B\u044C\u0433\u043E\u0442\u043D\u043E\u0439 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438';
    icon: 'dashboard';
  };
  attributes: {
    note: Schema.Attribute.Text;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    rules: Schema.Attribute.Component<'discounts.rules', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DiscountsRules extends Struct.ComponentSchema {
  collectionName: 'components_discounts_rules';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u043B\u044C\u0433\u043E\u0442\u044B';
    icon: 'dashboard';
  };
  attributes: {
    basis: Schema.Attribute.Component<'discounts.basis', true>;
    docs: Schema.Attribute.Component<'discounts.text', true>;
    info: Schema.Attribute.Text;
    terms: Schema.Attribute.Component<'discounts.text', true>;
  };
}

export interface DiscountsTerms extends Struct.ComponentSchema {
  collectionName: 'components_discounts_terms';
  info: {
    description: '';
    displayName: '\u041F\u0435\u0440\u0432\u044B\u0439 \u0431\u043B\u043E\u043A \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043B\u044C\u0433\u043E\u0442\u043D\u044B\u0445 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439';
    icon: 'dashboard';
  };
  attributes: {
    rulesCards: Schema.Attribute.Component<'discounts.text', true> &
      Schema.Attribute.Required;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DiscountsText extends Struct.ComponentSchema {
  collectionName: 'components_discounts_texts';
  info: {
    description: '';
    displayName: '\u041F\u043E\u043B\u0435 \u0442\u0435\u043A\u0441\u0442\u0430';
    icon: 'dashboard';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HeroInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_hero_info_cards';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0435\u0439';
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
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435\u043C';
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
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043A\u0430\u0440\u0442\u043E\u0439';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'withoutImagesPreset';
        }
      >;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    note: Schema.Attribute.RichText &
      Schema.Attribute.Required &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'withoutImagesPreset';
        }
      >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeServices extends Struct.ComponentSchema {
  collectionName: 'components_home_services';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438';
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
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0431\u0438\u043B\u0435\u0442\u0430\u043C\u0438';
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
    displayName: '\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435';
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
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u043C\u0438';
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
    displayName: '\u041F\u0435\u0440\u0432\u044B\u0439 \u0431\u043B\u043E\u043A';
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
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u043E\u0439 \u0438 \u043A\u043D\u043E\u043F\u043A\u043E\u0439';
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
    displayName: '\u0411\u043B\u043E\u043A SEO';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 1000;
      }>;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SharedTextAndMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_and_medias';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u043E\u0439/\u0432\u0438\u0434\u0435\u043E';
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
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0431\u0438\u043B\u0435\u0442\u0430\u043C\u0438';
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

export interface TicketsPopupAccordionTicket extends Struct.ComponentSchema {
  collectionName: 'components_tickets_popup_accordion_tickets';
  info: {
    description: '';
    displayName: '\u0411\u0438\u043B\u0435\u0442 \u0441 \u0430\u043A\u043A\u043E\u0440\u0434\u0435\u043E\u043D\u043E\u043C';
    icon: 'dashboard';
  };
  attributes: {
    button: Schema.Attribute.Component<'button.button-with-text', false> &
      Schema.Attribute.Required;
    categories: Schema.Attribute.Component<'tickets-popup.category', true> &
      Schema.Attribute.Required;
    category: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TicketsPopupCategory extends Struct.ComponentSchema {
  collectionName: 'components_tickets_popup_categories';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F';
    icon: 'dashboard';
  };
  attributes: {
    category: Schema.Attribute.Text & Schema.Attribute.Required;
    price: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TicketsPopupRefundListItem extends Struct.ComponentSchema {
  collectionName: 'components_tickets_popup_refund_list_items';
  info: {
    description: '';
    displayName: '\u041F\u0440\u0430\u0432\u0438\u043B\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0442\u0430 \u0431\u0438\u043B\u0435\u0442\u043E\u0432';
    icon: 'dashboard';
  };
  attributes: {
    refundReason: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TicketsPopupShortenedTicket extends Struct.ComponentSchema {
  collectionName: 'components_tickets_popup_shortened_tickets';
  info: {
    description: '';
    displayName: '\u0421\u043E\u043A\u0440\u0430\u0449\u0451\u043D\u043D\u044B\u0439 \u0431\u0438\u043B\u0435\u0442';
    icon: 'dashboard';
  };
  attributes: {
    category: Schema.Attribute.Text & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    price: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TicketsPopupTicketRefundAccordion
  extends Struct.ComponentSchema {
  collectionName: 'components_tickets_popup_ticket_refund_accordions';
  info: {
    description: '';
    displayName: '\u0410\u043A\u043A\u043E\u0440\u0434\u0435\u043E\u043D "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u0431\u0438\u043B\u0435\u0442\u043E\u0432"';
    icon: 'dashboard';
  };
  attributes: {
    button: Schema.Attribute.Component<'button.button', false> &
      Schema.Attribute.Required;
    refundBody: Schema.Attribute.Component<
      'tickets-popup.refund-list-item',
      true
    > &
      Schema.Attribute.Required;
    refundHead: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TicketsPopupTicketsPopup extends Struct.ComponentSchema {
  collectionName: 'components_tickets_popup_tickets_popups';
  info: {
    description: '';
    displayName: '\u0412\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0435\u0435 \u043E\u043A\u043D\u043E \u043F\u043E\u043A\u0443\u043F\u043A\u0438 \u0431\u0438\u043B\u0435\u0442\u043E\u0432';
    icon: 'dashboard';
  };
  attributes: {
    buyTicketsButton: Schema.Attribute.Component<'button.button', false> &
      Schema.Attribute.Required;
    generalTickets: Schema.Attribute.Component<
      'tickets-popup.shortened-ticket',
      true
    > &
      Schema.Attribute.Required;
    generalTicketsLink: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.String & Schema.Attribute.Required;
    subsidizedTicket: Schema.Attribute.Component<
      'tickets-popup.accordion-ticket',
      false
    > &
      Schema.Attribute.Required;
    ticketRefundAccordion: Schema.Attribute.Component<
      'tickets-popup.ticket-refund-accordion',
      false
    > &
      Schema.Attribute.Required;
    visitingRulesAccordion: Schema.Attribute.Component<
      'tickets-popup.visiting-rules-accordion',
      false
    > &
      Schema.Attribute.Required;
  };
}

export interface TicketsPopupVisitingRulesAccordion
  extends Struct.ComponentSchema {
  collectionName: 'components_tickets_popup_visiting_rules_accordions';
  info: {
    description: '';
    displayName: '\u0410\u043A\u043A\u043E\u0440\u0434\u0435\u043E\u043D "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F"';
    icon: 'dashboard';
  };
  attributes: {
    button: Schema.Attribute.Component<'button.button', false> &
      Schema.Attribute.Required;
    images: Schema.Attribute.Media<'images', true> & Schema.Attribute.Required;
  };
}

export interface TicketsTicket extends Struct.ComponentSchema {
  collectionName: 'components_ticket_tickets';
  info: {
    description: '';
    displayName: '\u0411\u0438\u043B\u0435\u0442';
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
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0431\u0438\u043B\u0435\u0442\u0430\u043C\u0438';
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

export interface VisitingRulesDocumentLink extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_document_links';
  info: {
    description: '';
    displayName: '\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442';
    icon: 'file';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'> & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitingRulesEmergencyPhones extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_emergency_phones';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430\u043C\u0438 \u044D\u043A\u0441\u0442\u0440\u0435\u043D\u043D\u044B\u0445 \u0441\u043B\u0443\u0436\u0431';
    icon: 'file';
  };
  attributes: {
    emergencyPhonesCards: Schema.Attribute.Component<
      'visiting-rules.emergency-phones-card',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitingRulesEmergencyPhonesCard
  extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_emergency_phones_cards';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043E\u043C \u044D\u043A\u0441\u0442\u0440\u0435\u043D\u043D\u043E\u0439 \u0441\u043B\u0443\u0436\u0431\u044B';
    icon: 'file';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitingRulesMainRules extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_main_rules';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C\u0438 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F';
    icon: 'file';
  };
  attributes: {
    mainRulesCards: Schema.Attribute.Component<
      'visiting-rules.main-rules-card',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface VisitingRulesMainRulesCard extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_main_rules_cards';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043F\u0440\u0430\u0432\u0438\u043B \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F';
    icon: 'file';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    label: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface VisitingRulesPhotosPolicy extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_photos_policies';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430\u043C\u0438';
    icon: 'file';
  };
  attributes: {
    photosPolicyCards: Schema.Attribute.Component<
      'visiting-rules.text-card',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface VisitingRulesTextCard extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_text_cards';
  info: {
    description: '';
    displayName: '\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C';
    icon: 'file';
  };
  attributes: {
    label: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface VisitingRulesVisitingRulesMain extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_visiting_rules_mains';
  info: {
    description: '';
    displayName: '\u041F\u0435\u0440\u0432\u044B\u0439 \u0431\u043B\u043E\u043A \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043F\u0440\u0430\u0432\u0438\u043B \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F';
    icon: 'file';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    documentLink: Schema.Attribute.Component<
      'visiting-rules.document-link',
      false
    > &
      Schema.Attribute.Required;
    mainRules: Schema.Attribute.Component<'visiting-rules.main-rules', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface VisitingRulesWarnings extends Struct.ComponentSchema {
  collectionName: 'components_visiting_rules_warnings';
  info: {
    description: '';
    displayName: '\u0411\u043B\u043E\u043A \u0441 \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0436\u0434\u0435\u043D\u0438\u044F\u043C\u0438';
    icon: 'file';
  };
  attributes: {
    warningsCards: Schema.Attribute.Component<
      'visiting-rules.text-card',
      true
    > &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'button.button': ButtonButton;
      'button.button-with-text': ButtonButtonWithText;
      'card.card': CardCard;
      'card.label': CardLabel;
      'discounts.basis': DiscountsBasis;
      'discounts.categories': DiscountsCategories;
      'discounts.discounts-card': DiscountsDiscountsCard;
      'discounts.rules': DiscountsRules;
      'discounts.terms': DiscountsTerms;
      'discounts.text': DiscountsText;
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
      'tickets-popup.accordion-ticket': TicketsPopupAccordionTicket;
      'tickets-popup.category': TicketsPopupCategory;
      'tickets-popup.refund-list-item': TicketsPopupRefundListItem;
      'tickets-popup.shortened-ticket': TicketsPopupShortenedTicket;
      'tickets-popup.ticket-refund-accordion': TicketsPopupTicketRefundAccordion;
      'tickets-popup.tickets-popup': TicketsPopupTicketsPopup;
      'tickets-popup.visiting-rules-accordion': TicketsPopupVisitingRulesAccordion;
      'tickets.ticket': TicketsTicket;
      'tickets.tickets': TicketsTickets;
      'visiting-rules.document-link': VisitingRulesDocumentLink;
      'visiting-rules.emergency-phones': VisitingRulesEmergencyPhones;
      'visiting-rules.emergency-phones-card': VisitingRulesEmergencyPhonesCard;
      'visiting-rules.main-rules': VisitingRulesMainRules;
      'visiting-rules.main-rules-card': VisitingRulesMainRulesCard;
      'visiting-rules.photos-policy': VisitingRulesPhotosPolicy;
      'visiting-rules.text-card': VisitingRulesTextCard;
      'visiting-rules.visiting-rules-main': VisitingRulesVisitingRulesMain;
      'visiting-rules.warnings': VisitingRulesWarnings;
    }
  }
}
