import AdvancedListingBlockTemplate from './AdvancedListingBlockTemplate';
import { advancedSchema } from './advancedSchema';

const applyConfig = (config) => {
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'advanced',
      title: 'Advanced',
      template: AdvancedListingBlockTemplate,
      schemaEnhancer: advancedSchema,
    },
  ];
  return config;
};

export default applyConfig;
