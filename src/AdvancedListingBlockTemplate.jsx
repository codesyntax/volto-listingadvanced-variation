import React from 'react';
import PropTypes from 'prop-types';
import { ConditionalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { isInternalURL } from '@plone/volto/helpers/Url/Url';
import { Grid, Image } from 'semantic-ui-react';
import moment from 'moment';
import { useIntl } from 'react-intl';
const AdvancedListingBlockTemplate = ({
  items,
  linkTitle,
  linkHref,
  isEditMode,
  imageSide,
  imageWidth,
  howManyColumns,
  effectiveDate,
  titleTag,
  showDescription,
}) => {
  let link = null;
  let href = linkHref?.[0]?.['@id'] || '';
  if (isInternalURL(href)) {
    link = (
      <ConditionalLink to={flattenToAppURL(href)} condition={!isEditMode}>
        {linkTitle || href}
      </ConditionalLink>
    );
  } else if (href) {
    link = <a href={href}>{linkTitle || href}</a>;
  }

  const { settings } = config;
  const hasImage = imageSide !== null;
  const oneColumnElement = ['up', 'down', null].includes(imageSide);
  const columnSize = oneColumnElement ? 1 : 2;
  const imageGridWidth = oneColumnElement ? 12 : imageWidth ? imageWidth : 2;
  const contentGridWidth = oneColumnElement
    ? 12
    : hasImage
      ? 12 - imageWidth
      : 12;
  const intl = useIntl();
  moment.locale(intl.locale);
  return (
    <>
      <Grid columns={howManyColumns ? howManyColumns : 1} stackable>
        {items.map((item) => (
          <Grid.Column key={item['@id']}>
            <ConditionalLink item={item} condition={!isEditMode}>
              <Grid columns={columnSize}>
                {['up', 'left'].includes(imageSide) && (
                  <Grid.Column width={imageGridWidth}>
                    {!item[settings.listingPreviewImageField] && (
                      <Image
                        src={DefaultImageSVG}
                        alt="This content has no image, this is a default placeholder."
                        size="small"
                      />
                    )}
                    {item[settings.listingPreviewImageField] && (
                      <Image
                        src={flattenToAppURL(
                          item[settings.listingPreviewImageField].scales.large
                            .download,
                        )}
                        alt={item.title}
                        size="small"
                      />
                    )}
                  </Grid.Column>
                )}
                <Grid.Column width={contentGridWidth}>
                  {titleTag ? (
                    titleTag(item.title ? item.title : item.id)
                  ) : (
                    <h3>{item.title ? item.title : item.id}</h3>
                  )}
                  {effectiveDate && <p>{moment(item.effective).format('L')}</p>}
                  {showDescription && item.description && (
                    <p>{item.description}</p>
                  )}
                </Grid.Column>
                {['right', 'down'].includes(imageSide) && (
                  <Grid.Column width={imageGridWidth}>
                    {!item[settings.listingPreviewImageField] && (
                      <Image
                        src={DefaultImageSVG}
                        alt="This content has no image, this is a default placeholder."
                        size="small"
                      />
                    )}
                    {item[settings.listingPreviewImageField] && (
                      <Image
                        src={flattenToAppURL(
                          item[settings.listingPreviewImageField].scales.large
                            .download,
                        )}
                        alt={item.title}
                        size="small"
                      />
                    )}
                  </Grid.Column>
                )}
              </Grid>
            </ConditionalLink>
          </Grid.Column>
        ))}
      </Grid>
      {link && <div className="footer">{link}</div>}
    </>
  );
};

AdvancedListingBlockTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default AdvancedListingBlockTemplate;
