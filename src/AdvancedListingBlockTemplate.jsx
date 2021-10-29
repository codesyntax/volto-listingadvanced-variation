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

/**
 * This is an advanced template for the default Volto listing block.
 * @constructor
 * @param {list} items - The list of items to render
 * @param {bool} isEditMode - True if you are editing the block
 * @param {string} linkTitle - The title to show the 'see more' link
 * @param {string} linkHref - The href to set to the 'see more' link
 * @param {string} imageSide - Where to put the image. 'up', 'right','down','left' or null (means without image)
 * @param {number} imageWidth - How many columns (of 12) should the image occupy
 * @param {number} howManyColumns - In how many columns will the items be displayed
 * @param {bool} effectiveDate - If true, show the effective date of each item
 * @param {function} titleTag - The function to render each item title
 */
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
      <Grid columns={howManyColumns ? howManyColumns : 1} stretched>
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
                          item[settings.listingPreviewImageField].scales.preview
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
                  <p>{item.description}</p>
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
                          item[settings.listingPreviewImageField].scales.preview
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
  isEditMode: PropTypes.bool,
  linkTitle: PropTypes.string,
  linkHref: PropTypes.string,
  imageSide: PropTypes.string,
  imageWidth: PropTypes.number,
  howManyColumns: PropTypes.number,
  effectiveDate: PropTypes.bool,
  titleTag: PropTypes.func,
};

export default AdvancedListingBlockTemplate;
