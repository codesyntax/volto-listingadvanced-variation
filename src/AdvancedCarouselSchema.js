import messages from './messages';

export const advancedCarouselSchema = (props) => {
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
      {
        id: 'carousel',
        title: 'Carousel/Slider Options',
        fields: ['howManyColumns', 'slidesToScroll', 'autoPlay', 'autoplaySpeed', 'align'],
      },
      {
        id: 'carouselDisplay',
        title: intl.formatMessage(messages.itemDisplayOptions),
        fields: ['titleTag', 'imageSide', 'showTitle', 'showDescription', 'eventCard', 'eventDate', 'eventTime', 'eventLocation', 'effectiveDate'],
      },
    ],
    properties: {
      ...schema.properties,
      titleTag: {
        title: intl.formatMessage(messages.titleTag),
        choices: headingChoices,
        default: 'h2',
      },
      howManyColumns: {
        title: intl.formatMessage(messages.columnsCount),
        choices: [
          [1, '1'],
          [2, '2'],
          [3, '3'],
          [4, '4'],
        ],
        default: 2,
      },
      slidesToScroll: {
        title: 'Slides to scroll',
        choices: [
          [1, '1'],
          [2, '2'],
          [3, '3'],
          [4, '4'],
        ],
        default: 1,
      },
      autoplaySpeed: {
        title: 'Speed Autoplay',
        type: 'number',
        choices: [
          [3, '3'],
          [4, '4'],
          [5, '5'],
          [6, '6'],
          [7, '7'],
          [8, '8'],
          [9, '9'],
          [10, '10'],
        ],
        default: 5000
      },
      align: {
        title: 'Alignment',
        widget: 'align',
        default: 'left',
      },
      imageSide: {
        title: intl.formatMessage(messages.imagePosition),
        choices: [
          [null, 'No image'],
          ['background', 'background'],
          ['up', 'up'],
        ],
        default: 'up',
      },
      showTitle: {
        title: 'Show Title',
        type: 'boolean',
        default: true,
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
      eventCard: {
        title: 'Show Event Card',
        type: 'boolean',
      },
    },
  };
};
