import messages from './messages';

export const advancedSchema = (props) => {
  const { intl, schema, formData } = props;
  const imageWidth = ['right', 'left'].includes(formData.imageSide)
    ? ['imageWidth']
    : [];
  const headingChoices = [
    ['h2', 'H2'],
    ['h3', 'H3'],
    ['h4', 'H4'],
  ];
  return {
    ...schema,
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['variation'],
      },
      {
        id: 'querystring',
        title: intl.formatMessage(messages.querystring),
        fields: ['querystring'],
      },
      {
        id: 'header',
        title: intl.formatMessage(messages.headerConfiguration),
        fields: ['header', 'headerUrl', 'headerTag'],
      },
      {
        id: 'columns',
        title: intl.formatMessage(messages.columnsConfiguration),
        fields: ['howManyColumns'],
      },
      {
        id: 'image',
        title: intl.formatMessage(messages.imageConfiguration),
        fields: ['imageSide', ...imageWidth],
      },
      {
        id: 'title',
        title: intl.formatMessage(messages.titleConfiguration),
        fields: ['titleTag'],
      },
      {
        id: 'description',
        title: intl.formatMessage(messages.descriptionConfiguration),
        fields: ['showDescription'],
      },
      {
        id: 'date',
        title: intl.formatMessage(messages.dateConfiguration),
        fields: ['effectiveDate'],
      },
      {
        id: 'moreLink',
        title: intl.formatMessage(messages.moreLinkConfiguration),
        fields: ['moreLinkText', 'moreLinkUrl'],
      },
    ],
    properties: {
      ...schema.properties,
      header: {
        title: intl.formatMessage(messages.header),
        description: intl.formatMessage(messages.headerDescription),
      },
      headerUrl: {
        title: intl.formatMessage(messages.headerUrl),
        description: intl.formatMessage(messages.headerUrlDescription),
        widget: 'object_browser',
        mode: 'link',
        allowExternals: true,
      },
      headerTag: {
        title: intl.formatMessage(messages.headerTag),
        description: intl.formatMessage(messages.headerTagDescription),
        choices: [['h1', 'H1'], ...headingChoices],
      },
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
        description: intl.formatMessage(messages.imagePositionDescription),
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
        description: intl.formatMessage(messages.titleTagDescription),
        choices: headingChoices,
      },
      showDescription: {
        title: intl.formatMessage(messages.descriptionTitle),
        description: intl.formatMessage(messages.descriptionDescription),
        type: 'boolean',
        default: true,
      },
      effectiveDate: {
        title: intl.formatMessage(messages.date),
        description: intl.formatMessage(messages.dateDescription),
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
