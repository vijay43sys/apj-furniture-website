export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (₹)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: 'originalPrice',
      title: 'Original / Strike-through Price (₹)',
      type: 'number',
      description: 'Optional higher price for displaying discounts',
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error('At least one image is required'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      placeholder: 'e.g. 84" L x 36" D x 34" H',
    },
    {
      name: 'material',
      title: 'Materials & Finish',
      type: 'string',
      placeholder: 'e.g. Solid Teak Wood, Premium High-Density Foam, Velvet Fabric',
    },
    {
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'badge',
      title: 'Promotional Badge',
      type: 'string',
      options: {
        list: [
          { title: 'None', value: '' },
          { title: 'Best Seller', value: 'Best Seller' },
          { title: 'New Arrival', value: 'New Arrival' },
          { title: 'Popular', value: 'Popular' },
          { title: 'Custom Made', value: 'Custom Made' },
        ],
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category.title',
      price: 'price',
      media: 'images.0',
    },
    prepare({ title, subtitle, price, media }) {
      return {
        title,
        subtitle: `${subtitle || 'Uncategorized'} • ₹${price ? Number(price).toLocaleString('en-IN') : 'N/A'}`,
        media,
      };
    },
  },
};
