import { z } from "zod";

export const HeroBlockSchema = z.object({
  __component: z.literal("shared.hero"),
  title: z.string(),
  infoCard: z.object({
    title: z.string(),
    description: z.string(),
  }),
  scheduleCard: z.object({
    title: z.string(),
    timetable: z.array(
      z.object({
        days: z.string(),
        time: z.string(),
        ticketsOfficeTime: z.string(),
      })
    ),
  }),
  image: MediaSchema,
});

export const TextAndMediaBlockSchema = z.object({
  __component: z.literal("shared.text-and-media"),
  title: z.string(),
  description: z.string(),
  contentOrder: z.string(),
  viewFootsteps: z.boolean(),
});

export const ImageWithButtonGridBlockSchema = z.object({
  __component: z.literal("shared.image-with-button-grid"),
  title: z.string(),
  description: z.string(),
  button: z.object({
    link: z.string(),
    label: z.string()
  }),
});

export const HomeMapCardBlockSchema = z.object({
  __component: z.literal("home.map-card"),
  note: z.string(),
  title: z.string(),
  description: z.string(),
});

export const HomeTicketsBlockSchema = z.object({
  __component: z.literal("home.tickets"),
  title: z.string(),
  generalTickets: z.array(
    z.object({
      category: z.string(),
      description: z.string(),
      price: z.string(),
      frequency: z.string(),
      theme: z.string()
    })
  ),
  generalTicketsLink: z.string(),
  subsidizedTickets: z.object({
    title: z.string(),
    description: z.string(),
    ticketsList: z.array(
      z.object({
        category: z.string(),
        description: z.string(),
        price: z.string(),
        frequency: z.string(),
        theme: z.string()
      })
    ),
    link: z.string()
  })
});

export const SeoBlockSchema = z.object({
  metaTitle: z.string(),
  metaDescription: z.string(),
  keywords: z.string()
});

export const HomeServicesBlockSchema = z.object({
  __component: z.literal("home.services"),
  email: z.string().email(),
  phone: z.string(),
  cards: z.object({
    title: z.string(),
    cards: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        link: z.string().url(),
        labels: z.array(
          z.object({
            text: z.string()
          })
        )
      })
    )
  })
});

export const MediaSchema = z.object({
  url: z.string().url()
});

export const BlockSchema = z.discriminatedUnion("__component", [
  HeroBlockSchema,
  TextAndMediaBlockSchema,
  ImageWithButtonGridBlockSchema,
  HomeMapCardBlockSchema,
  HomeTicketsBlockSchema,
  HomeServicesBlockSchema
]);

export const HomePageSchema = z.object({
  data: z.object({
    blocks: z.array(BlockSchema),
    seo: SeoBlockSchema,
    url: MediaSchema
  })
});