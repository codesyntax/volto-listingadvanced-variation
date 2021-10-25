import React from 'react';
import messages from './messages';

export const advancedSchema = (props) => {
  const { intl, schema } = props;

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
        id: 'columns',
        title: intl.formatMessage(messages.columnsConfiguration),
        fields: ['howManyColumns'],
      },
      {
        id: 'image',
        title: intl.formatMessage(messages.imageConfiguration),
        fields: ['imageSide', 'imageWidth'],
      },
      {
        id: 'title',
        title: intl.formatMessage(messages.titleConfiguration),
        fields: ['titleTag'],
      },
    ],
    properties: {
      ...schema.properties,
      howManyColumns: {
        title: intl.formatMessage(messages.columnsCountConfiguration),
        choices: [
          [1, '1'],
          [2, '2'],
          [3, '3'],
          [4, '4'],
        ],
      },
      imageWidth: {
        title: intl.formatMessage(messages.imageWidthConfiguration),
        description: intl.formatMessage(
          messages.imageWidthConfigurationDescription,
        ),
        choices: [
          [2, '2/12'],
          [3, '3/12'],
          [4, '4/12'],
          [5, '5/12'],
          [6, '6/12'],
        ],
      },
      imageSide: {
        title: intl.formatMessage(messages.imagePositionConfiguration),
        description: intl.formatMessage(
          messages.imagePositionConfigurationDescription,
        ),
        choices: [
          [null, 'No image'],
          ['right', 'right'],
          ['left', 'left'],
        ],
      },
      titleTag: {
        title: intl.formatMessage(messages.titleTagConfiguration),
        description: intl.formatMessage(
          messages.titleTagConfigurationDescription,
        ),
        choices: [
          [(children) => <h2>{children}</h2>, 'H2'],
          [(children) => <h3>{children}</h3>, 'H3'],
          [(children) => <h4>{children}</h4>, 'H4'],
        ],
      },
    },
  };
};
