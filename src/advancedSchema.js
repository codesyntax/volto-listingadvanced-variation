import messages from './messages';

export const advancedSchema = (props) => {
  const {intl, schema, formData} = props;
  // const imageWidth = ['right', 'left'].includes(formData.imageSide)
  //   ? ['imageWidth']
  //   : [];
  const headingChoices = [
    ['h2', 'H2'],
    ['h3', 'H3'],
    ['h4', 'H4'],
  ];
  return {
    ...schema,
    fieldsets: [
      ...schema.fieldsets,
      // {
      //   id: 'default',
      //   title: 'Default',
      //   fields: ['variation', 'headline', 'headlineTag'],
      // },
      // {
      //   id: 'querystring',
      //   title: intl.formatMessage(messages.querystring),
      //   fields: ['querystring'],
      // },
      {
        id: 'display',
        title: intl.formatMessage(messages.itemDisplayOptions),
        fields: ['howManyColumns', 'imageSide', 'imageWidth', 'titleTag', 'showDescription', 'effectiveDate', 'eventDate', 'eventTime', 'eventLocation'],
      },
      {
        id: 'moreLink',
        title: intl.formatMessage(messages.moreLinkConfiguration),
        fields: ['moreLinkText', 'moreLinkUrl'],
      },
    ],
    properties: {
      ...schema.properties,
      howManyColumns: {
        title: intl.formatMessage(messages.columnsCount),
        choices: [
          [1, '1'],
          [2, '2'],
          [3, '3'],
          [4, '4'],
        ],
      },
      imageWidth: {
        title: intl.formatMessage(messages.imageWidth),
        description: intl.formatMessage(messages.imageWidthDescription),
        choices: [
          [2, '2/12'],
          [3, '3/12'],
          [4, '4/12'],
          [5, '5/12'],
          [6, '6/12'],
        ],
      },
      imageSide: {
        title: intl.formatMessage(messages.imagePosition),
        choices: [
          [null, 'No image'],
          ['up', 'up'],
          ['left', 'left'],
          ['right', 'right'],
          ['down', 'down'],
        ],
      },
      titleTag: {
        title: intl.formatMessage(messages.titleTag),
        choices: headingChoices,
      },
      showDescription: {
        title: intl.formatMessage(messages.descriptionTitle),
        type: 'boolean',
        default: true,
      },
      effectiveDate: {
        title: intl.formatMessage(messages.date),
        type: 'boolean',
      },
      eventDate: {
        title: intl.formatMessage(messages.eventDate),
        type: 'boolean',
      },
      eventTime: {
        title: intl.formatMessage(messages.eventTime),
        type: 'boolean',
      },
      eventLocation: {
        title: intl.formatMessage(messages.eventLocation),
        type: 'boolean',
      },
      moreLinkText: {
        title: intl.formatMessage(messages.moreLinkText),
        description: intl.formatMessage(messages.moreLinkTextDescription),
      },
      moreLinkUrl: {
        title: intl.formatMessage(messages.moreLinkUrl),
        description: intl.formatMessage(messages.moreLinkUrlDescription),
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
    },
  };
};
