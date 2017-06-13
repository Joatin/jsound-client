import { Reducer } from '../util/reducer';
import { ContentState } from './content.state';

export class ContentReducer extends Reducer<ContentState> {
  public initialState: ContentState = {
    allPlaylist: null,
    selectedPlaylist: {
      date: new Date(),
      type: 'normal',
      parts: [
        {
          name: 'Introduction',
          duration: 1800000,
          startTime: new Date(),
          content: [
            {
              name: 'Del 1',
              duration: 120000,
              startTime: new Date(),
              media: null
            },
            {
              name: 'Del 2',
              duration: 30000,
              startTime: new Date(),
              media: [
                {
                  mime: '',
                  url: 'https://madeby.google.com/static/images/google_g_logo.svg'
                }
              ]
            }
          ]
        }
      ],
    }
  };
}

let reducer = new ContentReducer();
export function contentReducerFunc(state, action) {
  return reducer.reduce(state, action);
}
