import React from 'react';
import PropTypes from 'prop-types';
import {ConditionalLink} from '@plone/volto/components';
import {flattenToAppURL} from '@plone/volto/helpers';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import {isInternalURL} from '@plone/volto/helpers/Url/Url';
import {Grid, Image} from 'semantic-ui-react';
import moment from 'moment';
import {useIntl} from 'react-intl';

const AdvancedListingBlockTemplate = ({
                                        items,
                                        moreLinkText,
                                        moreLinkUrl,
                                        header,
                                        headerUrl,
                                        headerTag,
                                        isEditMode,
                                        imageSide,
                                        imageWidth,
                                        howManyColumns,
                                        effectiveDate,
                                        titleTag,
                                        showDescription,
                                        eventDate,
                                        eventLocation,
                                        eventTime
                                      }) => {
  let moreLink = null;
  let moreHref = moreLinkUrl?.[0]?.['@id'] || '';
  if (isInternalURL(moreHref)) {
    moreLink = (
      <ConditionalLink to={flattenToAppURL(moreHref)} condition={!isEditMode}>
        {moreLinkText || moreHref}
      </ConditionalLink>
    );
  } else if (moreHref) {
    moreLink = <a href={moreHref}>{moreLinkText || moreHref}</a>;
  }

  let headerLink = null;
  let headerHref = headerUrl?.[0]?.['@id'] || '';
  if (isInternalURL(headerHref)) {
    headerLink = (
      <ConditionalLink to={flattenToAppURL(headerHref)} condition={!isEditMode}>
        {header || headerHref}
      </ConditionalLink>
    );
  } else if (headerHref) {
    moreLink = <a href={headerHref}>{moreLinkText || headerHref}</a>;
  }
  const getEventDate = (item) => {
    let start = '',
      end = '';

    if (item.start) {
      const parsedDate = new Date(Date.parse(item.start));
      start = `${parsedDate.toLocaleString('default', {
        month: 'short',
      })} ${parsedDate.getDate()}, ${parsedDate.getFullYear()}`;
    }

    if (item.end) {
      const parsedDate = new Date(Date.parse(item.end));
      end = `${parsedDate.toLocaleString('default', {
        month: 'short',
      })} ${parsedDate.getDate()}, ${parsedDate.getFullYear()}`;
    }
    if (end == start) {return start}
    else {return start + ' - ' + end;};
  };
  const getEventTime = (item) => {
    let start = '',
      end = '';

    if (item.start) {
      const parsedDate = new Date(Date.parse(item.start));
      start = `${parsedDate.toLocaleString(
        'en-US',
        {hour: 'numeric', minute: 'numeric', hour12: true},
      )}`;
    }

    if (item.end) {
      const parsedDate = new Date(Date.parse(item.end));
      end = ` - ${parsedDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })}`;
    }

    return start + end;
  };
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
  const TitleTag = titleTag ? titleTag : 'h3';
  const HeaderTag = headerTag ? headerTag : 'h3';
  moment.locale(intl.locale);
  return (
    <>
      <HeaderTag className="listing-header">
        {headerLink ? headerLink : header}
      </HeaderTag>
      <Grid columns={howManyColumns ? howManyColumns : 1} stackable>
        {items.map((item) => (
          <Grid.Column key={item['@id']}>
            <Grid columns={columnSize}>
              {['up', 'left'].includes(imageSide) && (
                <Grid.Column width={imageGridWidth}>
                  {!item.image_field && (
                    <ConditionalLink item={item} condition={!isEditMode}>
                      <Image
                        src={DefaultImageSVG}
                        alt="This content has no image, this is a default placeholder."
                        size="small"
                      />
                    </ConditionalLink>
                  )}
                  {item.image_field && (
                    <ConditionalLink item={item} condition={!isEditMode}>
                      <Image
                        src={flattenToAppURL(
                          `${item['@id']}/@@images/${item.image_field}/large`,
                        )}
                        alt={item.title}
                        size="small"
                      />
                    </ConditionalLink>
                  )}
                </Grid.Column>
              )}
              <Grid.Column width={contentGridWidth}>
                <TitleTag>
                  <ConditionalLink item={item} condition={!isEditMode}>
                    {item.title ? item.title : item.id}
                  </ConditionalLink>
                </TitleTag>
                {eventDate|eventTime && <p class="event-when">{eventDate && <span className="start-date">{getEventDate(item)}</span>}
                {eventTime && eventDate && <span> | </span>}
                  {eventTime && <span className="start-time">{getEventTime(item)}</span>}</p>||null}
                {eventLocation && <p>{item.location}</p>}
                {effectiveDate && <p>{moment(item.effective).format('L')}</p>}
                {showDescription && item.description && (
                  <p>{item.description}</p>
                )}

              </Grid.Column>
              {['right', 'down'].includes(imageSide) && (
                <Grid.Column width={imageGridWidth}>
                  {!item.image_field && (
                    <ConditionalLink item={item} condition={!isEditMode}>
                      <Image
                        src={DefaultImageSVG}
                        alt="This content has no image, this is a default placeholder."
                        size="small"
                      />
                    </ConditionalLink>
                  )}
                  {item.image_field && (
                    <ConditionalLink item={item} condition={!isEditMode}>
                      <Image
                        src={flattenToAppURL(
                          `${item['@id']}/@@images/${item.image_field}/large`,
                        )}
                        alt={item.title}
                        size="small"
                      />
                    </ConditionalLink>
                  )}
                </Grid.Column>
              )}
            </Grid>
          </Grid.Column>
        ))}
      </Grid>
      {moreLink && <div className="listing-footer">{moreLink}</div>}
    </>
  );
};

AdvancedListingBlockTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default AdvancedListingBlockTemplate;
