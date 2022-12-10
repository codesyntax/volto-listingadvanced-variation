import AdvancedListingBlockTemplate from './AdvancedListingBlockTemplate';
import AdvancedCarouselBlockTemplate from './AdvancedCarouselBlockTemplate';
import {advancedSchema} from './advancedSchema';
import {advancedListingSchema} from './AdvancedListingSchema';
import {advancedCarouselSchema} from './AdvancedCarouselSchema';

const applyConfig = (config) => {
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'advanced',
      title: 'Advanced',
      template: AdvancedListingBlockTemplate,
      schemaEnhancer: advancedListingSchema,
    },
    {
      id: 'advancedCarousel',
      title: 'Carousel',
      template: AdvancedCarouselBlockTemplate,
      schemaEnhancer: advancedCarouselSchema,
    },
  ];
  return config;
};

export default applyConfig;
