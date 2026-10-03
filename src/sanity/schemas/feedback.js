export default {
  name: 'feedback',
  title: 'Customer Feedback',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location / City',
      type: 'string',
      placeholder: 'e.g. Chennai, Coimbatore, Madurai',
    },
    {
      name: 'rating',
      title: 'Rating (1 - 5 Stars)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    },
    {
      name: 'comment',
      title: 'Customer Review / Comment',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'clientAvatar',
      title: 'Customer Photo / Avatar',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'projectType',
      title: 'Service Used / Product Purchased',
      type: 'string',
      placeholder: 'e.g. Living Room Interior, Custom Sofa Set',
    },
    {
      name: 'date',
      title: 'Review Date',
      type: 'date',
    },
    {
      name: 'isFeatured',
      title: 'Display on Testimonial Showcase',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'location',
      rating: 'rating',
      media: 'clientAvatar',
    },
    prepare({ title, subtitle, rating, media }) {
      return {
        title,
        subtitle: `${subtitle || 'Tamil Nadu'} • ${'★'.repeat(rating || 5)}`,
        media,
      };
    },
  },
};
