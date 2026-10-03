export default {
  name: 'seoSettings',
  title: 'SEO & Meta Settings',
  type: 'document',
  fields: [
    {
      name: 'metaTitle',
      title: 'Default Meta Title',
      type: 'string',
      initialValue: 'APJ Furniture & Interior | Modern Furniture & Luxury Interiors in Chennai',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'metaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 3,
      initialValue: 'Crafting beautiful, functional spaces since 2010. Explore custom living room, bedroom, dining, and turnkey interior design solutions in Chennai.',
    },
    {
      name: 'ogImage',
      title: 'Open Graph / Social Sharing Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'keywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: {
      title: 'metaTitle',
      subtitle: 'metaDescription',
    },
  },
};
