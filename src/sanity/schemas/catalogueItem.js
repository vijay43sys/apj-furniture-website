export default {
  name: 'catalogueItem',
  title: 'Catalogue Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Item Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'itemCode',
      title: 'Item Code / SKU',
      type: 'string',
      placeholder: 'e.g. APJ-LIV-004',
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
      name: 'image',
      title: 'Catalogue Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price / Starting Price (₹)',
      type: 'number',
    },
    {
      name: 'dimensions',
      title: 'Standard Dimensions',
      type: 'string',
    },
    {
      name: 'specifications',
      title: 'Key Specifications',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'brochurePdf',
      title: 'Brochure PDF (Optional)',
      type: 'file',
    },
    {
      name: 'inStock',
      title: 'In Stock / Available to Order',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'itemCode',
      media: 'image',
    },
  },
};
