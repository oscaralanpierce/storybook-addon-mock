import {withRoundTrip} from "../../mock-addon/src/withRoundTrip";

const Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Docs', ['Introduction', 'Installation', 'User guide']],
        includeName: true
      }
    },
    mockAddonConfigs: {
      globalMockData: [],
      refreshStoryOnUpdate: true,
      disableUsingOriginal: false,
    },
  },
  decorators: [withRoundTrip],
}

export default Preview