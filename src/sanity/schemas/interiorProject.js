export default {
  name: 'interiorProject',
  title: 'Interior Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
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
      name: 'projectType',
      title: 'Project Type / Room',
      type: 'string',
      options: {
        list: [
          { title: 'Living Room', value: 'Living Room' },
          { title: 'Bedroom', value: 'Bedroom' },
          { title: 'Modular Kitchen', value: 'Modular Kitchen' },
          { title: 'Dining Room', value: 'Dining Room' },
          { title: 'Commercial & Office', value: 'Commercial & Office' },
          { title: 'Complete Villa / Residence', value: 'Complete Villa / Residence' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'clientLocation',
      title: 'Client / Location',
      type: 'string',
      placeholder: 'e.g. Anna Nagar, Chennai',
    },
    {
      name: 'year',
      title: 'Completion Year',
      type: 'string',
      initialValue: '2024',
    },
    {
      name: 'mainImage',
      title: 'Hero / Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Project Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'description',
      title: 'Project Narrative / Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'scopeOfWork',
      title: 'Scope of Work',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. False Ceiling, Custom Woodwork, Ambient Lighting, Wall Panelling',
    },
    {
      name: 'isFeatured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'projectType',
      media: 'mainImage',
    },
  },
};
