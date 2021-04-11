import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export namespace PlaylistsSlice {
  const adapter = createEntityAdapter<Playlist>({ selectId: (entity) => entity.name });

  export interface Playlist {
    readonly name: string;
    readonly tracks: Track[];
  }

  export interface Track {
    readonly name: string;
    readonly base64Data: string;
  }

  /** The {@link playlistNames} to add the {@link track} to. */
  interface NewTrack {
    readonly playlistNames: string[];
    readonly track: Track;
  }

  interface DeletedTrack {
    readonly playlistName: string;
    readonly trackName: string;
  }

  const slice = createSlice({
    name: 'playlists',
    initialState: adapter.getInitialState(),
    reducers: {
      /** Creates a new playlist using the provided name. */
      create: (state, { payload }: PayloadAction<string>) => {
        adapter.upsertOne(state, { name: payload, tracks: [] });
      },
      /** Deletes the specified playlist by name. */
      removeOne: adapter.removeOne,
      addTrack: (state, { payload }: PayloadAction<NewTrack>) => {
        payload.playlistNames.forEach((playlistName) => {
          const tracks = adapter.getSelectors().selectById(state, playlistName)!.tracks;
          adapter.updateOne(state, {
            id: playlistName,
            changes: { tracks: [...tracks, payload.track] },
          });
        });
      },
      removeTrack: (state, { payload }: PayloadAction<DeletedTrack>) => {
        const tracks = adapter
          .getSelectors()
          .selectById(state, payload.playlistName)!
          .tracks.filter(({ name }) => name !== payload.trackName);
        adapter.updateOne(state, {
          id: payload.playlistName,
          changes: { tracks },
        });
      },
    },
  });

  export const { reducer } = slice;

  export const { create, removeOne, addTrack, removeTrack } = slice.actions;

  export const { selectAll, selectIds } = adapter.getSelectors((state: RootState) => state.playlists);
}
