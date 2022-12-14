import React from 'react';
import PropTypes from 'prop-types';
import {ConditionalLink} from '@plone/volto/components';
import {flattenToAppURL} from '@plone/volto/helpers';

import DefaultImageSVG from './placeholder.png';
import {isInternalURL} from '@plone/volto/helpers/Url/Url';
import {Grid, Image, Label, Icon} from 'semantic-ui-react';
import moment from 'moment';
import {useIntl} from 'react-intl';
import loadable from '@loadable/component';
import Slider from "react-slick";
import './Advanced.css';

//
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

import UniversalCard from '@eeacms/volto-listing-block/components/UniversalCard/UniversalCard';
import ResponsiveContainer from '@eeacms/volto-listing-block/components/ResponsiveContainer';

const AdvancedCarouselBlockTemplate = ({
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
                                         showTitle,
                                         showDescription,
                                         eventDate,
                                         eventLocation,
                                         eventTime,
                                         slidesToScroll,
                                         autoPlay,
                                         autoplaySpeed,
                                         eventCard
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
  const getEventCard = (item) => {
    let startMonth = '', startDay = '', startWeekday = '', startTime = '';
    if (item.start) {
      const parsedDate = new Date(Date.parse(item.start));
      startMonth = `${parsedDate.toLocaleString('default', {
        month: 'long',
      })}`;
      startDay = parsedDate.getDate();
      startWeekday = parsedDate.toLocaleString('default', {
        weekday: 'long',
      });
      return <div class="cal_date">
        <span class="cal_month">{startMonth}</span>
        <span class="cal_day">{startDay}</span>
        <span class="cal_wkday">{startWeekday}</span>
      </div>;
    } else {
      return '';
    }
    ;
  };
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
    if (end == start) {
      return start
    } else {
      return start + ' - ' + end;
    }
    ;
  };
  const getEventTime = (item) => {
    let start = '',
      end = '';

    if (item.start) {
      const parsedDate = new Date(Date.parse(item.start));
      start = `${parsedDate.toLocaleString(
        'default',
        {hour: 'numeric', minute: 'numeric', hour12: true},
      )}`;
    }

    if (item.end) {
      const parsedDate = new Date(Date.parse(item.end));
      end = ` - ${parsedDate.toLocaleString(
        'default',
        {hour: 'numeric', minute: 'numeric', hour12: true,}
      )}`;
    }

    return start + end;
  };
  const hasImage = imageSide !== null;
  const oneColumnElement = ['up', 'down', 'background', null].includes(imageSide);
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
  const AutoPlay = autoPlay ? autoPlay : '1';
  const AutoPlaySpeed = autoplaySpeed ? autoplaySpeed : '3';
  moment.locale(intl.locale);
  return (
    <div className="advancedView">
      {headerLink && <HeaderTag className="listing-header">
        {headerLink ? headerLink : header}
      </HeaderTag>}

      <Slider className={'column' + howManyColumns}
              dots={true}
              infinite={true}
              lazyLoad={true}
              speed={500}
              slidesToShow={howManyColumns ? howManyColumns : 1}
              slidesToScroll={slidesToScroll ? slidesToScroll : 1}
              autoplay={AutoPlay}
              autoplaySpeed={AutoPlaySpeed * 1000}
              pauseOnHover={true}
              arrows={true}
              responsive={howManyColumns >= 3 ? [
                {
                  breakpoint: 1169,
                  settings: {
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                  },
                },
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ] : [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  },
                },
              ]}
      >
        {['background'].includes(imageSide) && (
          items.map((item) => (
            <div className="backgroundimage">
              <ConditionalLink item={item} condition={!isEditMode}>
                <div className="focuspoint">
                  {!item.image_field && (
                    <ConditionalLink item={item} condition={!isEditMode}>
                      <Image
                        className='listImage'
                        src={DefaultImageSVG}
                        alt="This content has no image, this is a default placeholder."
                        size="small"
                      />
                    </ConditionalLink>
                  )}
                  {item.image_field && (
                    <Image srcset={flattenToAppURL(
                      `${item['@id']}/@@images/${item.image_field}/mini 200w, ${item['@id']}/@@images/${item.image_field}/preview 400w, ${item['@id']}/@@images/${item.image_field}/teaser 600w, ${item['@id']}/@@images/${item.image_field}/large 800w, ${item['@id']}/@@images/${item.image_field}/larger 1000w, ${item['@id']}/@@images/${item.image_field}/great 1200w, ${item['@id']}/@@images/${item.image_field}/huge 1600w'`,
                    )}
                           sizes="(max-width: 2560px) 100vw, 2560px"
                           alt={item.title}
                           size="small"
                           src={flattenToAppURL(
                             `${item['@id']}/@@images/${item.image_field}/large`,
                           )}
                    />)}
                </div>
                <div className="info-text">
                  {eventCard && <>{getEventCard(item)}</>}
                  {item.location && eventDate | eventTime &&
                    <span class="event-when">{eventDate && <span className="start-date">{getEventDate(item)}</span>}
                      {eventTime && eventDate && <span> | </span>}
                      {eventTime && <span className="start-time">{getEventTime(item)}</span>}</span> || null}
                  {showTitle && <TitleTag className='text-ellipsis'>{item.title ? item.title : item.id}</TitleTag>}
                  <p>
                    {eventLocation && <span>{item.location}<br/></span>}
                    {effectiveDate && <span>{moment(item.effective).format('L')}<br/></span>}
                    {showDescription && item.description && (
                      <span className='limited-text'>{item.description}</span>
                    )}
                  </p>
                </div>
              </ConditionalLink>
            </div>
          ))
        )}
        {!['background'].includes(imageSide) && (
          items.map((item) => (
            <Grid columns={columnSize}>
              {['up', 'left'].includes(imageSide) && (
                <Grid.Column width={imageGridWidth} className='advanced-item'>
                  {!item.image_field && (
                    <ConditionalLink item={item} condition={!isEditMode}>
                      <Image
                        className='listImage'
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
                          `${item['@id']}/@@images/${item.image_field}/preview`,
                        )}
                        className='listImage'
                        srcset={flattenToAppURL(
                          `${item['@id']}/@@images/${item.image_field}/mini 200w, ${item['@id']}/@@images/${item.image_field}/preview 400w, ${item['@id']}/@@images/${item.image_field}/teaser 600w, ${item['@id']}/@@images/${item.image_field}/large 800w, ${item['@id']}/@@images/${item.image_field}/larger 1000w, ${item['@id']}/@@images/${item.image_field}/great 1200w, ${item['@id']}/@@images/${item.image_field}/huge 1600w'`,
                        )}
                        sizes="(max-width: 2560px) 100vw, 2560px"
                        alt={item.title}
                        size="small"
                      />
                    </ConditionalLink>
                  )}
                </Grid.Column>)}
              <Grid.Column width={contentGridWidth} verticalAlign='top'>
                {eventCard && <>{getEventCard(item)}</>}
                {showTitle &&
                  <TitleTag>
                    <ConditionalLink item={item} condition={!isEditMode}>
                      {item.title ? item.title : item.id}
                    </ConditionalLink>
                  </TitleTag>}
                {item.location && eventDate | eventTime &&
                  <div className="event-when">
                    {eventDate && <span className="start-date">{getEventDate(item)}</span>}
                    {eventTime && eventDate && <span> | </span>}
                    {eventTime && <span className="start-time">{getEventTime(item)}</span>}</div> || null}
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
                        className='listImage'
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
                        className='listImage'
                        srcset={flattenToAppURL(
                          `${item['@id']}/@@images/${item.image_field}/mini 200w, ${item['@id']}/@@images/${item.image_field}/preview 400w, ${item['@id']}/@@images/${item.image_field}/teaser 600w, ${item['@id']}/@@images/${item.image_field}/large 800w, ${item['@id']}/@@images/${item.image_field}/larger 1000w, ${item['@id']}/@@images/${item.image_field}/great 1200w, ${item['@id']}/@@images/${item.image_field}/huge 1600w'`,
                        )}
                        sizes="(max-width: 2560px) 100vw, 2560px"
                        alt={item.title}
                        size="small"
                      />
                    </ConditionalLink>
                  )}
                </Grid.Column>)}
            </Grid>
          ))
        )}

      </Slider>

    </div>
  );


};

AdvancedCarouselBlockTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default AdvancedCarouselBlockTemplate;
